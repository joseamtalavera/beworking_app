import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ password, showPassword, setPassword, handleMouseDownPassword, setShowPassword, autoComplete, label, placeholder, required, ...props }) => {
    const toggleShowPassword = () => setPassword(!showPassword);

    return (
        <TextField
            variant="outlined"
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            label={label}
            autoComplete={autoComplete}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={placeholder}
            InputProps={{
                style: { color: '#808080' },
                endAdornment: (
                    <IconButton style={{ color: '#808080' }} onClick={toggleShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                ),
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
            {...props}
        />
    );
};

export default PasswordInput;