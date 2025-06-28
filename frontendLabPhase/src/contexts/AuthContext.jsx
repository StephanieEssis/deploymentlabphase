import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { runAuthDebug } from '../utils/authDebug';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Debug: Vérifier l'état initial
      console.log('🔄 Initialisation de l\'authentification...');
      runAuthDebug();
      
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Configurer le token dans l'instance axios
          authService.setAuthToken(token);
          
          // Essayer de récupérer l'utilisateur depuis l'API
          const userData = await authService.getCurrentUser();
          if (userData) {
            console.log('✅ Utilisateur récupéré depuis l\'API:', userData);
            setUser(userData);
          } else {
            // Si l'API échoue, essayer de récupérer depuis localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              try {
                const parsedUser = JSON.parse(storedUser);
                console.log('📦 Utilisateur récupéré depuis localStorage:', parsedUser);
                setUser(parsedUser);
              } catch (error) {
                console.error('Erreur lors du parsing de l\'utilisateur stocké:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                authService.removeAuthToken();
              }
            }
          }
        } else {
          console.log('❌ Aucun token trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
        // En cas d'erreur, essayer de récupérer depuis localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log('📦 Utilisateur récupéré depuis localStorage (fallback):', parsedUser);
            setUser(parsedUser);
          } catch (parseError) {
            console.error('Erreur lors du parsing de l\'utilisateur stocké:', parseError);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            authService.removeAuthToken();
          }
        }
      } finally {
        setLoading(false);
        console.log('🏁 Initialisation terminée. État final:', { user: user, loading: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 