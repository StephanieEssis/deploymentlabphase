import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserFriends, faBed, faArrowLeft, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
// import { roomService } from '../../services/roomService';
// import { useAppContext } from '../../hooks/useAppContext';

const RoomBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { user } = useAppContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    category: 'standard',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Données simulées des chambres
  const roomsData = useMemo(() => [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable avec lit queen, salle de bain privée et vue sur la ville.',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Sèche-cheveux'],
      category: 'standard'
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium avec lit king et vue panoramique.',
      price: 80000,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV écran plat', 'Mini-bar', 'Climatisation', 'Salle de bain marbre'],
      category: 'deluxe'
    },
    {
      id: 3,
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé et chambre spacieuse.',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi premium', 'TV 55"', 'Espace bureau', 'Service en chambre'],
      category: 'suite'
    },
    {
      id: 4,
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants, comprenant deux chambres séparées.',
      price: 90000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', '2 TV', 'Espace jeu', 'Lit bébé sur demande'],
      category: 'family'
    }
  ], []);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const roomId = parseInt(id, 10);
        const selectedRoom = roomsData.find(r => r.id === roomId);
        if (selectedRoom) {
          setRoom(selectedRoom);
          setError(null);
        } else {
          setError('Chambre non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la chambre');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, roomsData]);

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    
    if (checkIn < today) {
      return "La date d'arrivée ne peut pas être dans le passé";
    }
    
    if (checkOut <= checkIn) {
      return "La date de départ doit être après la date d'arrivée";
    }
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
    setBookingError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);

    // Validation des dates
    const dateError = validateDates();
    if (dateError) {
      setBookingError(dateError);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Simulation d'une réservation réussie
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai de 1 seconde
      
      // Afficher le reçu
      setShowReceipt(true);
      
      // Enregistrer la réservation dans le localStorage pour la persistance
      const reservation = {
        id: `RES-${Date.now().toString().slice(-6)}`,
        roomId: id,
        roomName: room.name,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        category: bookingData.category,
        email: bookingData.email,
        specialRequests: bookingData.specialRequests,
        total: calculateTotal(),
        date: new Date().toISOString()
      };

      // Récupérer les réservations existantes ou créer un tableau vide
      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      
      // Ajouter la nouvelle réservation
      existingReservations.push(reservation);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('reservations', JSON.stringify(existingReservations));

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setBookingError("Une erreur est survenue lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculer le nombre de nuits
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculer le prix total
  const calculateTotal = () => {
    const nights = calculateNights();
    return room ? room.price * nights : 0;
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!room) return <div className="text-center py-8">Chambre non trouvée</div>;

  // Composant du reçu
  const Receipt = () => {
    // Générer un numéro de réservation unique
    const reservationNumber = `RES-${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">Reçu de Réservation</h2>
            <p className="text-gray-600 mt-2">Numéro de réservation: {reservationNumber}</p>
            <p className="text-gray-600">Date: {currentDate}</p>
          </div>

          <div className="border-2 border-blue-100 rounded-lg p-6 mb-6">
            <div className="border-b border-blue-100 pb-4 mb-4">
              <h3 className="font-semibold text-lg text-blue-800">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold text-gray-700">Client</p>
                <p className="text-gray-600">{bookingData.firstName} {bookingData.lastName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-600">{bookingData.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Catégorie</p>
                <p className="text-gray-600 capitalize">{bookingData.category}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Date d'arrivée</p>
                <p className="text-gray-600">{new Date(bookingData.checkIn).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Date de départ</p>
                <p className="text-gray-600">{new Date(bookingData.checkOut).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Nombre de nuits</p>
                <p className="text-gray-600">{calculateNights()}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Nombre de personnes</p>
                <p className="text-gray-600">{bookingData.guests}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Prix par nuit</p>
                <p className="text-gray-600">{room.price.toLocaleString()} FCFA</p>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">Total</p>
                <p className="font-bold text-xl text-blue-600">{calculateTotal().toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>

          {bookingData.specialRequests && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-semibold text-gray-700 mb-2">Demandes spéciales</p>
              <p className="text-gray-600">{bookingData.specialRequests}</p>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              Merci de votre réservation ! Un email de confirmation vous sera envoyé avec tous les détails.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowReceipt(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                setShowReceipt(false);
                navigate('/');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showReceipt && <Receipt />}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 mb-6">{room.description}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Équipements</h2>
            <ul className="grid grid-cols-2 gap-2">
              {room.amenities?.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">
              {room.price} FCFA <span className="text-sm font-normal text-gray-600">/nuit</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Réserver maintenant</h2>
          
          {bookingError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {bookingError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={bookingData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={bookingData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                placeholder="votre@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faBed} className="mr-2" />
                Catégorie de chambre
              </label>
              <select
                name="category"
                value={bookingData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="family">Familiale</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Date d'arrivée
              </label>
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Date de départ
              </label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                disabled={!bookingData.checkIn}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Nombre de personnes
              </label>
              <select
                name="guests"
                value={bookingData.guests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faBed} className="mr-2" />
                Demandes spéciales
              </label>
              <textarea
                name="specialRequests"
                value={bookingData.specialRequests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Lit bébé, accès handicapé, etc."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking; 