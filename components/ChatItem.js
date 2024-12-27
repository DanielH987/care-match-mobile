import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurshash, getRoomId } from '../utils/common';
import { doc, setDoc, Timestamp, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({ item, router, noBorder, currentUser }) {
    const [lastMessage, setLastMessage] = useState(undefined);

    useEffect(() => {

        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messageRef = collection(docRef, "messages");
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (querySnapshot) => {
            let allMessages = querySnapshot.docs.map(doc => {
                return doc.data()
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        });

        return unsub;
    }, []);
    
    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item});
    };

    const renderTime = () => {
        return 'Time';
    }

    const renderLastMessage = () => {
        if (typeof lastMessage === 'undefined') return 'Loading...';

        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return "You: " + lastMessage?.text;
            return lastMessage?.text;
        } else {
            return 'Say Hi! 👋';
        }
    };

    const truncateText = (text, limit) => {
        if (!text || text.length <= limit) return text;
        return `${text.slice(0, limit)}...`;
    };
    
    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-neutral-200'}`}>
            <Image
                source={{ uri: item?.profileUrl }}
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                placeholder={blurshash}
                transition={500}
            />

            {/* Name and last messages */}
            <View className='flex-1 gap-1'>
                {/* Name */}
                <View className='flex-row justify-between'>
                    <Text
                        style={{ fontSize: hp(1.8) }}
                        className='font-semibold text-neutral-800'
                    >
                        {item?.username}
                    </Text>
                    <Text
                        style={{ fontSize: hp(1.6) }}
                        className='font-medium text-neutral-500'
                    >
                        {renderTime()}
                    </Text>
                </View>

                {/* Last message */}
                <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500 truncate'>
                    {truncateText(renderLastMessage(), 28)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}