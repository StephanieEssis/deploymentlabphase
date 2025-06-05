import api from './api';

export const authService = {
  // Connexion
  login: async (credentials) => {
    try {
      console.log('Tentative de connexion avec:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('Réponse du serveur:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error('Token non reçu du serveur');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error.response?.data || error.message);
      throw error;
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      console.log('Tentative d\'inscription avec:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Réponse du serveur:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur d\'inscription:', error.response?.data || error.message);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
