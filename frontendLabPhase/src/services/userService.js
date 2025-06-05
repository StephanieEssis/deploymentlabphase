import api from './api';

export const userService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      const requestData = { email, password };
      console.log('Login request data:', requestData);
      console.log('Full API URL:', `${api.defaults.baseURL}/auth/login`);
      
      const response = await api.post('/auth/login', requestData);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during login:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        headers: error.config?.headers,
        method: error.config?.method
      });
      throw error;
    }
  },

  // Inscription utilisateur
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Changer le mot de passe
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}; 