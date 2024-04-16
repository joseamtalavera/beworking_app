//AdminDashboard.js

import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import ResponsiveDrawerAdmin from '../../../Menu/ResponsiveDrawerAdmin';

function AdminDashboard() {
    
    return (
        <div>
            <Box display="flex" flexDirection="column">
                <Box>
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '50px', marginTop: '0px'}} /> {/* Logo image */}
                    </Link>
                </Box>
                <ResponsiveDrawerAdmin />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>      
                    <Typography variant="h4">
                        Welcome to the Admin Dashboard!
                    </Typography>
                </div>
            </Box>
        </div> 
    );
    
}

export default AdminDashboard;