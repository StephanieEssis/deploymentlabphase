import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: 'fas fa-chart-line' },
    { path: '/admin/rooms', label: 'Gestion des chambres', icon: 'fas fa-bed' },
    { path: '/admin/bookings', label: 'Réservations', icon: 'fas fa-calendar-check' },
    { path: '/admin/users', label: 'Utilisateurs', icon: 'fas fa-users' },
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-6">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className={`${item.icon} w-6`}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav; 