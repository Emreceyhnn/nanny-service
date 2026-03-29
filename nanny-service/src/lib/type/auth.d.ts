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
  login: (data: unknown) => Promise<void>;
  signup: (data: unknown) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
