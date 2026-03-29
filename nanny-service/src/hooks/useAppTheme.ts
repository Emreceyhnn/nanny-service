import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from '../context/theme-context';

export const useAppTheme = () => {
  const context = useContext(ThemeContext) as ThemeContextType | null;
  if (!context) throw new Error('useAppTheme must be used within AppThemeProvider');
  return context;
};
