import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/authContext';
import { Button } from 'react-native-web';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

  const {logout} = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    console.log('logout');
    await logout();
    router.push('index');
  };

  return (
    <View>
        <Text>Home</Text>
        <Pressable onPress={handleLogout}>
            <Text>Sign Out</Text>
        </Pressable>
    </View>
  );
}