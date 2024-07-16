// useAuth.js

import { useState, useEffect } from 'react';

function useAuth(autoCheck = true) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {
            if (autoCheck){
                setIsLoading(true);
                try{
                    const response = await fetch('/api/auth/status', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        credentials: 'include',
                    });
                    if (response.ok){
                        console.log('Response is ok');
                        const contentType = response.headers.get('content-type');
                        console.log('Content-Type:', contentType);
                        
                        if (contentType && contentType.includes('application/json')) {  
                            const data = await response.json();
                            setIsAuthenticated(true);
                            setIsAdmin(data.isAdmin);
                        } else {
                            console.log('Response is not JSON');
                            setIsAuthenticated(false);
                            setIsAdmin(false);
                        }
                        
                    } else {
                        console.log('Response status:', response.status);
                        setIsAuthenticated(false);
                        setIsAdmin(false);
                       
                    }

                } catch (error) {
                    console.error('Error:', error);
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                   
                } finally {
                    setIsLoading(false);
                }
            }
        };
        checkAuth(); // Call the function  
    }, [autoCheck]);

    return {isAuthenticated, setIsAuthenticated, isAdmin, isLoading};
}


export default useAuth;