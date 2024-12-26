import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurshash } from '../utils/common';

export default function ChatItem({ item, router, noBorder }) {
    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item});
    };
    
    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-neutral-200'}`}>
            <Image
                source={{ uri: item?.profileUrl }}
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                placeholder={blurshash}
                transition={500}
            />

            {/* Name and last messages */}
            <View className='flex-1 gap-1'>
                {/* Name */}
                <View className='flex-row justify-between'>
                    <Text
                        style={{ fontSize: hp(1.8) }}
                        className='font-semibold text-neutral-800'
                    >
                        {item?.username}
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