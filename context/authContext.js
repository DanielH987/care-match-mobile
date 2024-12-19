import { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // onAuthStateChanged

        setTimeout(() => {
            setIsAuthenticated(true);
        }, 3000);
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
            // signInWithEmailAndPassword
        } catch (error) {
            console.error(error);
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