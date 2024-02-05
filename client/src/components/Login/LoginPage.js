// LoginPage.js
import React, {useState} from 'react';
import { Grid,Box, Typography, Link} from '@mui/material';
import Login from './Login'; 
import RegistrationForm from './RegistrationForm';


const LoginPage = () => {

        const [showRegistrationForm, setShowRegistrationForm] = useState(false);
        const [showSignUpLink, setShowSignUpLink] = useState(true);


        

        const backgroundImageStyle = {
                height: '100vh',
                background: `
                    linear-gradient(
                        rgba(255, 165, 0, 0.5), 
                        rgba(255, 165, 0, 0.5)
                    ),
                    url(/piclogin3.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
        };

        const loginContainerStyle = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative'
        };


        const handleSignUpClick= (event) => {
                event.preventDefault();
                setShowRegistrationForm(true);
                setShowSignUpLink(false);
        };
        const handleLoginClick= (event) => {
                event.preventDefault();
                setShowRegistrationForm(false);
                setShowSignUpLink(true);
        }
        const handleRegistrationSuccess = () => {
                setShowRegistrationForm(false);
                setShowSignUpLink(true);
                window.alert('Registration Successful. Please login to continue.');
        }


        

        return (
                <Grid container style={{ height: '100vh', position: 'relative' }}>
                    <Grid item xs={4} style={backgroundImageStyle}>
                        {/* Orange Background Here */}
                    </Grid>
                    <Grid item xs={8} style={loginContainerStyle}>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                          {showRegistrationForm ? <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} /> : <Login />}
                        </Box>
                        <Box position="absolute" top={2} left={2}>
                                <Link href="/">
                                 <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '50px', marginTop: '30px'}} /> {/* Logo image */}
                                </Link>
                        </Box>
                        <Box position = "absolute" top={2} right={2} display= "flex" alignItems="center">
                                {showSignUpLink ?
                                <Typography variant="body2" style={{marginTop: '50px', color: '#808080'}}> 
                                New to BeWorking 
                                <Link  href = "#" onClick={handleSignUpClick} style = {{color: 'orange', marginRight: '20px', marginLeft: '10px', marginTop: '50px'}}
                                underline='none'
                                >
                                Register
                                </Link>
                                </Typography>
                                :
                                <Typography variant="body2" style={{marginTop: '50px', color: '#808080'}}> 
                                Already have an Account? 
                                <Link  href = "#" onClick={handleLoginClick} style = {{color: 'orange', marginRight: '20px', marginLeft: '10px', marginTop: '50px'}}
                                underline='none'
                                >Login
                                </Link>
                                </Typography>
                                }
                        </Box>
                    </Grid>
                    
                </Grid>
        );
};

export default LoginPage;
