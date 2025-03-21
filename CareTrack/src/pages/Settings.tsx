// src/pages/Settings.tsx
import { useState } from 'react';
import { Typography, Box, Switch, FormControlLabel } from '@mui/material';
import '../index.css';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
        label="Enable Notifications"
      />
    </Box>
  );
};

export default Settings;