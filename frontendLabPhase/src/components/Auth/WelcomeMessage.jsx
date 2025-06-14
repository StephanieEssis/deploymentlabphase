import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const WelcomeMessage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getWelcomeMessage = () => {
    if (user.role === 'admin') {
      return {
        title: 'Bienvenue dans votre espace administrateur',
        message: 'Vous pouvez gérer les chambres, les réservations et les utilisateurs depuis votre tableau de bord.'
      };
    } else {
      return {
        title: `Bonjour ${user.fullName}`,
        message: 'Vous pouvez réserver des chambres et gérer vos réservations.'
      };
    }
  };

  const { title, message } = getWelcomeMessage();

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <i className={`fas ${user.role === 'admin' ? 'fa-user-shield' : 'fa-user'} text-blue-500 text-xl`}></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">{title}</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage; 