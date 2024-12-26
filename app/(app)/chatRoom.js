import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function ChatRoom () {
    const item = useLocalSearchParams();
    console.log(item);
    return (
        <View>
            <Text>Welcome to the Chat Room!</Text>
        </View>
    );
};