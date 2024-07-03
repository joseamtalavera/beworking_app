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
                size='small'
                variant="outlined" 
                component={Link} 
                to="/" 
                style={{ marginTop: '20px', width: '30px', backgroundColor: 'transparent', color: 'orange', border: '1px solid orange'}}
                onClick={() => console.log('Password reset email sent')}
            >
                Close
            </Button>
        </div>
    );
}

export default PasswordReset;


