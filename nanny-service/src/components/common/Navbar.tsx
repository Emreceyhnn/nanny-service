import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Circle } from '@mui/icons-material';
import { useAuth } from '../../components/auth/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import AuthModal from '../auth/AuthModal';

const Navbar: React.FC = () => {
  const { state: { user }, login, logout, signup } = useAuth();
  const { color, setColor } = useAppTheme();
  const theme = useTheme();
  const [authModal, setAuthModal] = React.useState<'login' | 'signup' | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const colors: Array<{ name: 'red' | 'blue' | 'green'; value: string }> = [
    { name: 'red', value: '#F03F3B' },
    { name: 'blue', value: '#38CDFF' },
    { name: 'green', value: '#103931' },
  ];

  return (
    <>
      <AppBar 
        position="absolute" 
        elevation={0} 
        sx={{ 
          bgcolor: 'transparent', 
          top: { xs: 20, md: 64 }, // Aligned with the hero block's responsive start
          left: 0,
          right: 0,
          zIndex: 1100
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Box sx={{ position: 'relative', px: { xs: 2, md: '96px' }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo - Positioned left-wing style */}
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                fontWeight: 650,
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              Nanny.Services
            </Typography>

            {/* Middle Nav - Positioned image-wing style */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center', ml: -30 }}>
              <NavLink to="/" end style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <Box sx={{ 
                    position: 'relative',
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    '&::after': isActive ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'white'
                    } : {}
                  }}>Home</Box>
                )}
              </NavLink>
              
              <NavLink to="/nannies" style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <Box sx={{ 
                    position: 'relative',
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    '&::after': isActive ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'white'
                    } : {}
                  }}>Nannies</Box>
                )}
              </NavLink>

              {user && (
                <NavLink to="/favorites" style={{ textDecoration: 'none' }}>
                  {({ isActive }) => (
                    <Box sx={{ 
                      position: 'relative',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      '&::after': isActive ? {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'white'
                      } : {}
                    }}>Favorites</Box>
                  )}
                </NavLink>
              )}
            </Box>

            {/* Right Side - Auth & Theme */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
               {/* Theme Switcher */}
               <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                {colors.map((c) => (
                  <IconButton 
                    key={c.name}
                    size="small" 
                    onClick={() => setColor(c.name)}
                    sx={{ p: 0.5, border: color === c.name ? '2px solid white' : 'none' }}
                  >
                    <Circle sx={{ color: c.value, fontSize: 16 }} />
                  </IconButton>
                ))}
              </Box>

              {user ? (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 500, display: { xs: 'none', lg: 'block' } }}>
                    {user.email}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => logout()}
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', borderRadius: '30px', px: 3 }}
                  >
                    Log out
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setAuthModal('login')}
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', borderRadius: '30px', px: 4, py: 1.5 }}
                  >
                    Log In
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => setAuthModal('signup')}
                    sx={{ 
                      bgcolor: '#F03F3B', 
                      color: 'white', 
                      borderRadius: '30px', 
                      px: 4,
                      py: 1.5,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#F03F3B', opacity: 0.9 }
                    }}
                  >
                    Registration
                  </Button>
                </Box>
              )}
              
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 200, borderRadius: '15px', mt: 1.5 } }}
      >
        <MenuItem component={NavLink} to="/" onClick={() => setAnchorEl(null)}>Home</MenuItem>
        <MenuItem component={NavLink} to="/nannies" onClick={() => setAnchorEl(null)}>Nannies</MenuItem>
        {user && <MenuItem component={NavLink} to="/favorites" onClick={() => setAnchorEl(null)}>Favorites</MenuItem>}
      </Menu>

      {authModal && (
        <AuthModal 
          type={authModal} 
          onClose={() => setAuthModal(null)} 
          onSubmit={async (data) => {
            try {
              if (authModal === 'signup') await signup(data.email, data.password, data.name);
              else await login(data.email, data.password);
              setAuthModal(null);
            } catch (error: any) {
              alert(error.message);
            }
          }}
        />
      )}
    </>
  );
};

export default Navbar;
