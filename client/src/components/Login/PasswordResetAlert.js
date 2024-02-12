import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';


function PasswordReset() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            >
          
            </Box>
            <Typography variant="body1" style={{marginTop:'30px'}}>
                We have sent you an email to reset your password!
            </Typography>
            <Button 
                variant="contained" 
                component={Link} 
                to="/" 
                style={{ marginTop: '20px', width: '300px', backgroundColor: 'orange' }}
                onClick={() => console.log('Password reset email sent')}
            >
                Confirm
            </Button>
        </div>
    );
}

export default PasswordReset;


