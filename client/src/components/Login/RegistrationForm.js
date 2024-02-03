import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Link } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
//import GoogleButton from './GoogleButton';

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

    const handleSubmit = async (event) => {
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

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
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