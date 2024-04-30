//ResponsiveDrawerAdmin.js

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemIcon } from '@mui/material';
import Divider from '@mui/material/Divider'; 
import {
    PeopleOutline as UsersIcon,
    CalendarTodayOutlined as CalendarIcon,
    BookOutlined as BookingsIcon,
    ReceiptOutlined as InvoicingIcon,
    BuildOutlined as MaintenanceIcon,
    StarBorderOutlined as ReviewsIcon,
    BusinessOutlined as CentresIcon,
    LocalOfferOutlined as ProductIcon,
    SettingsOutlined as SettingsIcon,
    HelpOutline as HelpIcon,
  } from '@mui/icons-material';

const DRAWER_WIDTH = 250;
const MOBILE_BREAKPOINT = 900;
const APPBAR_HEIGHT = 64;


function ResponsiveDrawerAdmin() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [windowWith, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }
    , []);
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        setOpen(!open);
    };
    const handleClick = () => {
        setOpen(!open);
    };

    const listItems = [
        { text: 'Users', icon: <UsersIcon sx={{fontSize: 20}} />, path: '/dashboard/admin/users'},
        { text: 'Calendar', icon: <CalendarIcon sx={{fontSize: 20}} /> },
        { text: 'Bookings', icon: <BookingsIcon sx={{fontSize: 20}} /> },
        { text: 'Invoicing', icon: <InvoicingIcon sx={{fontSize: 20}} /> },
        // Add more items as needed
    ];
      
    const moreItems = [
        { text: 'Maintenance', icon: <MaintenanceIcon sx={{fontSize: 20}} /> },
        { text: 'Reviews', icon: <ReviewsIcon sx={{fontSize: 20}} /> },
        { text: 'Centres', icon: <CentresIcon sx={{fontSize: 20}} /> },
        { text: 'Product', icon: <ProductIcon sx={{fontSize: 20}} /> },
        { text: 'Settings', icon: <SettingsIcon sx={{fontSize: 20}} /> },
        { text: 'Help', icon: <HelpIcon sx={{fontSize: 20}} /> },
    ];

    const drawer = (
        <div> 
            <List>
                {listItems.map(({text, icon, path }, index) => (

                    <ListItem
                        button 
                        key={text}
                        onClick={() => setActiveItem(text)}
                        component={path ? Link : 'div'}
                        to={path}
                        sx={{
                            color: 'black',
                            '&:hover, &:focus': {
                                backgroundColor: '#E8E8E8',
                                color: 'green',
                              },
                        }}
                    >
                        <ListItemIcon 
                            sx={{
                                minWidth: '30px', 
                                color: 'inherit', 
                                paddingLeft: '20px',
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={ 
                                <Typography 
                                    variant="body2" 
                                    sx={{
                                        fontSize:'13px', 
                                        color: 'inherit',
                                        fontWeight: activeItem === text ? 'bold' : 'normal',
                                    }}
                                >
                                    {text}
                                </Typography>
                            }
                        />
                    </ListItem>

                ))}
                <Divider />

                <ListItem 
                    button 
                    onClick={handleClick}
                >
                    <ListItemText 
                        primary="More +" 
                        style={{color:'black'}} 
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse 
                    in={open} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        {moreItems.map(({text, icon},index) => (
                            <ListItem 
                                button 
                                key={text} 
                                onClick={() => setActiveItem(text)}
                                sx={{
                                    color: 'black',
                                    paddingLeft: '30px',
                                    '&:hover, &:focus': {
                                        backgroundColor: '#E8E8E8',
                                        color: 'green',
                                    },
                                }}
                                >
                                <ListItemIcon 
                                    sx={{
                                        minWidth: '30px', 
                                        color: 'inherit',
                                        paddingLeft: '20px',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography 
                                        variant="body2" 
                                        sx={{
                                            color:'grey', 
                                            fontSize:'13px', 
                                            color: 'inherit',
                                            fontWeight: activeItem === text ? 'bold' : 'normal',
                                            }}
                                        >
                                    {text}
                                </Typography>}/>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem 
                    button 
                    key="Logout" 
                    component={Link} 
                    to="/login"
                    sx={{
                        '&:hover, &:focus': {
                            backgroundColor: '#E8E8E8',
                            color: 'green',
                        },
                    }}
                >
                    <ListItemText 
                        primary={
                            <Typography 
                                variant="body2" 
                                sx={{
                                    color:'black', 
                                    fontSize:'13px',
                                    '&:hover, &:focus': {
                                        color: 'red',
                                    },
                                }}
                            >
                                Logout
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar 
                position="fixed" 
                style={{
                    zIndex: theme.zIndex.drawer +1, 
                    backgroundColor: 'white', 
                    color: 'black', 
                    boxShadow:'none'
                    }}
                >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" style={{ maxWidth: '125px', maxHeight: '75px', marginLeft: '20px', marginTop: '0px'}} /> {/* Logo image */}
                    </Link>
                    
                    {isMobile ? (
                        <IconButton
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
            
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={!isMobile ? mobileOpen: open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
                PaperProps={{
                    style: {
                        width: windowWith < MOBILE_BREAKPOINT ? '100%' : DRAWER_WIDTH,
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        marginTop: 56 
                    }
                }}
            >
                {drawer}
            </Drawer>
            {/* Placeholder div to prevent content from being overlapped by the fixed AppBar */}
            {!isMobile && <div style={{ height: APPBAR_HEIGHT }} />} {/* Placeholder div */}
        </div>
    );
}

export default ResponsiveDrawerAdmin;
 