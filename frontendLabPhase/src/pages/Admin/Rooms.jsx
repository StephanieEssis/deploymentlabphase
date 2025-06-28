import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faSpinner, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import RoomForm from '../../components/Admin/RoomForm';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await fetch('https://backendmanage-3.onrender.com/api/admin/rooms', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Erreur lors du chargement des chambres');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    console.log('🔄 Soumission du formulaire...', formData);
    
    // Validation des données
    if (!formData.name || !formData.description || !formData.price || !formData.capacity) {
      throw new Error('Veuillez remplir tous les champs obligatoires');
    }
    
    // Préparation des données pour l'envoi
    const roomData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      category: formData.category.trim() || undefined,
      amenities: formData.amenities || []
    };
    
    console.log('📦 Données préparées:', roomData);
    
    const token = localStorage.getItem('token');
    console.log('🔑 Token:', token ? 'Présent' : 'Absent');
    
    const url = editingRoom 
      ? `https://backendmanage-3.onrender.com/api/admin/rooms/${editingRoom._id}`
      : 'https://backendmanage-3.onrender.com/api/admin/rooms';
    
    console.log('🌐 URL:', url);
    
    const response = await fetch(url, {
      method: editingRoom ? 'PUT' : 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomData)
    });
    
    console.log('📡 Réponse reçue:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erreur de réponse:', errorData);
      throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
    }
    
    const result = await response.json();
    console.log('✅ Chambre créée/modifiée:', result);
    
    await fetchRooms();
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://backendmanage-3.onrender.com/api/admin/rooms/${id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la suppression');
        }
        
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
        alert(`Erreur: ${error.message}`);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Chargement des chambres...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={fetchRooms}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des chambres</h1>
        <div className="text-sm text-gray-500">
          {rooms.length} chambre(s) au total
        </div>
      </div>

      {/* Room Form */}
      <RoomForm 
        onSubmit={handleSubmit}
        editingRoom={editingRoom}
        onCancel={handleCancelEdit}
      />

      {/* Rooms List */}
      {rooms.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <FontAwesomeIcon icon={faBed} className="text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500">Aucune chambre trouvée</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponibilité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {room.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.price} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.capacity} personnes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.isAvailable ? 'Disponible' : 'Occupée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(room)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Modifier"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRooms; 