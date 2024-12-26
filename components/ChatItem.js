import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ChatItem({item, index}) {
  return (
    <TouchableOpacity>
        <Image 
            source={require('../assets/images/react-logo.png')} 
            style={{ height: hp(6), aspectRatio: 1 }} 
        />
    </TouchableOpacity>
  );
}