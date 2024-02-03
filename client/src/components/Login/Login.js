import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, Grid, Typography, IconButton } from '@mui/material';
import EmailRecoveryForm from './EmailRecoveryForm';
import GoogleButton from './GoogleButton';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';


function Login() {
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);

  const [email, setEmail] = useState(() => {
    const rememberMe = document.cookie.split(';').find(row => row.startsWith('rememberMe='));
    return rememberMe ? rememberMe.split('=')[1] : '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (rememberMe) {
      document.cookie = `rememberMe=${email}; max-age=86400; path=/`;
    }
    // Handle registration here
    // Make sure to use parameterized queries or prepared statements to prevent SQL injection

    if (!email || !password) {
        alert('Please fill out all fields');
        return;
    }
    // Send a request to the server for regsitration
    // We need to replace it with our own server

    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.sucess) {
            alert('Login successful');
        } else {
            alert('Login failed');
        }
    })
    .catch((error) =>{
        console.error('Error:', error);
    })
};



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRecoveryClick = (event) => {
    //console.log('Recovery clicked');
    event.preventDefault();
    setShowRecoveryForm(true);
  };


  if (showRecoveryForm) {
    return <EmailRecoveryForm />;
  }

  const formContainerStyle = {
    maxWidth: '500px', // Or any suitable width
    margin: 'auto', // This centers the form
    padding: '20px', // Optional, for internal spacing
    boxSizing: 'border-box' // Ensures padding doesn't affect overall width
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle}>
          
      <Grid container direction= "column" spacing={2}>
            <Grid item>
              <Typography variant="h4" sx={{textAlign: 'center'}}>
                  Login to BeWorking
              </Typography>
              <Typography variant="body1" sx={{mb:2, textAlign: 'center'}}>
                  Please enter your emial address and password
              </Typography>
            </Grid>

        <Grid item >
          {/* <GoogleButton 
            buttonText="Login with Google" 
          />  */}


          {/* <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', margin: '10px auto' }}>
            <Box flex={1} borderBottom={1} borderColor="orange" />
              <Typography mx={2} color="orange">
                or
              </Typography>
            <Box flex={1} borderBottom={1} borderColor="orange" />
          </Box> */}
          

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
            autoComplete="current-password"
            label="Password"
            placeholder="Password"
            required={true}
          />

          <Grid container justifyContent="space-between" alignItems="center">
          
          <FormControlLabel
            control={<Checkbox 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              name="remember"
              sx={{ 
                color: 'orange', 
                '&.Mui-checked': {
                  color: 'orange',
                },
              }}
               />}
            label={<Typography variant="body2" style={{color: '#808080'}}>Remember me</Typography>}
          />
          
          <Typography variant='body2'>
            <Link href="#" onClick={handleRecoveryClick} underline='none'>Forgot password?</Link>
          </Typography>
          
          </Grid>


          <Button
            type="submit" 
            variant="contained" 
            fullWidth
            sx={{ mt: 0, mb: 2, backgroundColor: '#32CD32', '&:hover': { backgroundColor: 'green' } }}
          >
            Log In
          </Button>



          <Typography align="center" variant="body2" style={{color: '#808080'}}>
          By continuing you accept these 
          <Link href="#" underline='none'>Terms and Conditions</Link> and <Link href="#" underline='none'>Privacy Policy</Link>.
          </Typography>

        </Grid>
      </Grid>
    </Box>
  );
}
export default Login;