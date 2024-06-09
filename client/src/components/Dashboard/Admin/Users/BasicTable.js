
// BasicTable.js
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';


export default function DataTable() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    const columns = [
        //{ field: 'id', headerName: 'ID', width: 100, hide: true }, 
        { field: 'name', headerName: 'Name', width: 300, filterable: true },
        { field: 'email', headerName: 'Email', width: 200, filterable: true },
        /* {
            field: 'nameAndEmail',
            headerName: 'Name',
            width: 250,
            filterable: true,
            renderCell: (params) => {
                const user = params.row;
                if(!user) {
                    console.log('User not found');
                    return null;
                }
                if(!user.email) {
                    console.log('Email not found');
                    return null;
                }

                console.log(user.name, user.email);

                return (
                    
                    <div>
                    {user.name ? user.name : ''}<br />{user.email}
                </div>
                )
            }
        }, */
        { field: 'phone', headerName: 'Phone', width: 200, filterable: true},
        { field: 'category', headerName: 'Category', width: 175, filterable: true },
        { field: 'status', headerName: 'Status', width: 175, filterable: true },
        //{ field: 'created', headerName: 'Created', width: 200, filterable: true, type: 'date' },
        { 
            field: 'delete', 
            headerName: ' ', 
            sortable: false,
            width: 100, 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const id = params.row.id;
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    setUsers(users.filter(user => user.id !== id));
                };
                return (
                    <IconButton style={{color: 'orange'}} onClick={onClick}>
                        <DeleteOutlineIcon />
                    </IconButton>
                );
                
            }
        },
    ];
 
    useEffect(() => {
        const fetchUsers = async () => { 
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const text = await response.text();
                //console.log('Text:', text);

                let data = JSON.parse(text);
                data = data.sort((a, b) => {
                    if (a.name && b.name) {
                        return a.name.localeCompare(b.name);
                    } else if (a.name) {
                        return -1; // a is sorted to an index lower than b
                    } else if (b.name) {
                        return 1; // a is sorted to an index higher than b
                    } else {
                        return 0; // a and b remain with their original order
                    }
                });
                setUsers(data);
                console.log('Users:', data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRowClick = (params) =>{
        const user = users.find(user => user.id === params.row.id);
        console.log('User:', user);
        navigate(`/dashboard/admin/users/${params.row.id}`, { state: { user: user } });
    };

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    columnHeader: {
                        '&: focus-within': {
                            outline: 'none',
                        },
                    },
                },
            },
        }
    });
    
    return (
       /*  <Container maxWidth="lg"> */
            <Box sx={{ maxWidth: 'lg', margin: 'auto', boxShadow: 3, height: 600, width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
           
            <DataGrid
                style={{ height: 600, width: '100%', cursor: 'pointer'}}
                rows={users}
                columns={columns}
                pageSize={25}
                rowHeight={75}
                rowsPerPageOptions={[10, 25, 50, 100]}
                checkboxSelection
                components={{
                    Toolbar: GridToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        density: 'compact',
                    },
                }}
                onRowClick={handleRowClick}
                disableVirtualization
                />
           
            )}
            </Box>
       /*  </Container> */
    );
}



