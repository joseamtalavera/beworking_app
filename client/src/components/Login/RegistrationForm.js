import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';


const RegistrationForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [open, setOpen] = useState(false); 
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrorMessage('Please fill out all fields');
            setOpen(true); 
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setOpen(true);
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 special character');
            setOpen(true); 
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                if (response.status === 400 && data.message === 'User already exists') {
                    console.log(data.message);
                    setErrorMessage('User already exists');
                    setOpen(true); 
                } else if (response.status === 400 && data.message === 'Invalid email') {
                    setErrorMessage('Email with incorrect format');
                    setOpen(true);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                if (data.user) {
                    console.log('Registration successful');
                    // we will modify this to use cookies *****
                    //localStorage.setItem('token', data.token); // this token is generated for authentication in authController.js (loginEmail function), in line 177, using jwt.sign
                    props.onRegistrationSuccess(); // Call the onRegistrationSuccess function that was passed from the LoginPage.js 
                } else {
                    setErrorMessage('Registration failed');
                    setOpen(true); 
                
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message); 
            setOpen(true); 
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (       
        <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: '500px', 
            margin: 'auto', 
            padding: '20px', 
            boxSizing: 'border-box' }}>
          
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h4" sx={{textAlign: 'center'}}>
                        Create an account
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'center'}} >
                        Please enter your email address and password 
                    </Typography>
                </Grid>

                <Grid item >
                {/* <GoogleButton 
                    buttonText="Register with Google" 
                /> */}

                    {/* <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', margin: '10px auto' }}>
                        <Box flex={1} borderBottom={1} borderColor="orange" />
                            <Typography mx={2} color="orange">or</Typography>
                        <Box flex={1} borderBottom={1} borderColor="orange" />
                    </Box> */}
                

                    <EmailInput
                        email={email}
                        handleEmailChange={handleEmailChange}
                    />
                
                    <PasswordInput
                        password={password}
                        handlePasswordChange={handlePasswordChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                        autoComplete="new-password"
                        label="Password"
                        placeholder="Password"
                        required={true}
                    />
                
                    <PasswordInput
                        password={confirmPassword}
                        handlePasswordChange = {handleConfirmPasswordChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                        autoComplete="new-password"
                        label="Confirm Password"    
                        placeholder="Confirm Password"
                        required={true}
                    />
               
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ mt: 0, mb: 2, backgroundColor: '#32CD32', '&:hover': { backgroundColor: 'green' } }}
                    >
                        Sign Up
                    </Button>
                
                    <Typography align="center" variant="body2" style={{color: '#808080'}}>
                        By continuing you accept these 
                        <Link href="#" underline='none'> Terms and Conditions</Link> and <Link href="#" underline='none'>Privacy Policy</Link>.
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
    );
};      

export default RegistrationForm;