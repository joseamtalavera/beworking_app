import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography, Link, IconButton } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import GoogleButton from './GoogleButton';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle registration here
        // Make sure to use parameterized queries or prepared statements to prevent SQL injection

        if (!email || !password || !confirmPassword) {
            alert('Please fill out all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Send a request to the server for regsitration
        // We need to replace it with our own server

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.sucess) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        })
        .catch((error) =>{
            console.error('Error:', error);
        })
    };

    const GoogleIcon = (props) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.501 12.2331C22.501 11.3698 22.4296 10.7398 22.2748 10.0864H12.2153V13.983H18.12C18.001 14.9514 17.3582 16.4097 15.9296 17.3897L15.9096 17.5202L19.0902 19.9349L19.3106 19.9564C21.3343 18.1247 22.501 15.4297 22.501 12.2331Z" fill="#4285F4"></path>
          <path d="M12.2147 22.5001C15.1075 22.5001 17.536 21.5667 19.3099 19.9567L15.9289 17.39C15.0242 18.0083 13.8099 18.44 12.2147 18.44C9.38136 18.44 6.97663 16.6083 6.11941 14.0767L5.99376 14.0871L2.6865 16.5955L2.64325 16.7133C4.40513 20.1433 8.02417 22.5001 12.2147 22.5001Z" fill="#34A853"></path>
          <path d="M6.12003 14.0765C5.89385 13.4232 5.76295 12.7231 5.76295 11.9998C5.76295 11.2764 5.89385 10.5765 6.10813 9.92313L6.10214 9.78398L2.75343 7.23535L2.64387 7.28642C1.91771 8.70977 1.50104 10.3081 1.50104 11.9998C1.50104 13.6915 1.91771 15.2897 2.64387 16.7131L6.12003 14.0765Z" fill="#FBBC05"></path>
          <path d="M12.2147 5.55997C14.2266 5.55997 15.5837 6.41163 16.3576 7.12335L19.3814 4.23C17.5243 2.53834 15.1075 1.5 12.2147 1.5C8.0242 1.5 4.40514 3.85665 2.64325 7.28662L6.10753 9.92332C6.97665 7.39166 9.3814 5.55997 12.2147 5.55997Z" fill="#EB4335"></path>
          </svg>
      );

      const responseGoogle = (response) => {
        // The user's Google profile information and the OAuth 2.0 access token are in the `response` object.
    // You can use this information to register the user in your application.
    const profile = response.profileObj;
    const token = response.accessToken;

    // Register the user in your application.
    // This could involve sending a request to your backend with the user's Google profile information and the OAuth 2.0 access token.
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const formContainerStyle = {
        maxWidth: '500px', // Or any suitable width
        margin: 'auto', // This centers the form
        padding: '20px', // Optional, for internal spacing
        boxSizing: 'border-box' // Ensures padding doesn't affect overall width
      };
      


    return (
        
        <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
          
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h4" sx={{textAlign: 'center'}}>
                        Create an account
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'center'}} >
                        Please enter your emial address and password 
                    </Typography>
                </Grid>

                <Grid item >
                <GoogleButton 
                    buttonText="Register with Google" 
                />

                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', margin: '10px auto' }}>
                        <Box flex={1} borderBottom={1} borderColor="orange" />
                            <Typography mx={2} color="orange">or</Typography>
                        <Box flex={1} borderBottom={1} borderColor="orange" />
                    </Box>
                

                    <EmailInput
                        email={email}
                        setEmail={setEmail}
                    />
                
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                        autoComplete="new-password"
                        label="Password"
                        placeholder="Password"
                        required={true}
                    />
                
                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
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
                        <Link href="#" underline='none'>Terms and Conditions</Link> and <Link href="#" underline='none'>Privacy Policy</Link>.
                    </Typography>
                    
                </Grid>
            </Grid>
        </Box>

    );
};      

export default RegistrationForm;