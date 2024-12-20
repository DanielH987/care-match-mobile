import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
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
            // registerWithEmailAndPassword
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.error'. response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
            });

            return { success: true, data: response?.user };
        } catch (error) {
            return { success: false, msg: error.message };
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