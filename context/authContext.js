import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
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
                updateUserData(user.uid);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });

        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            return { success: true };
        } catch (error) {
            let msg = error.message;
    
            // Friendly error messages for common cases
            if (msg.includes('(auth/invalid-email)') || msg.includes('(auth/invalid-credential)')) {
                msg = 'Invalid email or password.';
            } else {
                msg = 'An unexpected error occurred. Please try again.';
            }
    
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message, error: error };
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