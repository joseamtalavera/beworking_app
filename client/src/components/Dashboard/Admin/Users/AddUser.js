

// User.js
import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonOutLineIcon from '@mui/icons-material/PersonOutline';
import PaymentIcon from '@mui/icons-material/Payment';

import MenuLayout from '../../../Menu/MenuLayout'; 
import { useLocation } from 'react-router-dom';


const theme = createTheme();

export default function User() {


  const location = useLocation();
  const initialUserState = location.state ? location.state.user : {
    name: '',
    email: '',
    phone: '',
    type: '',
    category: '',
    status: '',
    registeredName: '',
    country: '',
    county: '',
    city: '',
    postCode: '',
    address: '',
    vat: '',
    paymentMethod: '',
  };
  const [user, setUser] = useState(initialUserState);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditPicture = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // logic for updating user goes here
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('HTTP Error'+ response.status);
      }
      alert('User updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update user');
    }
  }
  


  return (
    <ThemeProvider theme={theme}>
     {/*  <MenuLayout > */}
        <Card sx={{ maxWidth: '100%', margin: 'auto', mt: 5, mb: 2, }}>
        <Box sx={{ mb: 1, mt: 1, p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonOutLineIcon sx={{ color: 'orange', fontSize: 40 }} />
            <Box>
              <Typography variant="h6" sx={{ mb: 0.5, mb:0.5, ml:2, color: 'orange'}}>Profile</Typography>
            </Box>
          </Box>
        <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }} /> {/* User avatar */}
            <IconButton 
              sx={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              backgroundColor: 'white', 
              padding: '3px', 
              '&:hover': { backgroundColor: 'white' } 
              }} 
              onClick={handleEditPicture} /* Edit icon button */
            >
              <EditIcon />
            </IconButton>
            </Box>
        </Box>
          <Divider />
          <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ my: 1 }}>
           <Box
            sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 0, mt: 1, p:2
            }}
            >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel variant="body2" sx={{ mb: 0.5, fontWeight: 'bold' }}>
                    <Typography variant="body2" sx={{ color:'black'}}>Name</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small"
                    name="name"
                    value={user.name}
                    onChange={handleChange} 
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Email</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name="email"
                    value={user.email}
                    onChange={handleChange} 
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color: 'black'}}>Phone</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}  
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Type</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name="type"
                    value={user.type}
                    onChange={handleChange} 
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Category</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name="category"
                    value={user.category}
                    onChange={handleChange} 
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Status</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name="status"
                    value={user.status}
                  />
                </FormControl>
              </Grid>
              
            </Grid>
          
            </Box>
          </Stack>
          {/* <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="small" variant="outlined">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ backgroundColor: '#4caf50', color: 'white'}}>
                Save
              </Button>
            </CardActions>
          </Box> */}
          
       {/*  </Card> */}
       {/*  <Card sx={{ maxWidth: '60%', margin: 'auto', mt: 2, mb: 2, mb: 5 }}> */}
          <Box sx={{ mb: 1, mt: 1, p:2, display: 'flex', alignItems: 'center'}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PaymentIcon sx={{ color: 'orange', fontSize: 40 }} />
                <Box >
                  <Typography variant="h6" sx={{ mb: 0.5, mb:0.5, ml:2, color: 'orange'}}>Billing</Typography>
                </Box >
            </Box>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
           <Box
            sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 0, mt: 1, p:2
            }}
            >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel variant="body2" sx={{ mb: 0.5, fontWeight: 'bold' }}>
                    <Typography variant="body2" sx={{  color:'black'}}>Registered Name</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small"
                    name="registerdName" 
                    value={user.registeredName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Country</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='country'
                    value={user.country}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>State</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='county'
                    value={user.county}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>City</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='city'
                    value={user.city}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Post Code</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='postCode'
                    value={user.postCode}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Address</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='address'
                    value={user.address}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>VAT</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='vat'
                    value={user.vat}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Method of Payment</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    name='paymentMethod'
                    value={user.paymentMethod}
                    />
                </FormControl>
              </Grid>
            </Grid>
            </Box>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              
                <>
                <Button size="small" variant="outlined" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type= "submit" size="small" variant="contained" sx={{ backgroundColor: '#4caf50', color: 'white'}}>
                  Save
                </Button>
                </>  
            </CardActions>
          </Box>
          </form>
        </Card>   
     {/*  </MenuLayout> */}
    </ThemeProvider>
  );
}