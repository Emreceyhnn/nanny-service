import React from 'react';
import { Box, Typography, Avatar, Divider, IconButton } from '@mui/material';
import { AccessTime, LocationOn, Close } from '@mui/icons-material';
import type { UserAppointment } from '../../hooks/useUserAppointments';
import { db } from '../../lib/firebase';
import { ref, remove } from 'firebase/database';
import toast from 'react-hot-toast';

interface Props {
  appointment: UserAppointment;
}

const AppointmentListItem: React.FC<Props> = ({ appointment }) => {
  const handleCancel = async () => {
    try {
      const appointmentRef = ref(db, `appointments/${appointment.id}`);
      await remove(appointmentRef);
      toast.success("Appointment cancelled");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      toast.error("Failed to cancel. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }, position: 'relative' }}>
      <IconButton 
        onClick={handleCancel}
        size="small"
        sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8,
          color: 'text.secondary',
          '&:hover': { color: 'error.main', bgcolor: 'rgba(240, 63, 59, 0.1)' }
        }}
      >
        <Close sx={{ fontSize: 18 }} />
      </IconButton>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
        <Avatar 
          src={appointment.nannyAvatar} 
          variant="rounded" 
          sx={{ width: 40, height: 40, borderRadius: '10px' }} 
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {appointment.nannyName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Meeting for child (Age: {appointment.age})
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {appointment.time}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {appointment.address}
          </Typography>
        </Box>
      </Box>
      
      {appointment.comment && (
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            p: 1, 
            bgcolor: '#f8f8f8', 
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: 'text.secondary'
          }}
        >
          "{appointment.comment}"
        </Typography>
      )}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default AppointmentListItem;
