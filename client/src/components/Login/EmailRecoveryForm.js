// EmailRecoveryForm.js
import React, {useState} from 'react';
import {Box, Button, TextField, Grid, Typography, Link } from '@mui/material';

const EmailRecoveryForm = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle email recovery here
    };

    const formContainerStyle = {
        minWidth: '500px', // Or any suitable width
        margin: 'auto', // This centers the form
        padding: '20px', // Optional, for internal spacing
        boxSizing: 'border-box' // Ensures padding doesn't affect overall width
      };

   

    return (
        
        <Box component="form" onSubmit={handleSubmit} sx={formContainerStyle} >
          
            <Grid container direction="column" spacing={2}>
                <Grid item >
                    <Typography variant="h4" sx={{textAlign: 'center'}}>
                        Forgot your password?
                    </Typography>
                    <Typography variant="body1" sx={{mb:2, textAlign: 'center'}}>
                    Please enter your emial address                   
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField
                        required
                        id="email"
                        label="Email address"
                        value={email}
                        onChange={handleEmailChange}
                        variant='outlined'
                        fullWidth
                        autoComplete='email'
                        placeholder='Email address'
                        InputProps={{
                            style: {color: '#808080'},
                        }}
                        sx={
                            {
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'orange',
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'orange',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'orange',
                                },
                                '& .MuiInputLabel-outlined.Mui-focused': {
                                    color: '#808080',
                                },
                            }
                        }
                        style={{ marginBottom: '20px' }}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ mt: 0, mb: 2, backgroundColor: '#32CD32', '&:hover': { backgroundColor: 'green' } }}
                        >
                        Recover Email
                    </Button>
                
                    <Typography align="center" variant="body2" style={{color: '#808080'}}>
                        Back to my <Link href="/login" underline='none'>BeWorking Account       </Link>
                    </Typography>
                </Grid>
            </Grid>
        
        </Box>

    );
};

export default EmailRecoveryForm;