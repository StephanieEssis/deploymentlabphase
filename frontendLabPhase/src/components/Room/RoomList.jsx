import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
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