import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, Grid, Typography } from '@mui/material';
import EmailRecoveryForm from './EmailRecoveryForm';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../Utils/useAuth';

//why do i need to import useEffect from react? 
function Login(props) {
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [emailReset, setEmailReset] = useState(false);//what is this for?

  const navigate = useNavigate();
 
  const { isAuthenticated, setIsAuthenticated } = useAuth(false);


  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard/user');
    }
  }, [isAuthenticated]);

  // This hook checks to ckeck if a token is expired
  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (Date.now() > tokenExpiration) {
      setIsAuthenticated(false);  
    }
  }, []);

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

    function clearAllCookies() {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        const trimmedName = name.trim();
        if (trimmedName !== 'keepMeLoggedIn' && trimmedName !== 'G_ENABLED_IDPS' && trimmedName !== 'g_state') {
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }
    }

    if (keepMeLoggedIn) {
      clearAllCookies();
        document.cookie = `keepMeLoggedIn=${email}; path=/`;
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
                localStorage.setItem('toekenExpiration', Date.now() + 60 * 60 * 1000);
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
    event.preventDefault();
    setShowRecoveryForm(true);
  };


  if (showRecoveryForm) {
    return <EmailRecoveryForm setEmailReset={setEmailReset} />;
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
                  Please enter your email address and password
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
            handlePasswordChange={handlePasswordChange}
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
              checked={keepMeLoggedIn} 
              onChange={(e) => setKeepMeLoggedIn(e.target.checked)} 
              name="remember"
              sx={{ 
                color: 'orange', 
                '&.Mui-checked': {
                  color: 'orange',
                },
              }}
               />}
            label={<Typography variant="body2" style={{color: '#808080'}}>Keep me logged in</Typography>}
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