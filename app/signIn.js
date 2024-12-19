import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';

export default function SignIn() {
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        {/* Signin image */}
        <View className="items-center">
          <Image source={require('../assets/images/login.png')} style={{ height: hp(25) }} resizeMode='contain'/>
        </View>

        {/* Signin form */}
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign in</Text>
          
          {/* Inputs */}
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl">
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput 
                style={{ fontSize: hp(2), marginLeft: wp(2) }} 
                className="flex-1 font-semibold text-neutral-700" 
                placeholder="Email address" 
                placeholderTextColor={'gray'}
              />
            </View>

            <View className="gap-3">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl">
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput 
                  style={{ fontSize: hp(2), marginLeft: wp(2) }} 
                  className="flex-1 font-semibold text-neutral-700" 
                  placeholder="Password" 
                  placeholderTextColor={'gray'}
                />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-400">Forgot password?</Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
              <Text style={{ fontSize: hp(2.7) }} className="font-bold tracking-wider text-white">Sign in</Text>
            </TouchableOpacity>

            {/* SignUp text */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Don't have an account?</Text>
              <Pressable>
                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">Sign Up</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
}