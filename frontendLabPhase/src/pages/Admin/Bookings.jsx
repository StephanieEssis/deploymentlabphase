import React from 'react';

const AdminBookings = () => {
  const bookings = [
    { id: 1, room: 'Chambre Standard', client: 'Jean Dupont', checkIn: '2023-06-15', checkOut: '2023-06-20', status: 'confirmée' },
    { id: 2, room: 'Suite Junior', client: 'Marie Martin', checkIn: '2023-06-18', checkOut: '2023-06-25', status: 'confirmée' },
    { id: 3, room: 'Chambre Deluxe', client: 'Pierre Durand', checkIn: '2023-06-20', checkOut: '2023-06-22', status: 'annulée' },
    { id: 4, room: 'Suite Familiale', client: 'Sophie Lambert', checkIn: '2023-06-22', checkOut: '2023-06-30', status: 'en attente' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des Réservations</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrivée</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Départ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.room}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'confirmée' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'annulée' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-green-600 hover:text-green-900 mr-4">
                    <i className="fas fa-check"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <i className="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;