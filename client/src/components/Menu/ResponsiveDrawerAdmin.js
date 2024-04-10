import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Button, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function ResponsiveDrawerAdmin() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(900));
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClick = () => {
        setOpen(!open);
    };

    const drawer = (
        <div> 
    
            <List>
                {['Users', 'Calendar', 'Bookings', 'Invoicing'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} style={{color:'orange'}} />
                    </ListItem>
                ))}
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="More +" style={{color:'orange'}} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Mantenimiento', 'Reviews', 'Centres', 'Product','Settings', 'Help'].map((text, index) => (
                            <ListItem button key={text} style={{paddingLeft: '30px'}}>
                                <ListItemText primary={text} style={{color:'orange'}} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button key="Logout" component={Link} to="/login">
                    <ListItemText primary="Logout" style={{color:'orange'}} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static" style={{ background: 'white' }} elevation={0}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '50px', marginTop: '0px'}} /> {/* Logo image */}
                    </Link>
                </Box>
                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            style={{ color: 'orange' }}
                        >
                        <MenuIcon />
                        </IconButton>
                    ) : null}
                </Toolbar>
                
                     
                    <Drawer
                        variant={isMobile ? "temporary" : "permanent"}
                        anchor="left"
                        open={!isMobile || mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        PaperProps={{
                            style: {
                                width: '30%',
                                background: 'white',
                                color: 'orange',
                                border: '1px solid orange '
                            }
                        }}
                    >
                        {drawer}
                    </Drawer>
            </AppBar>
        </div>
    );
}

export default ResponsiveDrawerAdmin;