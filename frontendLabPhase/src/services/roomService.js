import api from './api';

const formatRoomData = (room) => {
  return {
    id: room.id,
    name: room.name,
    description: room.description,
    price: room.price,
    capacity: room.capacity,
    amenities: room.amenities,
    images: room.images,
    status: room.status
  };
};

const roomService = {
  // Récupérer toutes les chambres
  getRooms: async () => {
    const response = await api.get('/rooms');
    return response.data.map(formatRoomData);
  },

  // Récupérer une chambre par son ID
  getRoomById: async (id) => {
    if (!id) {
      throw new Error('ID de chambre non spécifié');
    }
    const response = await api.get(`/rooms/${id}`);
    return formatRoomData(response.data);
  },

  // Créer une nouvelle chambre
  createRoom: async (roomData) => {
    const response = await api.post('/admin/rooms', roomData);
    return formatRoomData(response.data);
  },

  // Mettre à jour une chambre
  updateRoom: async (id, roomData) => {
    if (!id) {
      throw new Error('ID de chambre non spécifié');
    }
    const response = await api.put(`/admin/rooms/${id}`, roomData);
    return formatRoomData(response.data);
  },

  // Supprimer une chambre
  deleteRoom: async (id) => {
    if (!id) {
      throw new Error('ID de chambre non spécifié');
    }
    const response = await api.delete(`/admin/rooms/${id}`);
    return response.data;
  },

  // Mettre à jour le statut d'une chambre
  updateRoomStatus: async (id, status) => {
    if (!id) {
      throw new Error('ID de chambre non spécifié');
    }
    const response = await api.patch(`/admin/rooms/${id}/status`, { status });
    return formatRoomData(response.data);
  },

  // Récupérer toutes les chambres (admin uniquement)
  getAllRooms: async () => {
    const response = await api.get('/admin/rooms');
    return response.data;
  },

  // Récupérer les chambres disponibles
  getAvailableRooms: async () => {
    const response = await api.get('/rooms/available');
    return response.data;
  },

  // Récupérer les chambres par type
  getRoomsByType: async (type) => {
    const response = await api.get(`/rooms/type/${type}`);
    return response.data;
  },

  // Rechercher des chambres
  searchRooms: async (searchParams) => {
    const response = await api.get('/rooms/search', { params: searchParams });
    return response.data;
  },

  // Récupérer les chambres par catégorie
  getRoomsByCategory: async (categoryId) => {
    const response = await api.get(`/rooms/category/${categoryId}`);
    return response.data;
  },

  // Vérifier la disponibilité d'une chambre
  checkAvailability: async (id, startDate, endDate) => {
    try {
      const response = await api.get(`/rooms/${id}/availability`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default roomService; 