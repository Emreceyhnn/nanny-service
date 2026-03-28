import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppThemeProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './components/auth/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
