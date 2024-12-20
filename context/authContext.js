import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });

        return unsub;
    }, []);

    const login = async (email, password) => {
        try {
            // signInWithEmailAndPassword
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            // signInWithEmailAndPassword
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (email, password, username, profileUrl) => {
        try {
            // Create the user in Firebase Authentication
            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            console.log('User created:', response?.user);
    
            // Add the user's data to Firestore
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
                email, // Store email for easy retrieval
                createdAt: new Date().toISOString(),
            });
    
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
    
            // Friendly error messages for common cases
            if (msg.includes('(auth/email-already-in-use)')) {
                msg = 'This email address is already in use.';
            } else if (msg.includes('(auth/invalid-email)')) {
                msg = 'Invalid email address.';
            } else if (msg.includes('(auth/weak-password)')) {
                msg = 'Password should be at least 6 characters.';
            }
    
            console.error('Error during registration:', error);
    
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }

    return value;
};