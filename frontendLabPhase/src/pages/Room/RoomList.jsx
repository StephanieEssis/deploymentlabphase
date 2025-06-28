import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import roomService from '../../services/roomService';
import LoadingSpinner from '../../components/LoadingSpinner';
import OptimizedImage from '../../components/OptimizedImage';
import SkeletonLoader from '../../components/SkeletonLoader';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données de fallback pour les chambres en cas d'erreur API
  const fallbackRooms = [
    {
      _id: 'fallback-1',
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable avec lit queen, salle de bain privée et vue sur la ville.',
      price: 75,
      images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop'],
      isAvailable: true,
      capacity: 2,
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Sèche-cheveux']
    },
    {
      _id: 'fallback-2',
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium avec lit king et vue panoramique.',
      price: 95,
      images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop'],
      isAvailable: true,
      capacity: 2,
      amenities: ['Wi-Fi', 'TV écran plat', 'Mini-bar', 'Climatisation', 'Salle de bain marbre']
    },
    {
      _id: 'fallback-3',
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé et chambre spacieuse.',
      price: 120,
      images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop'],
      isAvailable: true,
      capacity: 3,
      amenities: ['Wi-Fi premium', 'TV 55"', 'Espace bureau', 'Service en chambre']
    },
    {
      _id: 'fallback-4',
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants, comprenant deux chambres séparées.',
      price: 150,
      images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'],
      isAvailable: true,
      capacity: 4,
      amenities: ['Wi-Fi', '2 TV', 'Espace jeu', 'Lit bébé sur demande']
    }
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        let response = [];
        
        try {
          response = await roomService.getRooms();
        } catch (roomError) {
          console.error('Erreur lors de la récupération des chambres:', roomError);
          // En cas d'erreur, utiliser les données de fallback
          response = fallbackRooms;
          setError('Erreur de connexion au serveur. Affichage des chambres de démonstration.');
        }
        
        // Le service retourne directement un tableau de chambres
        setRooms(Array.isArray(response) ? response : fallbackRooms);
      } catch (err) {
        setError('Erreur lors du chargement des chambres');
        console.error('Erreur:', err);
        // En cas d'erreur générale, utiliser les données de fallback
        setRooms(fallbackRooms);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="mt-2">Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Chambres</h1>

      {/* Liste des chambres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.length === 0 ? (
          // Afficher les skeleton loaders si aucune chambre n'est chargée
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={index} type="room" />
          ))
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <OptimizedImage
                src={room.images[0]}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                {/* Affichage des équipements */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Équipements :</h3>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={`${room._id}-amenity-${index}`} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{room.amenities.length - 3} autres</span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{room.price}€</span>
                    <span className="text-sm text-gray-500 ml-1">/nuit</span>
                  </div>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message si aucune chambre n'est disponible */}
      {rooms.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Aucune chambre n'est disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomList; 