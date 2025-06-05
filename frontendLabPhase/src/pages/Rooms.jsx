// import React from 'react';
// import { Link } from 'react-router-dom';

// const roomsData = [
//   {
//     id: 1,
//     name: 'Chambre Standard',
//     price: 89,
//     image: 'https://source.unsplash.com/random/800x600/?hotel,standard',
//   },
//   {
//     id: 2,
//     name: 'Chambre Deluxe',
//     price: 129,
//     image: 'https://source.unsplash.com/random/800x600/?hotel,deluxe',
//   },
//   {
//     id: 3,
//     name: 'Suite Junior',
//     price: 189,
//     image: 'https://source.unsplash.com/random/800x600/?hotel,suite',
//   },
//   {
//     id: 4,
//     name: 'Suite Familiale',
//     price: 219,
//     image: 'https://source.unsplash.com/random/800x600/?hotel,family',
//   },
// ];

// const Rooms = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Nos chambres</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {roomsData.map((room) => (
//           <div key={room.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
//             <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
//               <p className="text-blue-600 font-bold mb-4">{room.price} FCFA / nuit</p>
//               <Link
//                 to={`/booking/${room.id}`}
//                 className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Réserver
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rooms;






// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Rooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRooms = async () => {
//     try {
//       const response = await fetch('https://backendlabphase.onrender.com/api/rooms'); // Remplace par ton URL backend réel
//       const data = await response.json();
//       setRooms(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Erreur lors du chargement des chambres:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-lg font-semibold">Chargement des chambres...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Nos chambres</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <div key={room._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
//             <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
//               <p className="text-blue-600 font-bold mb-4">{room.price} FCFA / nuit</p>
//               <Link
//                 to={`/booking/${room._id}`}
//                 className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Réserver
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rooms;

