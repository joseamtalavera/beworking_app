// Login.js
import React, { useState } from 'react';
import { Box, Button, Link, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Utils/useAuth';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false); 
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const navigate = useNavigate(); 
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message ||'Email or pass is incorrect'); //errorData.message is the message from authRoutes.js
          setOpen(true);
        } else {
            const data = await response.json();
            if (data.user && data.user.email_confirmed) {
                console.log('Login successful');
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
    navigate('/recover');
  };

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
            maxHeight: '190px',
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