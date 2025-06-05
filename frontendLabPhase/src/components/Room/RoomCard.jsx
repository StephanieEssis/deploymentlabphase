// import React from 'react';
// import { Link } from 'react-router-dom';

// const RoomCard = ({ room }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
//       <div className="h-48 overflow-hidden">
//         <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
//       </div>
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
//         <p className="text-gray-600 mb-4">{room.description}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-2xl font-bold text-blue-600">
//             {room.price} €<span className="text-sm text-gray-500 font-normal"> / nuit</span>
//           </span>
//           <Link to={`/booking/${room.id}`}>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
//               Voir détails
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomCard;    



import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {room.price} FCFA<span className="text-sm text-gray-500 font-normal"> / nuit</span>
          </span>
          <Link to={`/booking/${room.id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
              Voir détails
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard; 