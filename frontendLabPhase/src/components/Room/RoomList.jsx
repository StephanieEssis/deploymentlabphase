import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import roomService from '../../services/roomService';
import './Room.css';

const RoomList = ({ rooms: propRooms = null, categoryId = null }) => {
  const [rooms, setRooms] = useState(propRooms || []);
  const [loading, setLoading] = useState(!propRooms);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si des chambres sont fournies en props, on ne fait pas d'appel API
    if (propRooms) {
      setRooms(propRooms);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        console.log('Fetching rooms...');
        const data = categoryId
          ? await roomService.getRoomsByCategory(categoryId)
          : await roomService.getRooms();
        console.log('Rooms data:', data);
        
        // Filtrer les chambres sans ID valide
        const validRooms = data.filter(room => room && room._id);
        
        if (isMounted) {
          setRooms(validRooms);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching rooms:', err);
        if (isMounted) {
          setError('Erreur lors du chargement des chambres');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      isMounted = false;
    };
  }, [categoryId, propRooms]);

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
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-gray-600">Aucune chambre disponible pour le moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Chambres</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {room.images && room.images.length > 0 && (
              <div className="relative h-64">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {room.price.toLocaleString()} FCFA / nuit
                </div>
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {room.name}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {room.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    <i className="fas fa-user"></i> {room.capacity} personne(s)
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  room.isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {room.isAvailable ? 'Disponible' : 'Occupée'}
                </span>
              </div>
              {room._id && (
                <Link
                  to={`/rooms/${room._id}`}
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Voir les détails
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;



// import React from 'react';
// import RoomCard from './RoomCard';

// const RoomList = ({ rooms }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//       {rooms.map((room) => (
//         <RoomCard key={room.id} room={room} />
//       ))}
//     </div>
//   );
// };

// export default RoomList; // Export par défaut ajouté