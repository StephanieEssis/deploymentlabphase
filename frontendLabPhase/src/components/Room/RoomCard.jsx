import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, 
  faUsers, 
  faWifi, 
  faTv, 
  faSnowflake,
  faShower,
  faCoffee
} from '@fortawesome/free-solid-svg-icons';
import './Room.css';

const RoomCard = ({ room }) => {
  const amenities = [
    { icon: faWifi, label: 'WiFi' },
    { icon: faTv, label: 'TV' },
    { icon: faSnowflake, label: 'Climatisation' },
    { icon: faShower, label: 'Salle de bain' },
    { icon: faCoffee, label: 'Café' }
  ];

  if (!room._id) {
    console.error('Room ID is missing:', room);
    return null;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image avec overlay au survol */}
      <div className="relative group">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
        {!room.isAvailable && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
            Non disponible
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{room.name}</h3>
            <p className="text-gray-600 text-sm">{room.category?.name || 'Catégorie non spécifiée'}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {room.price.toLocaleString()} FCFA
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

        {/* Capacité */}
        <div className="flex items-center text-gray-600 mb-4">
          <FontAwesomeIcon icon={faBed} className="mr-2" />
          <span className="mr-4">{room.capacity} lit(s)</span>
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          <span>Max {room.capacity} personne(s)</span>
        </div>

        {/* Équipements */}
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.map((amenity, index) => (
            <span
              key={index}
              className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              <FontAwesomeIcon icon={amenity.icon} className="mr-1" />
              {amenity.label}
            </span>
          ))}
        </div>

        {/* Bouton de réservation */}
        <Link
          to={`/rooms/${room._id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
        >
          Réserver maintenant
        </Link>
      </div>
    </div>
  );
};

export default RoomCard; 