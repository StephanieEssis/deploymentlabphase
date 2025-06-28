import api from './api';

export const userService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      const requestData = { email, password };
      console.log('Login request data:', requestData);
      
      const response = await api.post('/users/login', requestData);
      console.log('Login response:', response.data);
      
      // Stocker le token et les données utilisateur
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error during login:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Inscription utilisateur
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  updateProfile: (userData) => api.put('/users/profile', userData).then(response => response.data),

  // Mettre à jour le mot de passe
  updatePassword: (passwordData) => api.put('/users/password', passwordData).then(response => response.data),

  // Obtenir les détails du profil
  getProfile: () => api.get('/users/profile').then(response => response.data),

  // Supprimer le compte
  deleteAccount: () => api.delete('/users/profile').then(response => response.data),

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer tous les utilisateurs (admin seulement)
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}; 