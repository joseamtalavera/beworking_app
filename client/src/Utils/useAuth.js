// useAuth.js

import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    useEffect(() => {
        const tokenListener = () => setToken(localStorage.getItem('token'));

        window.addEventListener('storage', tokenListener);

        return () => {
            window.removeEventListener('storage', tokenListener);
        };
    }, []);

    console.log('Authentication status:', isAuthenticated); // Add logging

    return isAuthenticated;
}

export default useAuth;