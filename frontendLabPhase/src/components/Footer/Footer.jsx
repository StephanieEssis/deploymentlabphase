import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hotel Mylan Lodge</h3>
            <p className="text-gray-400">
              Votre solution complète pour la gestion de réservations hôtelières, offrant confort et élégance pour tous vos séjours.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Accueil</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Chambres</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">À propos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>Sassandra,cote d'ivoire</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>+225 05 05 66 50 89</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>contact@hotelmylanlodge.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos offres spéciales et actualités.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 w-full text-gray-800 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition duration-300"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Hotel Mylan Lodge. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white cursor-pointer">Conditions d'utilisation</a>
            <a href="#" className="text-gray-400 hover:text-white cursor-pointer">Politique de confidentialité</a>
            <a href="#" className="text-gray-400 hover:text-white cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;