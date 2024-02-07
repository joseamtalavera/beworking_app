// PrivateRoute.js

import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';


function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } 

    return children;
}

export default PrivateRoute;