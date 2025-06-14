import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../services/roomService';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const defaultImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) {
        setError('ID de chambre non spécifié');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await roomService.getRoom(id);
        if (!data) {
          throw new Error('Chambre non trouvée');
        }
        setRoom(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching room:', err);
        setError(err.message || 'Erreur lors du chargement de la chambre');
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Chambre non trouvée</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const images = room.images || [];
  const hasImages = images.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
          <p className="text-gray-600">{room.category?.name}</p>
        </div>

        <div className="mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden mb-4 shadow-lg">
            <img
              src={hasImages ? images[selectedImage] : defaultImage}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          {hasImages && images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:opacity-80'
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600">{room.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities?.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Capacité</h3>
                  <p className="text-lg font-semibold text-gray-900">{room.capacity} personnes</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Prix par nuit</h3>
                  <p className="text-2xl font-bold text-blue-600">{room.price.toLocaleString()} FCFA</p>
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
                onClick={() => navigate(`/bookings/new/${room._id}`)}
                disabled={!room.isAvailable}
                className={`w-full mt-6 px-4 py-2 rounded-md text-white font-medium transition-all duration-300 ${
                  room.isAvailable
                    ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
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