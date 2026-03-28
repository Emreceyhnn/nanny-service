import React from 'react';
import { 
  Box, 
  Paper, 
  Avatar, 
  Typography, 
  IconButton, 
  Button, 
  Chip, 
  Divider,
  Collapse
} from '@mui/material';
import { 
  Star, 
  Place, 
  Favorite, 
  FavoriteBorder 
} from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';
import AppointmentModal from './AppointmentModal';
import type { Nanny } from '../../lib/type/nannies';

interface Props {
  nanny: Nanny;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const NannyCard: React.FC<Props> = ({ nanny, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showAppointment, setShowAppointment] = React.useState(false);
  const { state: { user } } = useAuth();

  const handleMakeAppointment = () => {
    if (!user) {
      alert('Please log in to make an appointment');
      return;
    }
    setShowAppointment(true);
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(nanny.birthday);

  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: '24px', 
        bgcolor: 'white', 
        mb: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        overflow: 'hidden'
      }}
    >
      {/* Avatar Section */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box 
          sx={{ 
            width: 120, 
            height: 120, 
            borderRadius: '30px', 
            border: '2px solid rgba(240, 63, 59, 0.2)', // Subdued primary border
            p: '10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Avatar 
            src={nanny.avatar_url} 
            sx={{ width: '100%', height: '100%', borderRadius: '15px' }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              width: 14, 
              height: 14, 
              bgcolor: '#38CD3E', 
              borderRadius: '50%', 
              border: '2px solid white' 
            }} 
          />
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)', fontWeight: 500, letterSpacing: 0.5 }}>
              NANNY
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
              {nanny.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Place sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">{nanny.location}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 18, color: '#FFC107' }} />
              <Typography variant="body2">Rating: {nanny.rating}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto' }} />
            <Typography variant="body2">
              Price / 1 hour: <Box component="span" sx={{ color: '#38CD3E', fontWeight: 600 }}>{nanny.price_per_hour}$</Box>
            </Typography>
            <IconButton onClick={onToggleFavorite} sx={{ ml: 1 }}>
              {isFavorite ? <Favorite sx={{ color: '#F03F3B' }} /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>

        {/* Info Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Chip label={`Age: ${age}`} sx={{ bgcolor: '#F3F3F3', fontWeight: 500 }} />
          <Chip label={`Experience: ${nanny.experience}`} sx={{ bgcolor: '#F3F3F3', fontWeight: 500 }} />
          <Chip label={`Kids age: ${nanny.kids_age}`} sx={{ bgcolor: '#F3F3F3', fontWeight: 500 }} />
          <Chip label={`Characters: ${nanny.characters.join(', ')}`} sx={{ bgcolor: '#F3F3F3', fontWeight: 500 }} />
          <Chip label={`Education: ${nanny.education}`} sx={{ bgcolor: '#F3F3F3', fontWeight: 500 }} />
        </Box>

        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', mb: 2, lineHeight: 1.6 }}>
          {nanny.about}
        </Typography>

        <Button 
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ 
            p: 0, 
            color: 'black', 
            fontWeight: 700, 
            textDecoration: 'underline',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 4 }}>
            {nanny.reviews.map((review, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.05)', color: 'primary.main', fontWeight: 700 }}>
                    {review.reviewer[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{review.reviewer}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ fontSize: 14, color: '#FFC107' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{review.rating}.0</Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)', pl: 7 }}>
                  {review.comment}
                </Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              onClick={handleMakeAppointment}
              sx={{ 
                mt: 2, 
                px: 4, 
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.main', opacity: 0.9 }
              }}
            >
              Make an appointment
            </Button>
          </Box>
        </Collapse>
      </Box>

      {showAppointment && (
        <AppointmentModal 
          nanny={nanny} 
          onClose={() => setShowAppointment(false)} 
        />
      )}
    </Paper>
  );
};

export default NannyCard;
