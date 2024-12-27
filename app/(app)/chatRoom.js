import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomkeyboardView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { doc, setDoc, Timestamp, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams(); // This is the user we are chatting with
    const { user } = useAuth(); // This is the current user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (querySnapshot) => {
            let allMessages = querySnapshot.docs.map(doc => {
                return doc.data()
            });
            setMessages([...allMessages]);
        });

        const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            updateScrollView();
        });

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }, 100);
    };

    const createRoomIfNotExists = async () => {
        // Create a room if it doesn't exist
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    };

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        console.log('Sending message...', message);
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messageRef = collection(docRef, "messages");
            textRef.current = '';

            if (inputRef) inputRef?.current?.clear();

            const newDoc = await addDoc(messageRef, {
                userId: user.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            console.log('New Message ID: ', newDoc.id);
        } catch (error) {
            console.log('Error sending message: ', error.message);
            Alert.alert('Message', error.message);
        }
    };

    return (
        <CustomKeyboardView inChat={true}>
            <View className='flex-1 bg-white'>
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className='h-3 border-b border-neutral-300' />
                <View className='flex-1 justify-between bg-neutral-100 ovverflow-visible'>
                    <View className='flex-1'>
                        <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
                        <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5' style={{ height: hp(6) }}>
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder='Type message...'
                                multiline
                                scrollEnabled
                                style={{ fontSize: hp(2), maxHeight: hp(10) }} // Limit input height
                                className='flex-1 mr-2'
                            />
                            <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <Feather name='send' size={hp(2.7)} color='#737373' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
};