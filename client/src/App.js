import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4">
        Welcome to the BeWorking new Website!
      </Typography>
      <Button 
        variant="contained" 
        component={Link} 
        to="/login" 
        style={{ marginTop: '20px', width: '300px', backgroundColor: 'orange' }}
      >
        Click here to login
      </Button>
    </div>
  );
}

export default App;