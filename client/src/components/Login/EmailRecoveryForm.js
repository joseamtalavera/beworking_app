// EmailRecoveryForm.js
import React, {useState} from 'react';
import {Box, Button, Grid, Typography, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EmailInput from './EmailInput';
import PasswordResetAlert from './PasswordResetAlert';


const EmailRecoveryForm = (props) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setErrorMessage('Please enter your email address');
            setOpen(true);
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recover`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            if (!response.ok) {
                const data = await response.json();
                if(response.status === 400 && data.message === 'User does not exist') {
                    setErrorMessage('User does not exist');
                    setOpen(true);
                    return;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                console.log('Data:', data);
                if(data.message === 'Password reset email sent') {
                    props.setEmailReset(true);
                } else {
                    setErrorMessage('Failed to send recovery email');
                    setOpen(true);
                }
            }
        } catch (error) {
            console.error('Failed to send recovery email:', error);
            setErrorMessage(error.message);
            setOpen(true);
        }
    };

    const backgroundImageStyle = {
        height: '100vh',
        background: `
            linear-gradient(
                rgba(255, 165, 0, 0.5), 
                rgba(255, 165, 0, 0.5)
            ),
            url(/piclogin3.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' 
    };

    const loginContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative'
    };


    return (
        <div>
        {props.emailReset ? <PasswordResetAlert />:(
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{
                maxWidth: '500px',
                margin: 'auto', 
                padding: '20px', 
                boxSizing: 'border-box' 
            }} 
        >
          
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
                
                    <Typography align="center" variant="body2" style={{color: 'black'}}>
                        Back to  <Link href="/login" underline='none' sx={{ color: 'orange'}}>Login       </Link>
                    </Typography>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: {
                        width: "60%",
                        maxHeight: '170px',
                        textAlign: 'center'
                    },
                }}
            >
                <DialogTitle style={{ fontSize: errorMessage.includes('must') ? '12px' : 'default'}} >{errorMessage}</DialogTitle>
                <DialogContent style={{ overflow: 'hidden'}}>
                    <DialogContentText sx={{ color: 'orange'}}>
                        Please try again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setOpen(false)} 
                        size= 'small' 
                        color="primary" 
                        variant= "outlined" 
                        sx={{ color: 'green', borderColor: 'green'}}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        )}
        </div>
    );
    
};

export default EmailRecoveryForm;