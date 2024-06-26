import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function AdminUser() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4">
                Welcome to the user Dashboard!
            </Typography>
            <Button 
                variant="contained" 
                component={Link} 
                to="/login" 
                style={{ marginTop: '20px', width: '300px', backgroundColor: 'orange' }}
            >
                Logout
            </Button>
        </div>
    );
}

export default AdminUser;