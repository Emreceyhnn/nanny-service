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
  Box 
} from '@mui/material';
import { Close } from '@mui/icons-material';

const signupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

interface Props {
  type: 'login' | 'signup';
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AuthModal: React.FC<Props> = ({ type, onClose, onSubmit }) => {
  const schema = type === 'signup' ? signupSchema : loginSchema;
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: yupResolver(schema)
  });

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
            {type === 'signup' ? 'Registration' : 'Log In'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
            {type === 'signup' 
              ? 'Thank you for your interest in our services! To proceed, please register your account.' 
              : 'Welcome back! Please enter your credentials to access your account.'}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 0, mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {type === 'signup' && (
                <TextField
                  fullWidth
                  placeholder="Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message as string}
                />
              )}
              
              <TextField
                fullWidth
                placeholder="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message as string}
              />

              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message as string}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ 
                  py: 1.5, 
                  mt: 2, 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.main', opacity: 0.9 }
                }}
              >
                {type === 'signup' ? 'Sign Up' : 'Log In'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AuthModal;
