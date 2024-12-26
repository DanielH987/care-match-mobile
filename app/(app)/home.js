import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-web';

export default function Home() {

  const {logout} = useAuth();
  const [users, setUsers] = useState([1,2,3]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-white">
        <StatusBar style="light" />

        {
          users.length > 0 ? (
            <ChatList users={users} />
          ) : (
            <View className="flex items-center" style={{top: hp(30)}}>
              <ActivityIndicator size="larger" />
            </View>
          )
        }
    </View>
  );
}