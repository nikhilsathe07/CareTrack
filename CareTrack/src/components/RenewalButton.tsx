// src/components/RenewalButton.tsx
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
// import { requestRenewal } from '../services/api';
import {requestRenewal } from '../services/api'

interface Props {
  medicationId: string;
}

const RenewalButton: React.FC<Props> = ({ medicationId }) => {
  const [open, setOpen] = useState(false);

  const handleRenewal = async () => {
    await requestRenewal(medicationId);
    setOpen(false);
    alert('Renewal requested!');
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Request Renewal
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Renewal</DialogTitle>
        <DialogContent>Request a renewal for this medication?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleRenewal} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RenewalButton;