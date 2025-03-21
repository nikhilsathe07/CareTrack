// src/components/MedicationForm.tsx
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMedication } from '../services/api';
import { Medication } from '../types/medication';

const MedicationForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    nextDose: new Date(),
    refillsLeft: 0,
    expirationDate: new Date(),
  });

  const mutation = useMutation({
    mutationFn: addMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      if (onClose) onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: form.name,
      dosage: form.dosage,
      nextDose: form.nextDose.toISOString(),
      refillsLeft: form.refillsLeft,
      expirationDate: form.expirationDate.toISOString(),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <TextField
          label="Medication Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dosage"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          fullWidth
          margin="normal"
        />
        <DateTimePicker
          label="Next Dose"
          value={form.nextDose}
          onChange={(date) => setForm({ ...form, nextDose: date || new Date() })}
        />
        <TextField
          label="Refills Left"
          type="number"
          value={form.refillsLeft}
          onChange={(e) => setForm({ ...form, refillsLeft: parseInt(e.target.value) || 0 })}
          fullWidth
          margin="normal"
        />
        <DateTimePicker
          label="Expiration Date"
          value={form.expirationDate}
          onChange={(date) => setForm({ ...form, expirationDate: date || new Date() })}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Medication
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MedicationForm;