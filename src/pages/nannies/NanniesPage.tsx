import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Container, Button, CircularProgress, Fade } from "@mui/material";
import type {
  NanniesPageState,
  NanniesPageActions,
  Nanny,
} from "../../lib/type/nannies";
import FilterBar from "../../components/nannies/FilterBar";
import NannyCard from "../../components/nannies/NannyCard";
import { db } from "../../lib/firebase";
import { ref, get, child, set } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const NanniesPage = () => {
  const {
    state: { user },
  } = useAuth();
  const [state, setState] = useState<NanniesPageState>({
    nannies: [],
    isLoading: true,
    error: null,
    filters: { sort: "asc" },
    visibleCount: 3,
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  });

  const fetchNannies = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "nannies"));
      if (snapshot.exists()) {
        const data = snapshot.val();

        const nanniesList = Array.isArray(data)
          ? data.map((n, i) => ({ id: n.id || String(i), ...n }))
          : Object.keys(data).map((key) => ({
              id: key,
              ...(data[key] as Omit<Nanny, "id">),
            }));

        setState((s) => ({
          ...s,
          nannies: nanniesList as Nanny[],
          isLoading: false,
        }));
      } else {
        throw new Error("No database entry found");
      }
    } catch (err) {
      console.warn("Realtime Database unavailable, using local cache:", err);
      try {
        const response = await fetch("/seed-data.json");
        if (!response.ok) throw new Error("Local seed not found");
        const data = await response.json();
        setState((s) => ({
          ...s,
          nannies: data.nannies as Nanny[],
          isLoading: false,
        }));
      } catch (localErr) {
        console.error("All data sources failed:", localErr);
        setState((s) => ({
          ...s,
          error: "Failed to load nannies. Please check your connection.",
          isLoading: false,
        }));
      }
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => fetchNannies());
  }, [fetchNannies]);

  const actions: NanniesPageActions = {
    fetchNannies,
    updateFilters: (filters) =>
      setState((s) => ({ ...s, filters: { ...s.filters, ...filters } })),
    loadMore: () =>
      setState((s) => ({ ...s, visibleCount: s.visibleCount + 3 })),
    toggleFavorite: async (id) => {
      const isFav = state.favorites.includes(id);
      const newFavs = isFav
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];

      setState((s) => ({ ...s, favorites: newFavs }));
      localStorage.setItem("favorites", JSON.stringify(newFavs));

      if (isFav) {
        toast("Removed from favorites");
      } else {
        toast.success("Added to favorites!");
      }

      if (user) {
        try {
          await set(ref(db, `users/${user.uid}/favorites`), newFavs);
        } catch (error) {
          console.error("Failed to sync favorites:", error);
        }
      }
    },
  };

  useEffect(() => {
    const syncFavorites = async () => {
      if (user) {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${user.uid}/favorites`));
        if (snapshot.exists()) {
          const dbFavs = snapshot.val() || [];
          setState((s) => ({ ...s, favorites: dbFavs }));
        }
      }
    };
    syncFavorites();
  }, [user]);

  const filteredNannies = useMemo(() => {
    let filtered = [...state.nannies];
    const { sort } = state.filters;

    if (sort === "price-low")
      filtered = filtered.filter((n) => n.price_per_hour < 20);
    if (sort === "price-high")
      filtered = filtered.filter((n) => n.price_per_hour >= 20);

    if (sort === "asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "price-low" || sort === "price-high")
      filtered.sort((a, b) => a.price_per_hour - b.price_per_hour);
    if (sort === "rating-high") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "rating-low") filtered.sort((a, b) => a.rating - b.rating);

    return filtered.slice(0, state.visibleCount);
  }, [state.nannies, state.filters, state.visibleCount]);

  if (state.isLoading && state.nannies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 8, md: 12 }, bgcolor: "#F3F3F3" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 3, md: 4 } }}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <FilterBar
            sort={state.filters.sort}
            onSortChange={(s) => actions.updateFilters({ sort: s })}
          />
        </Box>

        <Box>
          {filteredNannies.map((nanny, index) => (
            <Fade in={true} key={nanny.id}>
              <Box>
                <NannyCard
                  nanny={nanny}
                  isFavorite={state.favorites.includes(nanny.id)}
                  onToggleFavorite={() => actions.toggleFavorite(nanny.id)}
                  isPriority={index === 0}
                />
              </Box>
            </Fade>
          ))}
        </Box>

        {state.visibleCount < state.nannies.length && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Button
              variant="contained"
              onClick={actions.loadMore}
              aria-label="Load more nannies"
              sx={{
                px: 6,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NanniesPage;
