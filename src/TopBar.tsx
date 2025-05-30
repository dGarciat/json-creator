import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

// Puedes cambiar la ruta del logo si el archivo tiene otro nombre
const LOGO_SRC = '/jsongenie-logo.png';

interface TopBarProps {
  onImportLocal: (file: File) => void;
  onImportAPI: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onImportLocal, onImportAPI }) => {
  return (
    <AppBar position="fixed" sx={{ background: '#1a2233', boxShadow: 3, zIndex: 1201, height: 72 }} elevation={2}>
      <Toolbar sx={{ minHeight: 72, height: 72, display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
        {/* Logo + Nombre App */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={LOGO_SRC}
            alt="JSON Genie Logo"
            style={{ height: 66, width: 66, marginRight: 20, borderRadius: '50%', background: '#e0f7fa', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          />
          <span className="magical-font" style={{ fontWeight: 700, fontSize: 27, letterSpacing: 1.5 }}>
            JSONGenie
          </span>
        </Box>
        {/* Enlaces de navegación (vacíos por ahora, preparados para el futuro) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, '& .MuiIconButton-root, & .MuiSvgIcon-root': { fontSize: 32 } }}>
  {/* Importar JSON local */}
  <input
    accept=".json,application/json"
    style={{ display: 'none' }}
    id="import-json-file-topbar"
    type="file"
    onChange={e => {
      const file = e.target.files?.[0];
      if (file) onImportLocal(file);
      e.target.value = '';
    }}
  />
  <label htmlFor="import-json-file-topbar">
    <Tooltip title="Importar JSON local">
      <IconButton component="span" sx={{ color: '#aee7f5', borderRadius: 2, p: 1, border: '1px solid #2b3a4d', background: '#23283a', mr: 1, ':hover': { background: '#283040' } }}>
        <UploadFileIcon sx={{ fontSize: 36 }} />
      </IconButton>
    </Tooltip>
  </label>
  {/* Importar desde BBDD/API */}
  <Tooltip title="Importar desde BBDD (API)">
    <IconButton onClick={onImportAPI} sx={{ color: '#aee7f5', borderRadius: 2, p: 1, border: '1px solid #2b3a4d', background: '#23283a', ':hover': { background: '#283040' } }}>
      <CloudDownloadIcon sx={{ fontSize: 36 }} />
    </IconButton>
  </Tooltip>
</Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
