import React from 'react';
import { ScrollView } from 'react-native';
import MessageItem from './Messageitem';

export default function MessageList({ messages, scrollViewRef, currentUser }) {
    return (
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
            {
                messages.map((message, index) => {
                    return (
                        <MessageItem key={index} message={message} currentUser={currentUser} />
                    );
                })
            }
        </ScrollView>
    );
};