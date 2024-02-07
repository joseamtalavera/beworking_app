// useAuth.js

import { useState, useEffect } from 'react';

function useAuth(autoCheck = true) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

   

    useEffect(() => {
        const checkAuth = () => {
            if (autoCheck){
            const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
            setIsAuthenticated(!!token);
            setIsLoading(false);                   
            }
        }
        checkAuth();

        // Check auth status whenever local storage changes
        window.addEventListener('storage', checkAuth);

        // Clean up event listener
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
        
    }, [autoCheck]);


    
    return {isAuthenticated, setIsAuthenticated,isLoading};
}


export default useAuth;