import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthStore();

  if (!token) {
    // Si no hay token, redirige al usuario a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay un token, renderiza el componente hijo (la página protegida)
  return children;
};

export default ProtectedRoute;
