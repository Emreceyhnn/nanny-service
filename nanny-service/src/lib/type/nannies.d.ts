export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Appointment {
  nannyId: string;
  userId: string;
  address: string;
  phone: string;
  age: number;
  time: string;
  email: string;
  name: string;
  comment?: string;
  createdAt: string;
}

export interface Nanny {
  id: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  reviews: Review[];
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[];
  rating: number;
}

export interface NanniesPageState {
  nannies: Nanny[];
  isLoading: boolean;
  error: string | null;
  filters: {
    sort: 'asc' | 'desc' | 'price-low' | 'price-high' | 'rating-high' | 'rating-low' | 'all';
  };
  visibleCount: number;
  favorites: string[]; // List of nanny IDs
}

export interface NanniesPageActions {
  fetchNannies: () => Promise<void>;
  updateFilters: (filters: Partial<NanniesPageState['filters']>) => void;
  loadMore: () => void;
  toggleFavorite: (nannyId: string) => Promise<void>;
}

export interface NanniesPageProps {
  state: NanniesPageState;
  actions: NanniesPageActions;
}
