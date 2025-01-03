import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomkeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const {login} = useAuth();

  const handleSignIn = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
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
                onChangeText={value => emailRef.current = value}
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
                  onChangeText={value => passwordRef.current = value}
                  style={{ fontSize: hp(2), marginLeft: wp(2) }} 
                  className="flex-1 font-semibold text-neutral-700" 
                  placeholder="Password" 
                  secureTextEntry
                  placeholderTextColor={'gray'}
                />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-400">Forgot password?</Text>
            </View>

            {/* Submit Button */}
            <View>
              {
                loading ? 
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} /> 
                </View>
                : 
                <TouchableOpacity onPress={handleSignIn} style={{ height: hp(6.5) }} className="bg-[#FF98B1] rounded-xl justify-center items-center">
                  <Text style={{ fontSize: hp(2.7) }} className="font-bold tracking-wider text-white">Sign in</Text>
                </TouchableOpacity>
              }
            </View>

            {/* SignUp text */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Don't have an account?</Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-[#FF98B1]">Sign Up</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}