import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService } from '../services/roomService';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await roomService.getRoomById(id);
        setRoom(data);
        setLoading(false);
      } catch (err) {
        setError(`Erreur lors du chargement de la chambre: ${err.message}`);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p>Chargement de la chambre...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>Chambre non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
          <p className="text-gray-600">{room.category.name}</p>
        </div>

        <div className="mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden mb-4">
            <img
              src={room.images[selectedImage]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          {room.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${room.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600">{room.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Capacité</h3>
                  <p className="text-lg font-semibold text-gray-900">{room.capacity} personnes</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Prix par nuit</h3>
                  <p className="text-2xl font-bold text-blue-600">{room.price} FCFA</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  <p className={`text-lg font-semibold ${
                    room.isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {room.isAvailable ? 'Disponible' : 'Non disponible'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/booking/${room._id}`)}
                disabled={!room.isAvailable}
                className={`w-full mt-6 px-4 py-2 rounded-md text-white font-medium ${
                  room.isAvailable
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {room.isAvailable ? 'Réserver maintenant' : 'Non disponible'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 