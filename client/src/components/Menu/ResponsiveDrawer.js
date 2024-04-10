import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(900));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div> 
    
            <List>
                {['Solutions', 'Pricing', 'Contact'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} style={{color:'white'}} />
                    </ListItem>
                ))}
                <ListItem button key="Login" component={Link} to="/login">
                    <ListItemText primary="Login" style={{color:'white'}} />
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
                            edge="end"
                            onClick={handleDrawerToggle}
                            style={{ color: 'orange' }}
                        >
                        <MenuIcon />
                        </IconButton>
                    ) : (
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '40px'}}>
                            {['Solutions', 'Pricing', 'Contact'].map((text, index) => (
                                <Typography style={{ color: 'orange', marginRight: '30px'}}>
                                    {text}
                                </Typography>
                            ))}
                            <Button 
                                variant="contained" 
                                component={Link} 
                                to="/login" 
                                style={{ marginTop: '-5px', width: '100px', backgroundColor: 'orange', textTransform: 'none', borderRadius: '20px'}}
                            >
                                <Typography style={{ color: 'white'}}>
                                    Login
                                </Typography>  
                            </Button>
                        </div>
                    )}
                </Toolbar>
                {isMobile && (
                     
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        PaperProps={{
                            style: {
                                width: '30%',
                                background: 'orange',
                                color: 'white'
                            }
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
            </AppBar>
        </div>
    );
}

export default ResponsiveDrawer;