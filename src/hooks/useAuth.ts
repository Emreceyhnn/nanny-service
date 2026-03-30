import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '../context/auth-context';

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType | null;
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
