import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../../services/bookingService';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getUserBookings();
        setBookings(response.bookings || []);
      } catch (err) {
        setError('Erreur lors du chargement des réservations');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      // Rafraîchir la liste des réservations
      const response = await bookingService.getUserBookings();
      setBookings(response.bookings || []);
    } catch (err) {
      setError('Erreur lors de l\'annulation de la réservation');
      console.error('Error canceling booking:', err);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Réservations</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore de réservations</p>
          <Link
            to="/rooms"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Voir les chambres disponibles
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {booking.room?.name || 'Chambre'}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status === 'confirmed'
                      ? 'Confirmée'
                      : booking.status === 'pending'
                      ? 'En attente'
                      : 'Annulée'}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Arrivée:</span>{' '}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Départ:</span>{' '}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Prix total:</span>{' '}
                    {booking.totalPrice.toLocaleString()} FCFA
                  </p>
                  <p>
                    <span className="font-medium">Personnes:</span>{' '}
                    {booking.guests.adults} adulte(s) {booking.guests.children > 0 ? `et ${booking.guests.children} enfant(s)` : ''}
                  </p>
                </div>

                <div className="mt-6 space-y-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Annuler la réservation
                    </button>
                  )}
                  <Link
                    to={`/bookings/${booking._id}`}
                    className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList; 