// src/pages/History.tsx
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRenewalRequests, deleteRenewalRequest } from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import '../index.css';

const History: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: renewalRequests, isLoading } = useQuery({
    queryKey: ['renewalRequests'],
    queryFn: fetchRenewalRequests,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRenewalRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['renewalRequests'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title">
        Renewal Request History
      </Typography>
      {renewalRequests && renewalRequests.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medication Name</TableCell>
              <TableCell>Requested At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renewalRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.medicationName}</TableCell>
                <TableCell>{new Date(request.requestedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(request.id)}
                    sx={{ color: '#d32f2f' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No renewal requests yet.</Typography>
      )}
    </Box>
  );
};

export default History;