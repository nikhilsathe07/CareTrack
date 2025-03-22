// src/components/Dashboard.tsx
import { useState } from 'react'; // Added import for useState
import { Typography, TextField, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../services/api';
import MedicationCard from './MedicationCard';
import { Medication } from '../types/medication';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../index.css';

interface DashboardProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ theme, toggleTheme }) => {
  const [search, setSearch] = useState(''); // useState is now defined
  const { data: medications, isLoading } = useQuery<Medication[]>({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });

  const filteredMedications = medications?.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="grid-container">
        {filteredMedications?.length ? (
          filteredMedications.map((med) => (
            <MedicationCard key={med.id} medication={med} />
          ))
        ) : (
          <Typography>No medications found.</Typography>
        )}
      </div>
    </div>
  );
};

export default Dashboard;