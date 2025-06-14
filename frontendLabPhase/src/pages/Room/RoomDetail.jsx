import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, 
  faWifi, 
  faTv, 
  faSnowflake,
  faCoffee,
  faShower,
  faCalendarAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import roomService from '../../services/roomService';
import { useAuth } from '../../contexts/AuthContext';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await roomService.getRoomById(id);
        setRoom(response.room);
      } catch (err) {
        setError('Erreur lors du chargement des détails de la chambre');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/bookings/new/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error || 'Chambre non trouvée'}</p>
          <p className="mt-2">Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: faBed, label: 'Lit King Size' },
    { icon: faWifi, label: 'WiFi Gratuit' },
    { icon: faTv, label: 'TV Écran Plat' },
    { icon: faSnowflake, label: 'Climatisation' },
    { icon: faCoffee, label: 'Cafetière' },
    { icon: faShower, label: 'Salle de Bain Privée' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Galerie d'images */}
      <div className="mb-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img
            src={room.images[selectedImage]}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {room.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden ${
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
      </div>

      {/* Informations de la chambre */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <p className="text-gray-600 mb-6">{room.description}</p>

          {/* Caractéristiques */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={amenity.icon}
                    className="text-blue-600 mr-2"
                  />
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Détails supplémentaires */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Détails</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-blue-600 mr-2"
                />
                <span>Capacité : {room.capacity} personnes</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faBed}
                  className="text-blue-600 mr-2"
                />
                <span>Type de lit : {room.bedType}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-blue-600 mr-2"
                />
                <span>Disponibilité : {room.status === 'available' ? 'Disponible' : 'Occupée'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panneau de réservation */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {room.price}€ <span className="text-sm text-gray-500">/ nuit</span>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {user ? 'Réserver maintenant' : 'Se connecter pour réserver'}
            </button>
            <div className="mt-4 text-sm text-gray-500">
              <p>✓ Annulation gratuite</p>
              <p>✓ Paiement sécurisé</p>
              <p>✓ Meilleur prix garanti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 