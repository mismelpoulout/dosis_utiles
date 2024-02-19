import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import  logo from './logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          dosis_<strong>Utiles</strong>
        </Typography>
        <Drawer
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <List>
            <ListItem>
            <img className="icon" src={logo} alt="logo" style={{ height: '100px',
             boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', 
            marginRight: '15px' }} 
             />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Nosotros" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Politica de privacidad" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
