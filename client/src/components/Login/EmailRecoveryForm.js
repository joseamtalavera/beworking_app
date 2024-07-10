// EmailRecoveryForm.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Grid, Typography, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EmailInput from './EmailInput';
import PasswordResetAlert from './PasswordResetAlert';


const EmailRecoveryForm = (props) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [emailReset, setEmailReset] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

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


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setDialogMessage('Please enter your email address');
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
            const data = await response.json();

            if (!response.ok) {
                //const data = await response.json();
                if(response.status === 400 && data.message === 'User does not exist') {
                    setDialogMessage('User does not exist');
                    setOpen(true);
                    return;
                } else if (response.status === 400) {
                    setDialogMessage(data.message);
                    setOpen(true);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
            } else {
                //const data = await response.json();
                console.log('Data:', data);
                if(data.message === 'Password reset email sent') {
                    //setEmailReset(true);
                    //props.setEmailReset(true);
                    setDialogMessage('Password reset email sent. Please check your email');
                    setOpen(true);
                    //navigate('/login');
                    
                } else {
                    setDialogMessage('An error occurred. Please try again later.');
                    setOpen(true);
                }
            }
        } catch (error) {
            console.error('Failed to send recovery email:', error);
            setDialogMessage(error.message);
            setOpen(true);
        }
    };

   


    return (
        <Grid container style={{ height: '100vh', position: 'relative' }} >
            <Grid item xs={0} sm={4} style={backgroundImageStyle}></Grid>
            <Grid item xs={12} sm={8} md={8} style={loginContainerStyle}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
                    {/* <div> */}
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
          
                            <Grid container direction="column" spacing={2} >
                                <Grid item>
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
                                        sx={{ mt: 0, mb: 2, backgroundColor: '#32CD32', '&:hover': { backgroundColor: 'green' }, width: {xs:'100%', sm: '460px'}}}
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
                                
                                <DialogTitle style={{ fontSize: dialogMessage.includes('error') ? '12px' : 'default'}} >
                                    {dialogMessage.includes('error') || dialogMessage.includes('exist') || dialogMessage.includes('address') || dialogMessage.includes('valid') ? 'Error': 'Thank you!'}
                                </DialogTitle>
                                    <DialogContent style={{ overflow: 'hidden'}}>
                                        <DialogContentText sx={{ color: 'orange'}}>
                                           {dialogMessage}
                                        </DialogContentText>
                                    </DialogContent>
                                <DialogActions>
                                    <Button 
                                        onClick={() => {
                                            setOpen(false);
                                            navigate('/login');
                                        }} 
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
                </Box>
                <Box position="absolute" top={2} left={2}>
                    <Link href="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '10px', marginTop: '30px'}} /> {/* Logo image */}
                    </Link>
                    </Box>
            </Grid>
        </Grid>
        
    );
    
};

export default EmailRecoveryForm;