import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, logoutApi, getCurrentUser } from '../services/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('authToken');
            const savedUser = localStorage.getItem('userData');

            if (token && savedUser) {
                try {
                    // Validate token with backend
                    const response = await getCurrentUser();

                    if (response.success) {
                        setUser(response.user);
                        // Update local storage with fresh user data
                        localStorage.setItem('userData', JSON.stringify(response.user));
                    } else {
                        // Token is invalid
                        throw new Error('Invalid token');
                    }
                } catch (error) {
                    console.error('Session validation failed:', error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginApi(email, password);

            if (response.success) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userData', JSON.stringify(response.user));
                setUser(response.user);
                return { success: true };
            } else {
                return { success: false, error: response.error };
            }
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    const logout = () => {
        logoutApi();
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
        // Force redirect to login page
        window.location.href = '/login';
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
