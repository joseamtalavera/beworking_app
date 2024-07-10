import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Link, Dialog, DialogContentText, DialogActions, DialogContent } from '@mui/material';
import PasswordInput from './PasswordInput';
import { DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';


const PasswordResetForm = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ dialogTitle, setDialogTitle ] = useState('');
    const [ dialogContent, setDialogContent ] = useState('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

   /*  const handleCloseDialog = () => {
        setOpenDialog(false);
    }; */

    const { resetToken } = useParams();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password || !confirmPassword) {
            setDialogTitle('Error');
            setDialogContent('Please fill in all the fields');
            setOpen(true);
            return;
        }

        if (password !== confirmPassword) {
            setDialogTitle('Error');
            setDialogContent('Passwords do not match');
            setOpen(true);
            return;
        }

        /* if (!passwordRegex.test(password)) {
            setDialogTitle('Error');
            setDialogContent('Enter at least 8 characters, 1 uppercase letter, 1 number, and 1 special character');
            setOpen(true);
            return;
        } */

        try {
            console.log('Reset token:', resetToken);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resetEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ resetToken: resetToken, password }), // check this option of sending the token. Maybe more secure than in the URL.
            });

            if (!response.ok) {
                const data = await response.json();
                if (response.status === 400 && data.message === 'Invalid token') {
                    setDialogTitle('Error');
                    setDialogContent('Invalid token');
                    setOpen(true);
                } else if (response.status === 400) {
                    setDialogTitle('Error');
                    setDialogContent(data.message);
                    setOpen(true);
                
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                console.log('Data problema:', data);

                if (data.message === 'Password reset successful') {
                    console.log('Password reset successful');
                    setDialogTitle('Success');
                    setDialogContent('Password reset successful');
                    setOpen(true);

                    setPassword('');
                    setConfirmPassword('');
                    props.onResetSuccess(true);
                } else {
                console.log('Password reset failed');
                setDialogTitle('Error');
                setDialogContent('Password reset failed');
                setOpen(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Error message:', error.message);
            console.log('Error trace;', error.stack);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
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
                        Reset your Password
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'center'}} >
                        Please enter your password and confirm
                    </Typography>
                </Grid>

                <Grid item >
                
                
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
                        Reset Password
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
                        maxHeight: '230px',
                        textAlign: 'center'
                    },
                }}
            >
                <DialogTitle style={{ fontSize: dialogTitle.includes('must') ? '12px' : 'default'}}>{dialogTitle}</DialogTitle>
                    <DialogContent sx={{ overflow: 'hidden'}}>
                        <DialogContentText style={{color: 'orange'}}>
                            {dialogContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => {
                                setOpen(false);
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

    );
};      

export default PasswordResetForm;