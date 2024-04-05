// PrivateRoute.js

import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';


function PrivateRoute({ children, adminRoute = false}) {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();
    console.log(isAdmin);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } 

    if (adminRoute && !isAdmin) {
        return <Navigate to="/dashboard/admin" replace />;
    }
    return children;
}

export default PrivateRoute;


