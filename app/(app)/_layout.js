import { SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';

export default function _layout() {
    return (
        <SafeAreaView className="flex-1 bg-indigo-400">
            <StatusBar className="bg-indigo-400"/>
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        header: () => <HomeHeader />,
                    }}
                />
            </Stack>
        </SafeAreaView>
    );
}
