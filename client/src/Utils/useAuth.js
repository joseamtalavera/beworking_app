// useAuth.js

import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
            console.log('Token found in local storage:', token);
            setIsAuthenticated(!!token);
            //console.log('Authentication status:', isAuthenticated);
        };

        checkAuth();

        // Check auth status whenever local storage changes
        window.addEventListener('storage', checkAuth);

        // Clean up event listener
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    useEffect(() => {
        console.log('Authentication right now status:', isAuthenticated);
    }, [isAuthenticated]);

    

    //return isAuthenticated;
    return {isAuthenticated, setIsAuthenticated};
}


export default useAuth;