import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';

// Puedes cambiar la ruta del logo si el archivo tiene otro nombre
const LOGO_SRC = '/jsongenie-logo.png';

const TopBar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ background: '#1a2233', boxShadow: 3, zIndex: 1201 }} elevation={2}>
      <Toolbar sx={{ minHeight: 56, display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
        {/* Logo + Nombre App */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={LOGO_SRC}
            alt="JSON Genie Logo"
            style={{ height: 52, width: 52, marginRight: 16, borderRadius: '50%', background: '#e0f7fa', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          />
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, color: '#aee7f5' }}>
            JSONGenie
          </span>
        </Box>
        {/* Enlaces de navegación (vacíos por ahora, preparados para el futuro) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Aquí puedes añadir enlaces con <a> o <Button> más adelante */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
