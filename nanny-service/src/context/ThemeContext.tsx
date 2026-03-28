import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

type ThemeColor = 'red' | 'blue' | 'green';

interface ThemeContextType {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('themeColor') as ThemeColor) || 'green';
  });

  useEffect(() => {
    localStorage.setItem('themeColor', color);
  }, [color]);

  const theme = useMemo(() => {
    const mainColor = color === 'red' ? '#F03F3B' : color === 'blue' ? '#38CDFF' : '#103931';
    
    return createTheme({
      palette: {
        primary: {
          main: mainColor,
          contrastText: '#fff',
        },
        secondary: {
          main: '#111', // Dark for contrast
        },
        background: {
          default: '#f3f3f3',
          paper: '#fff',
        },
      },
      typography: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
      },
      shape: {
        borderRadius: 15,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '30px',
              padding: '12px 28px',
            },
            containedPrimary: {
              '&:hover': {
                backgroundColor: mainColor,
                opacity: 0.9,
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              border: '1px solid rgba(0,0,0,0.05)',
            },
          },
        },
      },
    });
  }, [color]);

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within AppThemeProvider');
  return context;
};
