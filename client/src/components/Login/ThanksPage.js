// ThanksPage.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ThanksPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                {/* You can add more content here as needed */}
            </Box>
            <Typography variant="h5" style={{marginTop:'30px'}}>
                Thank you for confirming your email!
            </Typography>
            <Button 
                variant="contained" 
                component={Link} 
                to="/login" 
                style={{ marginTop: '20px', width: '300px', backgroundColor: 'orange' }}
            >
                Go to Login
            </Button>
        </div>
    );
}

export default ThanksPage;
