import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faBed, 
  faCalendarCheck, 
  faUsers,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const AdminNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: faChartLine },
    { path: '/admin/rooms', label: 'Gestion des chambres', icon: faBed },
    { path: '/admin/bookings', label: 'Réservations', icon: faCalendarCheck },
    { path: '/admin/users', label: 'Utilisateurs', icon: faUsers },
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Administration</h2>
        <p className="text-sm text-gray-500">Gestion de l'hôtel</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNav; 