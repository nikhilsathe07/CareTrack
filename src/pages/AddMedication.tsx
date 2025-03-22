// src/pages/AddMedication.tsx
import { Typography, Box } from '@mui/material';
import MedicationForm from '../components/MedicationForm';
import '../index.css';

const AddMedication: React.FC = () => {
  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Add New Medication
      </Typography>
      <MedicationForm />
    </Box>
  );
};

export default AddMedication;