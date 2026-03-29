import React, { useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import type { AuthState } from '../../lib/type/auth';
import { AuthContext } from '../../context/auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setState({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          },
          isLoading: false,
          error: null,
        });
      } else {
        setState({ user: null, isLoading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: unknown) {
      setState(s => ({ ...s, error: error instanceof Error ? error.message : 'Login failed' }));
      throw error;
    }
  };

  const signup = async (email: string, pass: string, name: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      setState(s => ({ 
        ...s, 
        user: { uid: res.user.uid, email: res.user.email, displayName: name } 
      }));
    } catch (error: unknown) {
      setState(s => ({ ...s, error: error instanceof Error ? error.message : 'Signup failed' }));
      throw error;
    }
  };

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
