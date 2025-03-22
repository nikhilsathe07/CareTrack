// src/components/NotificationBanner.tsx
import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { Medication } from '../types/medication';
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../services/api';
import '../index.css';

const NotificationBanner: React.FC = () => {
  const { data: medications } = useQuery<Medication[]>({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });

  useEffect(() => {
    if (!medications) return;
    const now = new Date();
    medications.forEach((med) => {
      const nextDose = new Date(med.nextDose);
      const timeDiff = nextDose.getTime() - now.getTime();
      if (timeDiff < 0) {
        toast.error(`${med.name} is overdue!`, { position: 'top-center' });
      } else if (timeDiff < 60 * 60 * 1000) { // Within 1 hour
        toast.warn(`${med.name} is due soon!`, { position: 'top-center' });
      }
    });
  }, [medications]);

  return (
    <Box className="notification-banner">
      <Typography>Check your medication reminders below.</Typography>
    </Box>
  );
};

export default NotificationBanner;