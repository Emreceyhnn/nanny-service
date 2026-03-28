import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Fade, 
  CircularProgress 
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import type { FavoritesPageState, FavoritesPageActions } from '../../lib/type/favorites';
import type { Nanny } from '../../lib/type/nannies';
import FilterBar from '../../components/nannies/FilterBar';
import NannyCard from '../../components/nannies/NannyCard';
import { db } from '../../lib/firebase';
import { ref, get, child, set } from 'firebase/database';
import { useAuth } from '../../components/auth/AuthContext';

const FavoritesPage = () => {
  const { state: { user } } = useAuth();
  const [state, setState] = useState<FavoritesPageState>({
    nannies: [],
    isLoading: true,
    error: null,
    filters: { sort: 'asc' },
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  });

  const fetchNannies = useCallback(async () => {
    setState((s: FavoritesPageState) => ({ ...s, isLoading: true }));
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'nannies'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const nanniesList = (Object.keys(data).map(key => ({ id: key, ...(data[key] as Omit<Nanny, 'id'>) })) as Nanny[])
          .filter(n => state.favorites.includes(n.id));
        setState((s: FavoritesPageState) => ({ ...s, nannies: nanniesList, isLoading: false }));
      } else {
        setState((s: FavoritesPageState) => ({ ...s, nannies: [], isLoading: false }));
      }
    } catch (err) {
      console.error(err);
      setState((s: FavoritesPageState) => ({ ...s, error: 'Failed to fetch favorites', isLoading: false }));
    }
  }, [state.favorites]);

  useEffect(() => {
    fetchNannies();
  }, [fetchNannies]);

  const actions: FavoritesPageActions = {
    fetchNannies,
    updateFilters: (filters) => setState((s: FavoritesPageState) => ({ ...s, filters: { ...s.filters, ...filters } })),
    toggleFavorite: async (id) => {
      const newFavs = state.favorites.filter((f: string) => f !== id);
      setState((s: FavoritesPageState) => ({ 
        ...s, 
        favorites: newFavs, 
        nannies: s.nannies.filter((n: Nanny) => n.id !== id) 
      }));
      localStorage.setItem('favorites', JSON.stringify(newFavs));

      if (user) {
        try {
          await set(ref(db, `users/${user.uid}/favorites`), newFavs);
        } catch (error) {
          console.error('Failed to sync favorites deletion:', error);
        }
      }
    }
  };

  useEffect(() => {
    const syncFavorites = async () => {
      if (user) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${user.uid}/favorites`));
        if (snapshot.exists()) {
          const dbFavs = snapshot.val() || [];
          setState((s: FavoritesPageState) => ({ ...s, favorites: dbFavs }));
        }
      }
    };
    syncFavorites();
  }, [user]);

  const getFilteredNannies = () => {
    let filtered = [...state.nannies];
    const { sort } = state.filters;
    
    if (sort === 'price-low') filtered = filtered.filter(n => n.price_per_hour < 20);
    if (sort === 'price-high') filtered = filtered.filter(n => n.price_per_hour >= 20);
    
    if (sort === 'asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'price-low' || sort === 'price-high') filtered.sort((a, b) => a.price_per_hour - b.price_per_hour);
    if (sort === 'rating-high') filtered.sort((a, b) => b.rating - a.rating);
    if (sort === 'rating-low') filtered.sort((a, b) => a.rating - b.rating);

    return filtered;
  };

  const filteredNannies = getFilteredNannies();

  if (state.isLoading && state.nannies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 12, bgcolor: '#F3F3F3' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Favorite Nannies
        </Typography>

        {filteredNannies.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <FilterBar sort={state.filters.sort} onSortChange={(s) => actions.updateFilters({ sort: s })} />
          </Box>
        )}

        {filteredNannies.length === 0 ? (
          <Fade in={true}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 12, 
                bgcolor: 'white', 
                borderRadius: '24px',
                border: '1px dashed rgba(0,0,0,0.1)'
              }}
            >
              <FavoriteBorder sx={{ fontSize: 64, color: 'rgba(0,0,0,0.1)', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                No favorites yet
              </Typography>
              <Typography sx={{ color: 'rgba(0,0,0,0.5)' }}>
                Explore our nannies and Heart your favorites!
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Box>
            {filteredNannies.map((nanny) => (
              <Fade in={true} key={nanny.id}>
                <Box>
                  <NannyCard 
                    nanny={nanny} 
                    isFavorite={true}
                    onToggleFavorite={() => actions.toggleFavorite(nanny.id)}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;
