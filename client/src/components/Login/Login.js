import React, { useState } from 'react';
import { Box, Button, Link, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EmailRecoveryForm from './EmailRecoveryForm';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../Utils/useAuth';


function Login(props) {
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailReset, setEmailReset] = useState(false);//props.emailReset passed to the EmailRecoveryForm component
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false); 
  const { setIsAuthenticated, setIsAdmin } = useAuth(false);

  const navigate = useNavigate(); 
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  
  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (Date.now() > tokenExpiration) {
      setIsAuthenticated(false);  
      setErrorMessage('Session expired. Please log in again');
      setOpen(true);
    }
  }, [setIsAuthenticated]);

  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please fill out all fields');
      setOpen(true);
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 special character');
      setOpen(true);
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
          setErrorMessage('Email or password is incorrect');
          setOpen(true);
        } else {
            const data = await response.json();
            if (data.user && data.user.email_confirmed) {
                console.log('Login successful');
                console.log('is_admin:', data.user.is_admin);
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('tokenExpiration', Date.now() + 60 * 60 * 1000);
                localStorage.setItem('isAdmin', JSON.stringify(data.user.is_admin));
                console.log('isAdmin in local storage:, JSON.parse:', JSON.parse(localStorage.getItem('isAdmin')));
                setIsAuthenticated(true); 
                setIsAdmin(data.user.is_admin);  

                if (data.user.is_admin) {
                  navigate('/dashboard/admin');
                } else {
                  navigate('/dashboard/user');
                }
            } else if (data.user && !data.user.email_confirmed) {
                setErrorMessage('Please confirm your email');
                setOpen(true);
            } else {
            setErrorMessage('Login failed');
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
  };

  const handleRecoveryClick = (event) => {
    event.preventDefault();
    setShowRecoveryForm(true);
  };

  if (showRecoveryForm) {
    return <EmailRecoveryForm 
      emailReset={emailReset} 
      setEmailReset={setEmailReset} 
      />;
  }

 
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      maxWidth: '500px', 
      margin: 'auto', 
      padding: '20px', 
      boxSizing: 'border-box'
      }}
      >
          
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

          <Typography align="center" variant="body2" style={{color: 'black'}}>
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
        <DialogContent style={{ overflow: 'hidden'}} >
          <DialogContentText style={{ color: 'orange'}} >
            Please try again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)} 
            size='small'
            color="primary" 
            variant='outlined'
            sx={{ color: 'green', borderColor: 'green'}}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;