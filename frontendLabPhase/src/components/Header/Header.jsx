import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import { useAppContext } from '../../hooks/useAppContext';

const Header = () => {
  const { user, logout } = useAppContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">
                  <i className="fas fa-hotel mr-2"></i>
                  Hotel Mylan Lodge
                </h1>
              </Link>
              <nav className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link to="/booking" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Chambres
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center">
              {user ? (
                <button onClick={logout} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                  <i className="fas fa-sign-out-alt mr-1"></i> Déconnexion
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <i className="fas fa-sign-in-alt mr-1"></i> Connexion
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    <i className="fas fa-user-plus mr-1"></i> Inscription
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

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

export default Header;