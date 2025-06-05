import api from './api';

export const reservationService = {
  // Créer une nouvelle réservation
  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  // Récupérer les réservations d'un utilisateur
  getUserReservations: async () => {
    const response = await api.get('/reservations/user');
    return response.data;
  },

  // Annuler une réservation
  cancelReservation: async (reservationId) => {
    const response = await api.delete(`/reservations/${reservationId}`);
    return response.data;
  },

  // Mettre à jour une réservation
  updateReservation: async (reservationId, updateData) => {
    const response = await api.put(`/reservations/${reservationId}`, updateData);
    return response.data;
  }
}; 