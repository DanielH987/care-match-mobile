import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/authContext';

export default function Home() {

  const {logout} = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-white">
        <Text>Home</Text>
        <Pressable onPress={handleLogout}>
            <Text>Sign Out</Text>
        </Pressable>
    </View>
  );
}