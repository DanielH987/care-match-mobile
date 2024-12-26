import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function ChatItem({item, router, noBorder}) {
  return (
    <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-neutral-200'}`}>
        <Image 
            source={require('../assets/images/react-logo.png')} 
            style={{ height: hp(6), width: hp(6) }}
            className='rounded-full'
        />

        {/* Name and last messages */}
        <View className='flex-1 gap-1'>
            {/* Name */}
            <View className='flex-row justify-between'>
                <Text
                    style={{ fontSize: hp(1.8) }}
                    className='font-semibold text-neutral-800'
                >
                    Daniel
                </Text>
                <Text
                    style={{ fontSize: hp(1.6) }}
                    className='font-medium text-neutral-500'
                >
                    Time
                </Text>
            </View>

            {/* Last message */}
            <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500'>Last message</Text>
        </View>
    </TouchableOpacity>
  );
}