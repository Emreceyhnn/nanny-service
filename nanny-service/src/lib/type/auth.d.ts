export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
