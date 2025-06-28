import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, 
  faCalendarAlt, 
  faUsers, 
  faSearch,
  faPlus,
  faList,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';

const StatsCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`text-${color}-600 text-2xl`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const QuickAction = ({ icon, title, description, to }) => (
  <Link
    to={to}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="text-blue-600 text-2xl mb-4">
      <FontAwesomeIcon icon={icon} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    monthlyBookings: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les statistiques du dashboard admin
        const statsResponse = await fetch('https://backendmanage-3.onrender.com/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!statsResponse.ok) {
          throw new Error('Erreur lors de la récupération des statistiques');
        }
        
        const statsData = await statsResponse.json();
        
        // Récupérer les utilisateurs
        const usersResponse = await fetch('https://backendmanage-3.onrender.com/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        let users = [];
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          users = usersData.users || usersData || [];
        }

        setStats({
          totalRooms: statsData.totalRooms || 0,
          availableRooms: statsData.availableRooms || 0,
          monthlyBookings: statsData.totalBookings || 0,
          totalUsers: users.length
        });
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={faBed}
          title="Total des Chambres"
          value={stats.totalRooms}
          color="blue"
        />
        <StatsCard
          icon={faCalendarAlt}
          title="Chambres Disponibles"
          value={stats.availableRooms}
          color="green"
        />
        <StatsCard
          icon={faSearch}
          title="Réservations du Mois"
          value={stats.monthlyBookings}
          color="purple"
        />
        <StatsCard
          icon={faUsers}
          title="Utilisateurs Inscrits"
          value={stats.totalUsers}
          color="orange"
        />
      </div>

      {/* Actions rapides */}
      <h2 className="text-2xl font-bold mb-6">Actions Rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <QuickAction
          icon={faPlus}
          title="Ajouter une Chambre"
          description="Créer une nouvelle chambre dans le système"
          to="/admin/rooms/new"
        />
        <QuickAction
          icon={faList}
          title="Gérer les Réservations"
          description="Voir et gérer toutes les réservations"
          to="/admin/bookings"
        />
        <QuickAction
          icon={faUserCog}
          title="Gérer les Utilisateurs"
          description="Gérer les comptes utilisateurs"
          to="/admin/users"
        />
      </div>

      {/* Graphique des réservations (à implémenter) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Tendances des Réservations</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Graphique des réservations à implémenter
        </div>
      </div>

      {/* Dernières réservations (à implémenter) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Dernières Réservations</h2>
        <div className="text-gray-500 text-center py-8">
          Liste des dernières réservations à implémenter
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 