// useAuth.js

import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const googleToken = localStorage.getItem('googleToken');
    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsAuthenticated(!!googleToken || !!token);
    }, [googleToken, token]);

    useEffect(() => {
        const tokenListener = () => {
            const googleToken = localStorage.getItem('googleToken');
            const emailToken = localStorage.getItem('token');
            setIsAuthenticated(!!googleToken || !!token);
        };

        window.addEventListener('storage', tokenListener);

        return () => {
            window.removeEventListener('storage', tokenListener);
        };
    }, []);

    console.log('Authentication status:', isAuthenticated); // Add logging

    return isAuthenticated;
}

export default useAuth;      