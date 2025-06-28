import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import bookingService from '../../services/bookingService';
import roomService from '../../services/roomService';

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId || roomId === 'undefined') {
        setError('ID de chambre non spécifié ou invalide');
        setLoading(false);
        return;
      }

      try {
        const data = await roomService.getRoomById(roomId);
        
        // Vérifier que la chambre a un prix valide
        if (!data || !data.price || data.price <= 0) {
          setError('Cette chambre n\'est pas disponible pour la réservation (prix invalide)');
          setLoading(false);
          return;
        }
        
        setRoom(data);
      } catch (err) {
        console.error('Error fetching room:', err);
        setError(err.message || 'Erreur lors du chargement de la chambre');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!user) {
      navigate('/login', { state: { from: `/rooms/${roomId}/book` } });
      return;
    }

    // Validation des dates
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      setError('La date d\'arrivée ne peut pas être dans le passé');
      setSubmitting(false);
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError('La date de départ doit être après la date d\'arrivée');
      setSubmitting(false);
      return;
    }

    // Validation du nombre de personnes
    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    if (totalGuests > room?.capacity) {
      setError(`Le nombre total de personnes (${totalGuests}) ne peut pas dépasser la capacité de la chambre (${room.capacity})`);
      setSubmitting(false);
      return;
    }

    try {
      // Vérification finale du prix de la chambre
      if (!room || !room.price || room.price <= 0) {
        throw new Error('Prix de chambre invalide. Impossible de créer la réservation.');
      }
      
      const bookingData = {
        roomId: roomId,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: {
          adults: parseInt(formData.adults),
          children: parseInt(formData.children)
        }
      };

      const response = await bookingService.createBooking(bookingData);
      
      // Le backend retourne { message, booking: { _id, ... } }
      const bookingId = response.booking?._id || response.id;
      
      if (!bookingId) {
        throw new Error('ID de réservation non reçu du serveur');
      }
      
      navigate(`/bookings/${bookingId}`);
    } catch (err) {
      console.error('Error creating booking:', err);
      
      // Gestion spécifique des erreurs
      if (err.response?.status === 400) {
        const errorMessage = err.response.data?.message || 'Données de réservation invalides';
        setError(errorMessage);
      } else if (err.response?.status === 401) {
        setError('Vous devez être connecté pour effectuer une réservation');
        navigate('/login');
      } else if (err.response?.status === 404) {
        setError('Chambre non trouvée');
      } else {
        setError(err.message || 'Une erreur est survenue lors de la réservation');
      }
    } finally {
      setSubmitting(false);
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
          <strong className="font-bold">Erreur !</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Réserver la chambre {room?.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                    Date d'arrivée
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="checkIn"
                      id="checkIn"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                    Date de départ
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="checkOut"
                      id="checkOut"
                      required
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
                    Adultes
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="adults"
                      id="adults"
                      min="1"
                      max={room?.capacity || 4}
                      required
                      value={formData.adults}
                      onChange={handleInputChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                    Enfants
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="children"
                      id="children"
                      min="0"
                      max={room?.capacity - formData.adults || 2}
                      required
                      value={formData.children}
                      onChange={handleInputChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Réservation en cours...' : 'Réserver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 