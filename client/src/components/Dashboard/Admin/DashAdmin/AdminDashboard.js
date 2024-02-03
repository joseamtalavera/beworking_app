import React from 'react';
import { Typography } from '@mui/material';

function AdminDashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4">
                Welcome to the Dashboard
            </Typography>
            <img src="./DALLE.png" alt="Dashboard illustration" style={{ marginTop: '20px', maxWidth: '300px' }} />
        </div>
    );
}

export default AdminDashboard;