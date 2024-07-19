// PrivateRoute.js

import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';


function PrivateRoute({ children, adminRoute = false}) {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();

    console.log('PrivateRoute rendering');
    console.log({ isLoading, isAuthenticated, isAdmin });

    if (isLoading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
                >
                    <CircularProgress color='secondary' />
            </Box>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } 

    if (adminRoute && !isAdmin) {
        return <Navigate to="/dashboard/user" replace />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    adminRoute: PropTypes.bool,
};

export default PrivateRoute;




