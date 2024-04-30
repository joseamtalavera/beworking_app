import React , {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Pagination } from '@mui/lab';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuLayout from '../../../Menu/MenuLayout';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import FilterBox from './FilterBox';


const Users = () => {
  // Your existing code here

  // Pagination state
  const[loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    // Add more users as needed
  ]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFilter = (filteredUsers) => {
    setUsers(filteredUsers);
  };

  // Your existing code here
  if (loading) {
    return (
      <MenuLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      </MenuLayout>
    );
  }

  return (
    <MenuLayout>
      {/* <Box maxWidth="30%" m="auto"> 
        <FilterBox onFilter={handleFilter} />
      </Box> */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          component={Link} 
          to="/dashboard/admin/users/user"
          style={{ marginTop: '-5px', width: '100px', backgroundColor: 'orange', textTransform: 'none', borderRadius: '20px'}}
          >
            <Typography style={{ color: 'white' }}>
              User
            </Typography>
        </Button>
      </Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination count={Math.ceil(users.length / 10)} page={page} onChange={handleChange} />
      </Box>
    </MenuLayout>
  );
};

export default Users;