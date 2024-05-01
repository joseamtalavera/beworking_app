// useAuth.js

import { useState, useEffect } from 'react';

function useAuth(autoCheck = true) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

   

    useEffect(() => {
        const checkAuth = () => {
            if (autoCheck){
            const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
            //const user = JSON.parse(localStorage.getItem('user'));
            const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            setIsAuthenticated(!!token);
            setIsLoading(false);  
            setIsAdmin(isAdmin || false);   
            console.log('isAdmin in useAuth:', isAdmin);              
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


    
    return {isAuthenticated, setIsAuthenticated, isLoading, isAdmin, setIsAdmin};
}


export default useAuth;