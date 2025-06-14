import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ requiredRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Afficher rien pendant le chargement
  if (loading) {
    return null;
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si un rôle spécifique est requis et que l'utilisateur n'a pas ce rôle
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Si tout est OK, afficher le contenu protégé
  return <Outlet />;
};

export default ProtectedRoute; 