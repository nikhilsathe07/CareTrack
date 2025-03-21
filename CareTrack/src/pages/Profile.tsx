// src/pages/Profile.tsx
import { Typography, Box } from '@mui/material';
import AdherenceChart from '../components/AdherenceChart';
import '../index.css';

const Profile: React.FC = () => {
  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        User Profile
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Medication Adherence
      </Typography>
      <AdherenceChart />
    </Box>
  );
};

export default Profile;