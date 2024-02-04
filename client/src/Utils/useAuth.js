// useAuth.js

import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const googleToken = localStorage.getItem('googleToken');
    const emailToken = localStorage.getItem('emailToken');

    useEffect(() => {
        setIsAuthenticated(!!googleToken || !!emailToken);
    }, [googleToken, emailToken]);

    useEffect(() => {
        const tokenListener = () => {
            const googleToken = localStorage.getItem('googleToken');
            const emailToken = localStorage.getItem('emailToken');
            setIsAuthenticated(!!googleToken || !!emailToken);
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