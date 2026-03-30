import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppThemeProvider } from './context/AppThemeProvider.tsx';
import { AuthProvider } from './components/auth/AuthProvider.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  </StrictMode>,
);
