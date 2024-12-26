import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const ios = Platform.OS == 'ios';

export default function HomeHeader() {

    const {user} = useAuth();
    const {top} = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: ios? top : top + 10 }} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-medium text-white">Chats</Text>
            </View>

            <View>
                <Menu>
                    <MenuTrigger customStyles={{ 
                        triggerWrapper: { 
                            // trigger wrapper styles
                        } 
                    }}>
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                        <MenuOption onSelect={() => alert(`Delete`)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                    </MenuOptions>
                </Menu>
                
            </View>
        </View>
    );
}