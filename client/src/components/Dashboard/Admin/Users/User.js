import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import MenuLayout from '../../../Menu/MenuLayout';

const AddUser = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    google_id: '',
    confirmation_token: '',
    email_confirmed: false,
    is_admin: false,
    commercial_name: '',
    contact_person: '',
    phone: '',
    type: '', // supplier, customer
    category: '', // cowork, nomad, meeting-room, virtual office
    status: '', // converted, potential, rejected, waiting list, contacted, visitor
    street_and_number: '',
    post_code: '',
    county: '',
    country: '',
    registered_name: '',
    vat: '',
    payment_method: '', // card, bank transfer, bank charge
    additional_data: ''
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code here to handle form submission
  };

  return (
    <MenuLayout>
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" value={user.email} onChange={handleChange} />
      <TextField name="password" label="Password" value={user.password} onChange={handleChange} />
      {/* Add more TextField components for each field */}
      <Button type="submit">Add User</Button>
    </form>
    </MenuLayout>
  );
};

export default AddUser;