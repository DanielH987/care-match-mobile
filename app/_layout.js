import { View } from 'react-native';
import { Slot, useSegments, useRouter } from 'expo-router';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';
import React, { useEffect } from 'react';
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] == '(app)';
    if (isAuthenticated && !inApp) {
      // Redirect to Home
      router.replace('home');
    } else if (isAuthenticated == false) {
      // Redirect to signIn
      router.replace('signIn');
    }
  }, [isAuthenticated]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
          <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}