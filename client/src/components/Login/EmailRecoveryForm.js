// EmailRecoveryForm.js
import React, {useState} from 'react';
import {Box, Button, Grid, Typography, Link } from '@mui/material';
import EmailInput from './EmailInput';
import PasswordResetAlert from './PasswordResetAlert';


const EmailRecoveryForm = (props) => {
    const [email, setEmail] = useState('');


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recover`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data:', data);
            if(data.message === 'Password reset email sent') {
               props.setEmailReset(true);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to send recovery email:', error);
            alert('Failed to send recovery email. Please try again') 
        }
    };


    const formContainerStyle = {
        maxWidth: '500px', // Or any suitable width
        margin: 'auto', // This centers the form
        padding: '20px', // Optional, for internal spacing
        boxSizing: 'border-box' // Ensures padding doesn't affect overall width
      };

   

    return (
        <div>
        {props.emailReset ? <PasswordResetAlert />:(
        <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle} >
          
            <Grid container direction="column" spacing={2}>
                <Grid item >
                    <Typography variant="h4" sx={{textAlign: 'center'}}>
                        Forgot your password?
                    </Typography>
                    <Typography variant="body1" sx={{mb:2, textAlign: 'center'}}>
                    Please enter your email address                   
                    </Typography>
                </Grid>

                <Grid item>
                <EmailInput
                        email={email}
                        handleEmailChange={handleEmailChange}
                    />


                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ mt: 0, mb: 2, backgroundColor: '#32CD32', '&:hover': { backgroundColor: 'green' } }}
                        >
                        Recover Email
                    </Button>
                
                    <Typography align="center" variant="body2" style={{color: '#808080'}}>
                        Back to my <Link href="/login" underline='none'>BeWorking Account       </Link>
                    </Typography>
                </Grid>
            </Grid>
        
        </Box>
        )}
        </div>
    );
    
};

export default EmailRecoveryForm;