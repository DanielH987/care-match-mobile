import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { use } from 'react';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {

  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);
  
  const getUsers = async () => {
    // Fetch users from the database
    const q = query(usersRef, where("userId", "!=", user?.uid));
  
    try {
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data()});
      });
  
      // Set the users to the state only after data is fetched
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
        <StatusBar style="light" />

        {
          users.length > 0 ? (
            <ChatList currentUser={user} users={users} />
          ) : (
            <View className="flex items-center" style={{top: hp(30)}}>
              <ActivityIndicator size="large" />
              {/* <Loading size={hp(30)}/> */}
            </View>
          )
        }
    </View>
  );
}