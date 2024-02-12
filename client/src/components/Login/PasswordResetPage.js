// PasswordResetForm.js
import React, { useState } from 'react';
import { Grid, Box, Typography, Link } from '@mui/material';
import PasswordResetForm from './PasswordResetForm';
import ThanksPage from './ThanksPage';

const PasswordResetPage = () => {
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(true);
    const [showThanksPage, setShowThanksPage] = useState(false);

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

    const resetContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative'
    };

    const handleResetSuccess = () => {
        setShowPasswordResetForm(false);
        setShowThanksPage(true);
        window.alert('Password reset successful. Please login to continue.');
    }

    return (
        <Grid container style={{ height: '100vh', position: 'relative' }}>
            <Grid item xs={4} style={backgroundImageStyle}>
                {/* Orange Background Here */}
            </Grid>
            <Grid item xs={8} style={resetContainerStyle}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    {showPasswordResetForm ? <PasswordResetForm onResetSuccess={handleResetSuccess} /> : <ThanksPage />}
                </Box>
                <Box position="absolute" top={2} left={2}>
                    <Link href="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '50px', marginTop: '30px' }} /> {/* Logo image */}
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PasswordResetPage;