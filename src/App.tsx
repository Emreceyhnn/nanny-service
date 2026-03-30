import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar.tsx";
import PrivateRoute from "./components/common/PrivateRoute.tsx";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const NanniesPage = lazy(() => import("./pages/nannies/NanniesPage"));
const FavoritesPage = lazy(() => import("./pages/favorites/FavoritesPage"));
const App = () => {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="app-shell">
        <Navbar />
        <main>
          <Suspense
            fallback={<div className="loading-screen">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nannies" element={<NanniesPage />} />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
