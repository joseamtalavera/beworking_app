//AdminDashboard.js

import React from 'react';
import { Typography, Box } from '@mui/material';
import ResponsiveDrawerAdmin from '../../../Menu/ResponsiveDrawerAdmin';


function AdminDashboard() {
    
    
    return (
        <Box sx={{
            backgroundColor: 'white', 
            display:"flex", 
            flexDirection:"column"
            }}
        >
            <ResponsiveDrawerAdmin />
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh' 
                    }}
                >      
                    <Typography 
                        variant="h4">
                            Welcome to the Admin Dashboard!
                    </Typography>
                </Box>
            </Box>
       
    );
    
}

export default AdminDashboard;