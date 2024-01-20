// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';


function PrivateRoute({component: Component}) {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;

    
}

export default PrivateRoute;