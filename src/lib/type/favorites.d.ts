import type { Nanny } from './nannies';

export interface FavoritesPageState {
  nannies: Nanny[];
  isLoading: boolean;
  error: string | null;
  filters: {
    sort: 'asc' | 'desc' | 'all' | 'price-low' | 'price-high' | 'rating-high' | 'rating-low';
  };
  favorites: string[];
}

export interface FavoritesPageActions {
  fetchNannies: () => Promise<void>;
  updateFilters: (filters: Partial<FavoritesPageState['filters']>) => void;
  toggleFavorite: (nannyId: string) => Promise<void>;
}

export interface FavoritesPageProps {
  state: FavoritesPageState;
  actions: FavoritesPageActions;
}
