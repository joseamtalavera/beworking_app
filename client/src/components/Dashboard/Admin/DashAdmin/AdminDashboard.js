import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminDashboard() {
    // return (
    //     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //         <Typography variant="h4">
    //             Welcome to the Admin Dashboard
    //         </Typography>
    //         <img src="./DALLE.png" alt="Dashboard illustration" style={{ marginTop: '20px', maxWidth: '300px' }} />
    //     </div>
    // );
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4">
                Welcome to the Admin Dashboard!
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

export default AdminDashboard;