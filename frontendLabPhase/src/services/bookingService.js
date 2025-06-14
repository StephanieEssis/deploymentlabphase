import api from './api';

const bookingService = {
  // Créer une nouvelle réservation
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Récupérer les réservations de l'utilisateur connecté
  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },

  // Récupérer toutes les réservations (admin uniquement)
  getAllBookings: async () => {
    const response = await api.get('/admin/bookings');
    return response.data;
  },

  // Récupérer une réservation par ID
  getBookingById: async (id) => {
    if (!id) {
      throw new Error('ID de réservation non spécifié');
    }
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Mettre à jour une réservation (admin uniquement)
  updateBooking: async (id, bookingData) => {
    if (!id) {
      throw new Error('ID de réservation non spécifié');
    }
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Supprimer une réservation (admin uniquement)
  deleteBooking: async (id) => {
    if (!id) {
      throw new Error('ID de réservation non spécifié');
    }
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  // Récupérer les statistiques (admin uniquement)
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Annuler une réservation
  cancelBooking: async (id) => {
    if (!id) {
      throw new Error('ID de réservation non spécifié');
    }
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },

  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  getBooking: async (id) => {
    return api.get(`/bookings/${id}`);
  }
};

export default bookingService; 