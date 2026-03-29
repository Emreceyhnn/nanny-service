import { createContext } from 'react';
import type { AuthState } from '../lib/type/auth';

export interface AuthContextType {
  state: AuthState;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
