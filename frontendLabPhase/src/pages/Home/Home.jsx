import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import LoadingSpinner from '../../components/LoadingSpinner';
import OptimizedImage from '../../components/OptimizedImage';
import SkeletonLoader from '../../components/SkeletonLoader';

// Lazy load des composants lourds
const AdminDashboard = lazy(() => import('../Admin/Dashboard'));

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    monthlyBookings: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0
  });
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données de fallback pour les chambres
  const fallbackRooms = [
    {
      _id: 'fallback-1',
      name: 'Chambre Standard',
      description: 'Chambre confortable avec équipements de base',
      price: 75000,
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80'],
      isAvailable: true
    },
    {
      _id: 'fallback-2',
      name: 'Chambre Deluxe',
      description: 'Chambre spacieuse avec vue panoramique',
      price: 80000,
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80'],
      isAvailable: true
    },
    {
      _id: 'fallback-3',
      name: 'Suite Junior',
      description: 'Suite élégante avec salon séparé',
      price: 120000,
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80'],
      isAvailable: true
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Appel API principal pour les chambres (toujours nécessaire)
        let rooms = [];
        try {
          const roomsResponse = await roomService.getRooms();
          rooms = Array.isArray(roomsResponse) ? roomsResponse : (roomsResponse.rooms || []);
        } catch (roomError) {
          console.error('Erreur lors de la récupération des chambres:', roomError);
          // En cas d'erreur, utiliser les données de fallback
          rooms = fallbackRooms;
        }
        
        // Utiliser les chambres de l'API ou les données de fallback si aucune chambre n'est disponible
        const availableRooms = rooms.length > 0 ? rooms : fallbackRooms;
        const totalRooms = availableRooms.length;
        const availableCount = availableRooms.filter(room => room.isAvailable).length;
        
        // Sélectionner les chambres en vedette immédiatement
        setFeaturedRooms(availableRooms.filter(room => room.isAvailable).slice(0, 3));
        
        // Mettre à jour les statistiques de base immédiatement
        setStats({
          totalRooms,
          availableRooms: availableCount,
          monthlyBookings: 0,
          totalBookings: 0,
          totalRevenue: 0,
          occupancyRate: 0
        });
        
        // Arrêter le loading principal après avoir récupéré les chambres
        setLoading(false);
        
        // Appels API conditionnels en arrière-plan (sans bloquer l'affichage)
        const additionalDataPromises = [];
        
        if (user) {
          // Récupérer les réservations de l'utilisateur
          additionalDataPromises.push(
            bookingService.getUserBookings().catch(() => ({ bookings: [] }))
          );
        }
        
        if (user?.role === 'admin') {
          // Récupérer les statistiques admin
          additionalDataPromises.push(
            bookingService.getStats().catch(() => ({}))
          );
        }
        
        // Attendre les données supplémentaires en arrière-plan
        if (additionalDataPromises.length > 0) {
          try {
            const additionalResults = await Promise.all(additionalDataPromises);
            
            let monthlyBookings = 0;
            let adminStats = {};
            
            if (user) {
              const bookings = additionalResults[0]?.bookings || [];
              const currentMonth = new Date().getMonth();
              monthlyBookings = bookings.filter(booking => 
                new Date(booking.checkIn).getMonth() === currentMonth
              ).length;
            }
            
            if (user?.role === 'admin') {
              adminStats = additionalResults[user ? 1 : 0] || {};
            }
            
            // Mettre à jour les statistiques avec les données supplémentaires
            setStats(prevStats => ({
              ...prevStats,
              ...adminStats,
              monthlyBookings
            }));
          } catch (err) {
            console.error('Erreur lors de la récupération des données supplémentaires:', err);
          }
        }
        
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading]);

  const features = [
    { icon: faBed, title: 'Chambres Confortables', description: 'Des chambres spacieuses et confortables pour un séjour agréable' },
    { icon: faWifi, title: 'WiFi Gratuit', description: 'Accès Internet haut débit dans tout l\'établissement' },
    { icon: faSwimmingPool, title: 'Piscine', description: 'Piscine extérieure avec vue panoramique' },
    { icon: faUtensils, title: 'Restaurant', description: 'Restaurant gastronomique avec des spécialités locales' },
    { icon: faParking, title: 'Parking Sécurisé', description: 'Parking privé et sécurisé pour tous les clients' },
    { icon: faSpa, title: 'Spa & Bien-être', description: 'Centre de bien-être avec massages et soins relaxants' }
  ];

  // Afficher le loading seulement si l'authentification est en cours OU si les données sont en cours de chargement
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
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
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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

      {/* Featured Rooms Section avec lazy loading des images */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Chambres en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.length === 0 ? (
              // Afficher les skeleton loaders seulement si aucune chambre n'est chargée
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonLoader key={index} type="room" />
              ))
            ) : (
              featuredRooms.map((room) => (
                <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <OptimizedImage
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Admin Dashboard Section avec Suspense */}
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
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-600 text-2xl">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <span className="text-2xl font-bold">{stats.totalBookings}</span>
                </div>
                <h3 className="text-lg font-semibold">Total des Réservations</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-green-600 text-2xl">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <span className="text-2xl font-bold">{stats.totalRevenue}€</span>
                </div>
                <h3 className="text-lg font-semibold">Revenu Total</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-600 text-2xl">
                    <FontAwesomeIcon icon={faBed} />
                  </div>
                  <span className="text-2xl font-bold">{stats.occupancyRate}%</span>
                </div>
                <h3 className="text-lg font-semibold">Taux d'Occupation</h3>
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