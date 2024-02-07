import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';
import EmailRecoveryForm from './EmailRecoveryForm';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../Utils/useAuth';


function Login(props) {
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [email, setEmail] = useState(() => {
    try {
        const rememberMe = document.cookie.split(';').find(row => row.startsWith('rememberMe='));
        return rememberMe ? rememberMe.split('=')[1] : '';
    } catch (error) {
        console.error('Error parsing rememberMe cookie:', error);
        return '';
    }
});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
 
  const { isAuthenticated, setIsAuthenticated } = useAuth(false);

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard/user');
    }
  }, [isAuthenticated]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (!email || !password) {
        alert('Please fill out all fields');
        return;
    }


    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          window.alert('Login failed');
        } else {
            const data = await response.json();
            
            if (data.user) {
                console.log('Login successful');

                localStorage.setItem('token', JSON.stringify(data.token));
                setIsAuthenticated(true);   
            } else {
            window.alert('Login failed');
            }
        }
        } catch (error) {
        console.error('Error:', error);
    }
};



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
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
            handleEmailChange={handleEmailChange}
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