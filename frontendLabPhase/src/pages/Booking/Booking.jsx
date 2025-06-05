import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserFriends, faBed, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { useAppContext } from '../../hooks/useAppContext';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const { user } = useAppContext();

  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests')) || 1,
    specialRequests: ''
  });

  // Données simulées des chambres
  const roomsData = useMemo(() => [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable avec lit queen, salle de bain privée et vue sur la ville.',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Sèche-cheveux']
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium avec lit king et vue panoramique.',
      price: 80000,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV écran plat', 'Mini-bar', 'Climatisation', 'Salle de bain marbre']
    },
    {
      id: 3,
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé et chambre spacieuse.',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi premium', 'TV 55"', 'Espace bureau', 'Service en chambre']
    },
    {
      id: 4,
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants, comprenant deux chambres séparées.',
      price: 90000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', '2 TV', 'Espace jeu', 'Lit bébé sur demande']
    }
  ], []);

  useEffect(() => {
    if (id) {
      const roomId = parseInt(id, 10);
      const selectedRoom = roomsData.find(r => r.id === roomId);
      if (selectedRoom) {
        setRoom(selectedRoom);
      } else {
        navigate('/booking');
      }
    } else {
      setRoom(null);
    }
  }, [id, navigate, roomsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Veuillez sélectionner les dates d\'arrivée et de départ.');
      return;
    }
    if (bookingData.checkOut <= bookingData.checkIn) {
      alert('La date de départ doit être après la date d\'arrivée.');
      return;
    }
    console.log('Réservation soumise:', { roomId: id, ...bookingData });
    alert('Réservation confirmée !');
    navigate('/');
  };

  const handleBookingClick = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  if (!id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Nos Chambres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsData.map(roomItem => (
            <div
              key={roomItem.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={roomItem.image}
                alt={roomItem.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{roomItem.name}</h2>
                <p className="text-gray-600 mb-4">{roomItem.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Équipements :</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {roomItem.amenities.map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {roomItem.price} FCFA <span className="text-sm font-normal text-gray-600">/nuit</span>
                  </div>
                  <button
                    onClick={() => handleBookingClick(roomItem.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center"
                  >
                    <span>Réserver</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!room) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {room.amenities.map((item, index) => (
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

          <form onSubmit={handleSubmit}>
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
                  <option key={num} value={num}>
                    {num} {num > 1 ? 'personnes' : 'personne'}
                  </option>
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
