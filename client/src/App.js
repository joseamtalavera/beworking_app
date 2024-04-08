import React from 'react';
import { Typography, Button } from '@mui/material';
import ResponsiveDrawer from './components/Login/ResponsiveDrawer';

// Main component
function App() {
  return (
    <div>
      <ResponsiveDrawer />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">
          Welcome to the BeWorking new Website!
        </Typography>
      </div>
    </div>
  );
}

export default App;

