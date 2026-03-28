import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/common/Navbar.tsx';
import { AuthProvider } from './components/auth/AuthContext';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/home/HomePage'));
const NanniesPage = lazy(() => import('./pages/nannies/NanniesPage'));
const FavoritesPage = lazy(() => import('./pages/favorites/FavoritesPage'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-shell">
          <Navbar />
          <main>
            <Suspense fallback={<div className="loading-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/nannies" element={<NanniesPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
