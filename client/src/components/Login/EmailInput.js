import React from 'react';
import { TextField } from '@mui/material';

const EmailInput = ({ email, handleEmailChange }) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            value={email}
            //onChange={(e) => setEmail(e.target.value)}
            onChange={handleEmailChange}
            placeholder='Email address'
            InputProps={{
                style: {color: '#808080'},
            }}
            sx={{
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
            }}
            style={{ marginBottom: '20px' }}
        />
    );
};

export default EmailInput;