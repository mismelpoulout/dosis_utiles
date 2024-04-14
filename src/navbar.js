import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
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
          <Typography
      variant="h5"
      component="div"
      sx={{ flexGrow: 1 }}
      onClick={handleRedirect} // Opcional: Puedes usar un evento onClick para activar la redirección
      style={{ cursor: 'pointer' }} // Opcional: Cambiar el cursor para indicar que es interactivo
    >
      dosis_<strong>Utiles</strong>
    </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '200px', // Ajusta el ancho del Drawer horizontal
          },
        }}
      >
        <List >
          <ListItem>
            <img
              className="icon"
              src={logo}
              alt="logo"
              style={{
                height: '100px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                marginRight: '15px',
              }}
            />
          </ListItem>
          <ListItem button component="a" href="/nosotros">
          <ListItemText primary="Nosotros" />
        </ListItem>
        <ListItem button component="a" href="/politica-de-privacidad">
          <ListItemText primary="Politica de privacidad" />
        </ListItem>
        <ListItem button component="a" href="mailto:medstudioparato2@gmail.com?body=Le responderemos a la brevedad">
          <ListItemText primary="Contacto" />
        </ListItem>
      </List>
    </Drawer>
    <Toolbar />
 </>
  );
};

export default Navbar;
