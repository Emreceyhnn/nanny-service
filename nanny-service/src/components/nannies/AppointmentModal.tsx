import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Grid,
  Avatar
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Nanny } from '../../lib/type/nannies';
import { db } from '../../lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { useAuth } from '../../components/auth/AuthContext';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone number is required'),
  age: yup.number().typeError('Age must be a number').required('Child age is required'),
  time: yup.string().required('Time is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('Parent name is required'),
  comment: yup.string(),
});

interface Props {
  nanny: Nanny;
  onClose: () => void;
}

const AppointmentModal: React.FC<Props> = ({ nanny, onClose }) => {
  const { state: { user } } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const appointmentsRef = ref(db, `appointments/${nanny.id}`);
      await push(appointmentsRef, {
        ...data,
        nannyId: nanny.id,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      alert('Appointment requested successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { 
          borderRadius: '30px', 
          p: { xs: 2, md: 4 },
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 0, top: 0, color: 'text.secondary' }}
        >
          <Close />
        </IconButton>

        <DialogTitle component="div" sx={{ p: 0, mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Make an appointment
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
            To make an appointment with <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>{nanny.name}</Box>, please fill out the form below. Our manager will contact you as soon as possible.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 0, mt: 4 }}>
          {/* Mini Profile */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
            <Avatar 
              src={nanny.avatar_url} 
              variant="rounded" 
              sx={{ width: 44, height: 44, borderRadius: '12px' }} 
            />
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)', display: 'block' }}>
                Your nanny
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {nanny.name}
              </Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth placeholder="Address" {...register('address')} error={!!errors.address} helperText={errors.address?.message as string} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth placeholder="+380" {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message as string} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth placeholder="Child's age" {...register('age')} error={!!errors.age} helperText={errors.age?.message as string} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth placeholder="00:00" {...register('time')} error={!!errors.time} helperText={errors.time?.message as string} />
              </Grid>
              
              <Grid size={12}>
                <TextField fullWidth placeholder="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message as string} />
              </Grid>
              <Grid size={12}>
                <TextField fullWidth placeholder="Father's or mother's name" {...register('name')} error={!!errors.name} helperText={errors.name?.message as string} />
              </Grid>
              <Grid size={12}>
                <TextField fullWidth multiline rows={3} placeholder="Comment" {...register('comment')} />
              </Grid>

              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{ 
                    py: 1.5, 
                    mt: 2, 
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.main', opacity: 0.9 }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AppointmentModal;
