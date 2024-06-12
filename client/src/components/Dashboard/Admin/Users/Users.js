//Users.js
import React, { useState }from 'react';
import MenuLayout from '../../../Menu/MenuLayout'; 
import BasicTable from './BasicTable';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import {useTheme } from '@mui/material/styles';

import Modal from '@mui/material/Modal';
import AddUser from './AddUser';

const Users = () => {
  const handleAddUser = () => {
    // logic for adding a new user goes here
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <MenuLayout>

      <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%" marginTop="55px">
        <Box sx={{ maxWidth: 'lg', margin: 'auto', boxShadow: 0, height: 50, width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{  
              marginBottom: '1rem',
              marginRight: '0rem',
            }}
          >
          Add
          </Button>
          </Box>
          <BasicTable/>
      </Box>


   {/*  <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%" marginTop="64px">
      <Box width="100%" maxWidth="lg" marginRight="1 rem">
       
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ backgroundColor: '#4caf50', color: 'white', marginBottom: '1rem', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Add
          </Button>
       
      </Box>
      <Box width="100%" maxWidth="lg" marginRight="1 rem">
        <BasicTable/>
      </Box>
    </Box> */}

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '100%',
        bgcolor: '#e5e5e5',
        border: '0px solid #000',
        borderRadius: '15px',
        boxShadow: 24,
        p: 1,
        maxHeight: '80%',
        overflowY: 'auto',
      }}>
        <AddUser/>
      </Box>
    </Modal>
    </MenuLayout>
  );
};

export default Users;