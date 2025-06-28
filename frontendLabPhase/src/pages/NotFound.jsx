import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBed, faCalendarCheck, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page non trouvée</h2>
        <p className="text-gray-500 mb-6">
          Désolé, la page <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code> n'existe pas.
        </p>
        
        <div className="space-y-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Retour à l'accueil
          </Link>
          
          {isAdmin && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Pages d'administration :</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/rooms"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faBed} className="mr-1" />
                  Chambres
                </Link>
                <Link
                  to="/admin/bookings"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="mr-1" />
                  Réservations
                </Link>
                <Link
                  to="/admin/users"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-1" />
                  Utilisateurs
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-400">
          Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur.
        </p>
      </div>
    </div>
  );
};

export default NotFound; 