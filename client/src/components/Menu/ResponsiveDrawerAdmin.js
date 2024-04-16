//ResponsiveDrawerAdmin.js

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import UserIcon from '@mui/icons-material/Person';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import BookingsIcon from '@mui/icons-material/Book';
import InvoicingIcon from '@mui/icons-material/Receipt';



function ResponsiveDrawerAdmin() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(900));
    const [open, setOpen] = useState(false);
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        setOpen(!open);
    };
    const handleClick = () => {
        setOpen(!open);
    };

    const listItems = [
        { text: 'Users', icon: <UserIcon /> },
        { text: 'Calendar', icon: <CalendarIcon /> },
        { text: 'Bookings', icon: <BookingsIcon /> },
        { text: 'Invoicing', icon: <InvoicingIcon /> },
        // Add more items as needed
    ];



    const drawer = (
        <div> 
    
            <List>
                {/* {['Users', 'Calendar', 'Bookings', 'Invoicing'].map((text, index) => ( */}
                {listItems.map(({text, icon }, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon> 
                                {React.cloneElement(icon, { style: { fontSize: '18px', color: 'black'} })}
                        </ListItemIcon>
                        <ListItemText primary={ 
                            <Typography variant="body2" style={{color:'black', fontSize:'14px'}}>
                                {text}
                            </Typography>}/>
                    </ListItem>
                ))}
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="More +" style={{color:'black'}} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Mantenimiento', 'Reviews', 'Centres', 'Product','Settings', 'Help'].map((text, index) => (
                            <ListItem button key={text} style={{paddingLeft: '30px'}}>
                                <ListItemText primary={
                                    <Typography variant="body2" style={{color:'grey', fontSize:'14px'}}>
                                    {text}
                                </Typography>}/>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button key="Logout" component={Link} to="/login">
                    <ListItemText primary={
                                    <Typography variant="body2" style={{color:'black', fontSize:'14px'}}>
                                    Logout
                                </Typography>}/>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {/* Moved the AppBar outside the Drawer */}
            <AppBar position="fixed" style={{zIndex: theme.zIndex.drawer +1, backgroundColor: 'white', color: 'black', boxShadow:'none'}}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Link to="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '50px', marginTop: '0px'}} /> {/* Logo image */}
                    </Link>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Header Title
                    </Typography> */}
                    {isMobile ? (
                        <IconButton
                            //color="orange"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            style={{ color: 'orange' }}
                        >
                        <MenuIcon />
                        </IconButton>
                    ) : null}
                </Toolbar>
            </AppBar>
            {/* Drawer component */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={!isMobile ? mobileOpen: open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                PaperProps={{
                    style: {
                        width: '20%',
                        background: 'white',
                        color: 'black',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                        marginTop: 64 // Adjust this value as needed to position the drawer below the header
                    }
                }}
            >
                {drawer}
            </Drawer>
            {/* Placeholder div to prevent content from being overlapped by the fixed AppBar */}
            {!isMobile && <div style={{ height: 64 }} />} {/* Placeholder div */}
        </div>
    );
}

export default ResponsiveDrawerAdmin;
 