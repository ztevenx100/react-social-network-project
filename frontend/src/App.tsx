import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/auth.store';

// Lazy loading components for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Feed = lazy(() => import('./pages/Feed/Feed'));

// Componente que contiene el layout y la lógica de navegación
const AppLayout = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="main-navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          {token ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
      
      <main className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas Protegidas */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/feed" 
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

// Componente principal que envuelve la aplicación con el Router
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
