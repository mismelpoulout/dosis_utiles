// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import logo from "./logo.png";
import {
  auth,
  onAuth,
  signInWithGoogle, // o signInAnon
  signOutUser,
} from "./components/firebase";

const INACTIVITY_MS = 24 * 60 * 60 * 1000; // 24 horas
const LAST_ACTIVE_KEY = "last_active_ts";

function useInactivityLogout(user) {
  const timerRef = useRef(null);

  useEffect(() => {
    const stamp = () => localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
    const events = ["mousemove", "keydown", "touchstart", "click", "scroll"];
    const onActivity = () => {
      stamp();
      // reinicia el timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        // si ya pasó el tiempo sin nueva actividad → logout
        try {
          await signOutUser();
        } catch (_) {}
      }, INACTIVITY_MS);
    };

    // inicial
    stamp();
    onActivity();

    events.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Suscribirse al estado de Auth
  useEffect(() => {
    const unsub = onAuth((u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  // Auto-cierre por inactividad
  useInactivityLogout(currentUser);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleRedirect = () => navigate("/");

  const handleLogin = async () => {
    try {
      // Usa Google:
      await signInWithGoogle();
      // O anónimo:
      // await signInAnon();
      setOpen(false);
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setOpen(false);
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const isLogged = Boolean(currentUser);
  const displayName = currentUser?.displayName || "Usuario";
  const email = currentUser?.email;

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
            onClick={handleRedirect}
            style={{ cursor: "pointer" }}
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
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        <List>
          <ListItem sx={{ justifyContent: "center", py: 2 }}>
            <img
              className="icon"
              src={logo}
              alt="logo"
              style={{
                height: "80px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                marginRight: "15px",
                borderRadius: 8,
              }}
            />
          </ListItem>

          {/* Inicio */}
          <ListItemButton component="a" href="/" onClick={() => setOpen(false)}>
            <HomeIcon fontSize="small" sx={{ mr: 1 }} />
            <ListItemText primary="Inicio" />
          </ListItemButton>

          <ListItemButton component="a" href="/nosotros" onClick={() => setOpen(false)}>
            <ListItemText primary="Nosotros" />
          </ListItemButton>

          <ListItemButton
            component="a"
            href="/politica-de-privacidad"
            onClick={() => setOpen(false)}
          >
            <ListItemText primary="Política de privacidad" />
          </ListItemButton>

          <ListItemButton
            component="a"
            href="mailto:medstudioparato2@gmail.com?body=Le responderemos a la brevedad"
            onClick={() => setOpen(false)}
          >
            <ListItemText primary="Contacto" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* Estado de usuario y botón de sesión */}
          {isLogged ? (
            <>
              <ListItem>
                <Avatar
                  sx={{ width: 32, height: 32, mr: 1 }}
                  src={currentUser.photoURL || undefined}
                />
                <div>
                  <Typography variant="body2" sx={{ lineHeight: 1.1 }}>
                    {displayName}
                  </Typography>
                  {email && (
                    <Typography variant="caption" color="text.secondary">
                      {email}
                    </Typography>
                  )}
                </div>
              </ListItem>

              <ListItemButton onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton onClick={handleLogin}>
              <LoginIcon fontSize="small" sx={{ mr: 1 }} />
              <ListItemText primary="Iniciar sesión" />
            </ListItemButton>
          )}
        </List>
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Navbar;