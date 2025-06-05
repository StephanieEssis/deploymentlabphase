import api from './api';

export const roomService = {
  // Récupérer toutes les chambres
  getAllRooms: async () => {
    try {
      const response = await api.get('/hotel/rooms');
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  // Récupérer une chambre par son ID
  getRoomById: async (id) => {
    try {
      const response = await api.get(`/hotel/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les chambres par catégorie
  getRoomsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/hotel/rooms/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rooms for category ${categoryId}:`, error);
      throw error;
    }
  },

  // Vérifier la disponibilité d'une chambre
  checkAvailability: async (roomId, startDate, endDate) => {
    const response = await api.get(`/hotel/rooms/${roomId}/availability`, {
      params: { startDate, endDate }
    });
    return response.data;
  }
}; 