

// User.js
import * as React from 'react';
import { useState, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Autocomplete, FormHelperText, FormLabel, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonOutLineIcon from '@mui/icons-material/PersonOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import Select from '@mui/material/Select';

import MenuLayout from '../../../Menu/MenuLayout'; 
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { GiConsoleController } from 'react-icons/gi';



const theme = createTheme();

export default function User() {
  

  const location = useLocation();
  /* const initialUserState = location.state ? {
    ...location.state.user,
    type: location.state.user.type || '',
  } : {  */
   
  const initialUserState = location.state ? location.state.user : {
    name: '',
    email: '',
    phone: '',
    type: '',
    /*category: '',*/
    status: '',
    registered_name: '',
    country: '',
    state: '',
    city: '',
    post_code: '',
    address: '',
    vat: '',
    payment_method: '',
    created: '',
  };
  const [user, setUser] = useState(initialUserState);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [upadateSuccess, setUpadateSuccess] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);
  const [registered_nameErrorMessage, setRegisteredNameErrorMessage] = useState(null);
  const [type, setType] = useState(user.type || '');// this is the solution at the problem with the select value not been rendered
  const [status, setStatus] = useState(user.status || '');// this is the solution at the problem with the select value not been rendered
  const countries = ["Spain", "France", "Germany", "Italy", "Portugal", "United Kingdom", "United States"];
  

  // only use if it is necessary to fetch the user data when not passed form BasicTable.js
  /* useEffect (() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${initialUserState.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        //const data = await response.json();

        const text = await response.text();
        console.log('Text:', text);

        const data = JSON.parse(text);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []); */

  const handleSave = async () => {
    //console.log('User:', user);

    let hasError = false;
    console.log('Validating user:', user);
  

    if (!user.name || user.name.trim() === '') {
      setNameErrorMessage('Name is required');
      hasError = true;
    } else {
      setNameErrorMessage(null);
    }

    if (!user.email || user.email.trim() === '') {
      setEmailErrorMessage('Email is required');
      hasError = true;
    } else {
      setEmailErrorMessage(null);
    }

  if (!user.phone || user.phone.trim() === '') {
    setPhoneErrorMessage('Phone is required');
    hasError = true;
  } else {
      //const phoneNumber = parsePhoneNumberFromString(user.phone);
      const phoneRegex = /^\+34 \d{3} \d{3} \d{3}$/;
      //if (!phoneNumber) {
      if (!phoneRegex.test(user.phone)) {
      setPhoneErrorMessage('Invalid phone number. Please enter the phone number in the correct format. "+34 XXX XXX XXX".');
      hasError = true;
    } else {
      setPhoneErrorMessage(null);
      //setUser ({ ...user, phone: phoneNumber.formatInternational()});
    } 
  }

    if (!user.registered_name || user.registered_name.trim() === '') {
      setRegisteredNameErrorMessage('Registered Name is required');
      hasError = true;
    } else {
      setRegisteredNameErrorMessage(null);
    }

    if (hasError) {
      setOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${initialUserState.id}`, {
      //const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const updatedUser = await response.json();
      console.log('Updated user:', updatedUser);
      setUser(updatedUser);
      setIsSaveDialogOpen(true);
      setTimeout(() => {
        setIsSaveDialogOpen(false);
      }, 3000);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  useEffect(() => {
    let timeoutId;
    if (isSaveDialogOpen) {
      timeoutId = setTimeout(() => {
        setIsSaveDialogOpen(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    }, [isSaveDialogOpen];
  });
  
  const handleEditPicture = () => {
    setIsEditing(true);
  };

  



  return (
    <ThemeProvider theme={theme}>
      <MenuLayout >
        <Card sx={{ maxWidth: '60%', margin: 'auto', mt: 5, mb: 2, }}>
        <Box sx={{ mb: 1, mt: 1, p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonOutLineIcon sx={{ color: 'orange', fontSize: 30 }} />
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
                    <Typography variant="body2" sx={{ color:'black'}}>
                      Name<span style={{ color: 'orange', fontSize: '1.5em'}}>*</span>
                    </Typography>
                    </FormLabel>
                      <OutlinedInput 
                        size="small" 
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        disabled={!isEditing}
                      />    
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                    <Typography variant="body2" sx={{ color:'black'}}>
                      Email<span style={{ color: 'orange', fontSize: '1.5em'}}>*</span>
                    </Typography>
                  </FormLabel>
                      <OutlinedInput 
                        size="small"
                        value={user.email}
                        onChange={(e) =>  setUser({ ...user, email: e.target.value })} 
                        disabled={!isEditing}
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
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    disabled={!isEditing}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                    <Typography variant="body2" sx={{ color:'black'}}>Type</Typography>
                  </FormLabel>
            
                  <Select
                    size="small" 
                    //value={user.type || ''}
                    value={type}
                    onChange={(e) => 
                      {
                      console.log('e.target.value:', e.target.value);
                      setType(e.target.value);
                      setUser({ ...user, type: e.target.value || ''});
                      }
                    }
                    disabled={!isEditing}
                  >
                    <MenuItem value="" style={{ display: 'none' }}></MenuItem>
                    <MenuItem value={"Virtual Office"}>Virtual Office</MenuItem>
                    <MenuItem value={"Meeting Room"}>Meeting Room</MenuItem>
                    <MenuItem value={"Cowork"}>Cowork</MenuItem> 
                  </Select>

                </FormControl>
              </Grid>


              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Created</Typography>
                    </FormLabel>
                  <OutlinedInput 
                    size="small" 
                    value={user.created}
                    onChange={(e) => setUser({ ...user, created: e.target.value })}
                    disabled={!isEditing}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Status</Typography>
                    </FormLabel>
                  
                    <Select
                    size="small" 
                    //value={user.type || ''}
                    value={status}
                    onChange={(e) => 
                      {
                      console.log('e.target.value:', e.target.value);
                      setStatus(e.target.value);
                      setUser({ ...user, status: e.target.value || ''});
                      }
                    }
                    disabled={!isEditing}
                  >
                    <MenuItem value="" style={{ display: 'none' }}></MenuItem>
                    <MenuItem value={"active"}>Active</MenuItem>
                    <MenuItem value={"inactive"}>Inactive</MenuItem>
                  </Select>

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
              <PaymentIcon sx={{ color: 'orange', fontSize: 30 }} />
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
                    <Typography variant="body2" sx={{  color:'black'}}>
                      Registered Name<span style={{ color: 'orange', fontSize: '1.5em'}}>*</span>
                    </Typography>
                    </FormLabel>
                      <OutlinedInput 
                        size="small"
                        value={user.registered_name}
                        onChange={(e) => setUser({ ...user, registered_name: e.target.value })}
                        disabled={!isEditing}
                      />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                  <Typography variant="body2" sx={{ color:'black'}}>Country</Typography>
                    </FormLabel>


                  <Autocomplete 
                    size="small" 
                    value={user.country}
                    onChange={(e) => setUser({ ...user, country: e.target.value })}
                    options={countries}
                    renderInput={(params) => <OutlinedInput {...params} />}
                    disabled={!isEditing}
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
                    value={user.state}
                    onChange={(e) => setUser({ ...user, state: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.post_code}
                    onChange={(e) => setUser({ ...user, post_code: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.vat}
                    onChange={(e) => setUser({ ...user, vat: e.target.value })}
                    disabled={!isEditing}
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
                    value={user.payment_method}
                    onChange={(e) => setUser({ ...user, payment_method: e.target.value })}
                    disabled={!isEditing}
                  />
                </FormControl>
              </Grid>
            </Grid>
            </Box>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              {!isEditing && (
                <Button 
                  startIcon={ <EditIcon />} 
                  size="small" 
                  variant="outlined" 
                  onClick={() => setIsEditing(true)}
                  >
                  Edit
                </Button>
              )}
              {isEditing && (
                <>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
                <Button 
                  size="small" 
                  color="success"
                  variant="outlined" 
                  onClick={handleSave}
                  >
                  Save
                </Button>
                </>
              )}    
            </CardActions>
          </Box>
        </Card>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: 'orange'}}>
              {nameErrorMessage || emailErrorMessage || phoneErrorMessage || registered_nameErrorMessage ||'this field is required'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary" variant= "outlined" sx={{ color: 'green', borderColor: 'green'}}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          fullWidth={true}
          maxWidth={'xs'}
          PaperProps={{ 
            style: { 
              color: 'orange',
              boxShadow: 'none',
              borderRadius: '5px'
            } 
          }}
        >
          <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircleOutlineIcon style={{ color:'green', fontSize: '3rem'}} />
            User updated successfully
          </DialogTitle>
          </Dialog>

      </MenuLayout>
     
    </ThemeProvider>
  );
}