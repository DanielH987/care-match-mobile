import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {
    if (currentUser?.userId === message?.userId) {
        return (
            <View className='flex-row justify-end mb-3 mr-3'>
                <View style={{ width: wp(80) }}>
                    <View className='flex self-end p-3 rounded-2xl bg-white border border-neutral-200'>
                        <Text style={{ fontSize: hp(1.9) }}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ width: wp(80) }} className='mb-3 ml-3'>
                <View className='flex self-start p-3 px-4 rounded-2xl bg-[#FF98B1] border-[#FF86A3] border'>
                    <Text style={{ fontSize: hp(1.9) }}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        );
    }
};