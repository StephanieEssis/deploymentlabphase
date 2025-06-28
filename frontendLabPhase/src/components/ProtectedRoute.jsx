import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  // Afficher rien pendant le chargement
  if (loading) {
    return null;
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si un rôle admin est requis et que l'utilisateur n'est pas admin
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si tout est OK, afficher le contenu protégé
  return children;
};

export default ProtectedRoute; 