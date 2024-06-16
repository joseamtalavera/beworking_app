

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
import { Autocomplete, FormLabel, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonOutLineIcon from '@mui/icons-material/PersonOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import BookOnLineIcon from '@mui/icons-material/BookOnline';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionOutLinedIcon from '@mui/icons-material/DescriptionOutlined';
import CommentOutLinedIcon from '@mui/icons-material/CommentOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import Select from '@mui/material/Select';

import MenuLayout from '../../../Menu/MenuLayout'; 
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';
import {Country, State, City} from 'country-state-city';
import { orange } from '@mui/material/colors';

const options = [
  { name: 'Profile', icon: <PersonOutLineIcon sx={{ color: 'orange', fontSize: 30 }} /> },
  { name: 'Billing', icon: <PaymentIcon sx={{ color: 'orange', fontSize: 30 }} /> },
  //{ name: 'Booking', icon: <BookOnLineIcon sx={{ color: 'orange', fontSize: 30 }} /> },
  { name: 'Documents', icon: <DescriptionOutLinedIcon sx={{ color: 'orange', fontSize: 30 }} /> },
  { name: 'Comments', icon: <CommentOutLinedIcon sx={{ color: 'orange', fontSize: 30 }} /> },
];






const theme = createTheme();

export default function User() {
  
  const location = useLocation();
  const initialUserState = location.state ? location.state.user : {
    name: '',
    email: '',
    phone: '',
    type: '',
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
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);
  const [registered_nameErrorMessage, setRegisteredNameErrorMessage] = useState(null);
  const [type, setType] = useState(user.type || '');// this is the solution at the problem with the select value not been rendered
  const [status, setStatus] = useState(user.status || '');
  
  let countries = Country.getAllCountries();
  const [country, setCountry] = useState(user.country || '');
  
  const [state, setState] = useState(user.state || '');
  const [states, setStates] = useState([]);
  
  const [city, setCity] = useState(user.city || '');
  const [cities, setCities] = useState([]);

  const [selectedOption, setSelectedOption] = useState('User');

  

  useEffect(() => {
    if (country) {
      const countryObject = countries.find(c => c.name === country);
      if (countryObject) {
        const statesOfCountry = State.getStatesOfCountry(countryObject.isoCode).map((state) => state.name);
        setStates(statesOfCountry);
      }
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const countryObject = countries.find(c => c.name === country);
      const stateObject = State.getStatesOfCountry(countryObject.isoCode).find(s => s.name === state);
      if (stateObject) {
        const citiesOfState = City.getCitiesOfState(countryObject.isoCode, stateObject.isoCode).map((city) => city.name);
        setCities(citiesOfState);
      }
    }
  }, [state]);


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

    
     
    </ThemeProvider>
  );
}