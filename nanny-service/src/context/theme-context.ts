import { createContext } from 'react';

export type ThemeColor = 'red' | 'blue' | 'green';

export interface ThemeContextType {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
