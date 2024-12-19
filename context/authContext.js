import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // onAuthStateChanged
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
}
