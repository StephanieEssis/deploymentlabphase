import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Search/SearchBar';
import RoomList from '../../components/Room/RoomList';
import StatsCard from '../../components/Stats/StatsCard';
import BookingChart from '../../components/Stats/BookingChart';
// import { useAppContext } from '../../hooks/useAppContext';
import LoginModal from '../../components/Auth/LoginModal';
import RegisterModal from '../../components/Auth/RegisterModal';

const Home = () => {
  const navigate = useNavigate();
  // const { user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
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

  const handleBookingClick = () => {
    setIsLoading(true);
    try {
      navigate('/booking');
    } catch (error) {
      console.error('Erreur lors de la redirection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Votre séjour parfait commence ici
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Découvrez le confort et l'élégance dans nos chambres soigneusement conçues pour une expérience inoubliable.
            </p>
            <div className="mt-8">
              <button 
                onClick={handleBookingClick}
                disabled={isLoading}
                className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center justify-center min-w-[200px] ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </>
                ) : (
                  'Réserver maintenant'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Nos Chambres
          </h2>
          <RoomList rooms={roomsData} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Statistiques de l'Hôtel
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez quelques chiffres clés sur notre établissement et nos services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatsCard icon="fa-door-open" value="120" label="Chambres au total" />
            <StatsCard icon="fa-check-circle" value="85" label="Chambres disponibles" />
            <StatsCard icon="fa-calendar-check" value="1,240" label="Réservations ce mois" />
            <StatsCard icon="fa-users" value="5,680" label="Utilisateurs inscrits" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookingChart />
          </div>
        </div>
      </section>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          showRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)} 
          showLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Home;




