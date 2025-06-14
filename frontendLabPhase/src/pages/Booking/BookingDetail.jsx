import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';
import bookingService from '../../services/bookingService';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/my-bookings');
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await bookingService.getBookingById(id);
        setBooking(response.booking);
      } catch (err) {
        setError('Erreur lors du chargement de la réservation');
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const handleCancel = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      try {
        await bookingService.cancelBooking(id);
        navigate('/my-bookings');
      } catch (err) {
        setError('Erreur lors de l\'annulation de la réservation');
        console.error('Error canceling booking:', err);
      }
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Reçu de réservation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .hotel-name {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
            }
            .receipt-title {
              font-size: 20px;
              margin: 20px 0;
            }
            .details {
              margin: 20px 0;
            }
            .details p {
              margin: 10px 0;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hotel-name">Mylan Lodge</div>
            <div>Reçu de réservation</div>
          </div>
          
          <div class="receipt-title">Détails de la réservation</div>
          
          <div class="details">
            <p><strong>Numéro de réservation:</strong> ${booking._id}</p>
            <p><strong>Statut:</strong> ${
              booking.status === 'confirmed'
                ? 'Confirmée'
                : booking.status === 'pending'
                ? 'En attente'
                : 'Annulée'
            }</p>
            <p><strong>Chambre:</strong> ${booking.room?.name}</p>
            <p><strong>Type:</strong> ${booking.room?.type}</p>
            <p><strong>Date d'arrivée:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Date de départ:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><strong>Personnes:</strong> ${booking.guests.adults} adulte(s)${
              booking.guests.children > 0 ? ` et ${booking.guests.children} enfant(s)` : ''
            }</p>
            <p><strong>Prix total:</strong> ${booking.totalPrice.toLocaleString()} FCFA</p>
          </div>
          
          <div class="footer">
            <p>Merci d'avoir choisi Mylan Lodge pour votre séjour</p>
            <p>Pour toute question, veuillez nous contacter au +123 456 789</p>
          </div>
          
          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()">Imprimer</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
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

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservation non trouvée</h2>
          <Link
            to="/my-bookings"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Retour aux réservations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Réservation #{booking._id}
              </h1>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la chambre</h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Nom:</span> {booking.room?.name}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {booking.room?.type}
                  </p>
                  <p>
                    <span className="font-medium">Prix par nuit:</span>{' '}
                    {booking.room?.price.toLocaleString()} FCFA
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la réservation</h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Date d'arrivée:</span>{' '}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Date de départ:</span>{' '}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Personnes:</span>{' '}
                    {booking.guests.adults} adulte(s) {booking.guests.children > 0 ? `et ${booking.guests.children} enfant(s)` : ''}
                  </p>
                  <p>
                    <span className="font-medium">Prix total:</span>{' '}
                    {booking.totalPrice.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Link
                to="/my-bookings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Retour aux réservations
              </Link>
              <div className="space-x-4">
                {booking.status === 'pending' && (
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Annuler la réservation
                  </button>
                )}
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faPrint} className="mr-2" />
                  Imprimer le reçu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail; 