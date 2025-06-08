import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { roomService } from '../../services/roomService';
import './Room.css';

const RoomList = ({ categoryId = null }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        console.log('Fetching rooms...');
        const data = categoryId
          ? await roomService.getRoomsByCategory(categoryId)
          : await roomService.getAllRooms();
        console.log('Rooms data:', data);
        setRooms(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Erreur lors du chargement des chambres');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Chargement des chambres...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (rooms.length === 0) {
    return <div className="no-rooms">Aucune chambre disponible</div>;
  }

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
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