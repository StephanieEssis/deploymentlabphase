import React from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

const RoomCard = ({ room }) => {
  const {
    name,
    description,
    price,
    capacity,
    images,
    amenities,
    category,
    isAvailable
  } = room;

  return (
    <div className="room-card">
      <div className="room-image">
        <img src={images[0]} alt={name} />
        {!isAvailable && <div className="room-unavailable">Non disponible</div>}
      </div>
      <div className="room-content">
        <h3 className="room-name">{name}</h3>
        <p className="room-category">{category?.name}</p>
        <p className="room-description">{description}</p>
        <div className="room-details">
          <span className="room-capacity">Capacité: {capacity} personnes</span>
          <span className="room-price">{price.toLocaleString()} FCFA / nuit</span>
        </div>
        <div className="room-amenities">
          {amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
        <Link to={`/rooms/${room._id}`} className="room-link">
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default RoomCard; 