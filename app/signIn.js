import { View, Text, Image } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';

export default function SignIn() {
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        {/* Signin image */}
        <View className="items-center">
          <Image source={require('../assets/images/login.png')} style={{ height: hp(25) }} resizeMode='contain'/>
        </View>
      </View>
    </View>
  );
}