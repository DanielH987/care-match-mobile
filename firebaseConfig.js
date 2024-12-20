import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlNa_b_i_TCb3D0qejSPuyt43rQMP8cN4",
  authDomain: "care-match-mobile.firebaseapp.com",
  projectId: "care-match-mobile",
  storageBucket: "care-match-mobile.firebasestorage.app",
  messagingSenderId: "305868881559",
  appId: "1:305868881559:web:c3c089dc53ab64b9cbf3d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");