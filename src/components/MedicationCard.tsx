// src/components/MedicationCard.tsx
import { useState } from 'react';
import { Card, CardContent, Typography, Button, Tooltip, CircularProgress, IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Medication } from '../types/medication';
import { requestRenewal, deleteMedication } from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  medication: Medication;
}

const MedicationCard: React.FC<Props> = ({ medication }) => {
  const [taken, setTaken] = useState(false);
  const queryClient = useQueryClient();
  const adherence = Math.min(Math.max(medication.refillsLeft * 20, 0), 100); // Simple adherence calc
  const now = new Date();
  const nextDose = new Date(medication.nextDose);
  const isDueSoon = nextDose > now && nextDose < new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const isOverdue = nextDose < now;

  const renewalMutation = useMutation({
    mutationFn: requestRenewal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['renewalRequests'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  const getStatus = () => {
    if (isOverdue) return 'Overdue';
    if (isDueSoon) return 'Due Soon';
    return 'On Schedule';
  };

  const handleRenewal = () => {
    renewalMutation.mutate(medication.id);
  };

  const handleDelete = () => {
    deleteMutation.mutate(medication.id);
  };

  return (
    <Card className="medication-card">
      <CardContent>
        <div className="card-header">
          <Typography variant="h6" className="medication-name">
            {medication.name}
          </Typography>
          <span className={`status-badge ${getStatus().toLowerCase().replace(' ', '-')}`}>
            {getStatus()}
          </span>
        </div>
        <Typography className="medication-detail">
          Dosage: {medication.dosage}
        </Typography>
        <Typography className="medication-detail">
          Next Dose: {nextDose.toLocaleString()}
        </Typography>
        <Tooltip
          title={
            <div className="tooltip-content">
              <p>Refills Left: {medication.refillsLeft}</p>
              <p>Expires: {new Date(medication.expirationDate).toLocaleDateString()}</p>
            </div>
          }
          arrow
          placement="top"
        >
          <div className="progress-circle">
            <CircularProgress
              variant="determinate"
              value={adherence}
              size={60}
              thickness={5}
              className="progress-ring"
            />
            <span className="progress-text">{adherence}%</span>
          </div>
        </Tooltip>
        <div className="card-actions">
          <Button
            variant="contained"
            className={`action-button action-button--taken ${taken ? 'taken' : ''}`}
            onClick={() => setTaken(!taken)}
          >
            {taken ? 'Taken' : 'Mark as Taken'}
          </Button>
          <Button
            variant="outlined"
            className="action-button action-button--renewal"
            onClick={handleRenewal}
          >
            Request Renewal
          </Button>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            sx={{ color: '#d32f2f' }} // Red color for delete
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationCard;