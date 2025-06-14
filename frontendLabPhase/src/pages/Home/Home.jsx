import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, 
  faWifi, 
  faSwimmingPool, 
  faUtensils, 
  faParking, 
  faSpa,
  faSearch,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import roomService from '../../services/roomService';
import bookingService from '../../services/bookingService';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    monthlyBookings: 0
  });
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomsResponse, bookingsResponse] = await Promise.all([
          roomService.getRooms(),
          user ? bookingService.getBookings() : Promise.resolve({ bookings: [] })
        ]);

        const rooms = roomsResponse.rooms || [];
        const bookings = bookingsResponse.bookings || [];

        // Calculer les statistiques
        const currentMonth = new Date().getMonth();
        const monthlyBookings = bookings.filter(booking => 
          new Date(booking.checkIn).getMonth() === currentMonth
        ).length;

        setStats({
          totalRooms: rooms.length,
          availableRooms: rooms.filter(room => room.status === 'available').length,
          monthlyBookings: monthlyBookings
        });

        // Sélectionner les chambres en vedette (les 3 premières disponibles)
        setFeaturedRooms(rooms.filter(room => room.status === 'available').slice(0, 3));
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const features = [
    { icon: faBed, title: 'Chambres Confortables', description: 'Des chambres spacieuses et confortables pour un séjour agréable' },
    { icon: faWifi, title: 'WiFi Gratuit', description: 'Accès Internet haut débit dans tout l\'établissement' },
    { icon: faSwimmingPool, title: 'Piscine', description: 'Piscine extérieure avec vue panoramique' },
    { icon: faUtensils, title: 'Restaurant', description: 'Restaurant gastronomique avec des spécialités locales' },
    { icon: faParking, title: 'Parking Sécurisé', description: 'Parking privé et sécurisé pour tous les clients' },
    { icon: faSpa, title: 'Spa & Bien-être', description: 'Centre de bien-être avec massages et soins relaxants' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="mt-2">Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bienvenue à Mylan Lodge
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
              Votre havre de paix au cœur de la nature. Découvrez un séjour inoubliable dans notre établissement de luxe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/rooms"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Découvrir nos chambres
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Créer un compte
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 text-3xl mb-4">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Chambres en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{room.price}€</span>
                    <Link
                      to={`/rooms/${room._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Dashboard Section */}
      {user?.role === 'admin' && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tableau de Bord Administrateur</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-600 text-2xl">
                    <FontAwesomeIcon icon={faBed} />
                  </div>
                  <span className="text-2xl font-bold">{stats.totalRooms}</span>
                </div>
                <h3 className="text-lg font-semibold">Total des Chambres</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-green-600 text-2xl">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <span className="text-2xl font-bold">{stats.availableRooms}</span>
                </div>
                <h3 className="text-lg font-semibold">Chambres Disponibles</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-purple-600 text-2xl">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <span className="text-2xl font-bold">{stats.monthlyBookings}</span>
                </div>
                <h3 className="text-lg font-semibold">Réservations du Mois</h3>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accéder au tableau de bord complet
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;




