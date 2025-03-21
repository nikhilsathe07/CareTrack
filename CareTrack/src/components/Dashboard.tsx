// src/components/Dashboard.tsx
import { useState } from 'react';
import { Grid, Typography, TextField, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../services/api';
import MedicationCard from './MedicationCard';
import { Medication } from '../types/medication';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../index.css';

const Dashboard: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [search, setSearch] = useState('');
  const { data: medications, isLoading } = useQuery<Medication[]>({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });

  const filteredMedications = medications?.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  if (isLoading) return <Typography className="loading-text">Loading...</Typography>;

  return (
    <div className={`dashboard ${theme}`}>
      <div className="dashboard-header">
        <Typography variant="h4" className="dashboard-title">
          Medication Dashboard
        </Typography>
        <div className="dashboard-controls">
          <TextField
            variant="outlined"
            placeholder="Search Medications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          <IconButton onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </div>
      <Grid container spacing={2} className="grid-container">
        {filteredMedications?.length ? (
          filteredMedications.map((med) => (
            <Grid item xs={12} sm={6} md={4} key={med.id}>
              <MedicationCard medication={med} />
            </Grid>
          ))
        ) : (
          <Typography>No medications found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;