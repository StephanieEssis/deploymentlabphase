import api from './api';

const formatRoomData = (room) => {
  // Validation et nettoyage des données de chambre
  if (!room) {
    console.error('Room data is null or undefined');
    return null;
  }

  // S'assurer que l'ID est correct
  const roomId = room._id || room.id;
  if (!roomId) {
    console.error('Room missing ID:', room);
    return null;
  }

  // Vérifier que le prix est valide
  const roomPrice = room.price;
  if (!roomPrice || roomPrice <= 0 || typeof roomPrice !== 'number') {
    console.error('Invalid room price:', roomPrice, 'for room:', room.name);
    return null; // Ne pas retourner de chambres avec des prix invalides
  }

  const formattedRoom = {
    _id: roomId, // Garder l'ID original
    id: roomId,  // Compatibilité avec l'ancien format
    name: room.name || 'Chambre sans nom',
    description: room.description || 'Aucune description disponible',
    price: roomPrice, // Utiliser le prix validé
    capacity: room.capacity || 1,
    amenities: room.amenities || [],
    images: room.images || [],
    isAvailable: room.isAvailable !== undefined ? room.isAvailable : true,
    status: room.status || 'available',
    category: room.category || null
  };
  
  return formattedRoom;
};

const roomService = {
  // Récupérer toutes les chambres
  getRooms: async () => {
    try {
      const response = await api.get('/rooms');
      
      // Vérifier si la réponse est un tableau ou un objet avec une propriété rooms
      const rooms = Array.isArray(response.data) ? response.data : (response.data.rooms || []);
      
      // Formater et filtrer les chambres valides
      const formattedRooms = rooms
        .map((room) => {
          return formatRoomData(room);
        })
        .filter(room => room !== null); // Filtrer les chambres invalides
      
      return formattedRooms;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      if (error.response?.status === 500) {
        console.error('Server error details:', error.response.data);
      }
      throw new Error('Impossible de récupérer les chambres. Veuillez réessayer plus tard.');
    }
  },

  // Récupérer une chambre par son ID
  getRoomById: async (id) => {
    if (!id || id === 'undefined') {
      console.error('Invalid room ID:', id);
      throw new Error('ID de chambre non spécifié ou invalide');
    }
    
    try {
      const response = await api.get(`/rooms/${id}`);
      
      const formattedRoom = formatRoomData(response.data);
      
      if (!formattedRoom) {
        console.error('Room not found or invalid data for ID:', id);
        throw new Error('Chambre non trouvée ou données invalides');
      }
      
      return formattedRoom;
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
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