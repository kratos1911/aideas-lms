import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.get('auth/me/');
                    if (isMounted) setUser(response.data);
                } catch (error) {
                    console.error("Auth Check Failed", error);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            if (isMounted) setLoading(false);
        };
        checkLoggedIn();

        // Safety timeout in case API hangs
        const timer = setTimeout(() => {
            if (isMounted && loading) {
                console.warn("Auth check timed out, forcing loading false");
                setLoading(false);
            }
        }, 5000);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    const login = async (username, password) => {
        const response = await api.post('auth/login/', { username, password });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        const userResponse = await api.get('auth/me/');
        setUser(userResponse.data);
        return userResponse.data;
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {loading ? (
                <div className="loading-screen" style={{ flexDirection: 'column', gap: '1rem' }}>
                    <div className="spinner"></div>
                    <p>Loading your profile...</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            window.location.reload();
                        }}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Stuck? Click here to Reset
                    </button>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
