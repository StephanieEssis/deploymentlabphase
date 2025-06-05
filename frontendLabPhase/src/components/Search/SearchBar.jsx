import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation des dates
    if (!searchParams.checkIn || !searchParams.checkOut) {
      alert('Veuillez sélectionner les dates de séjour');
      return;
    }
    
    // Vérification que la date de départ est après l'arrivée
    if (new Date(searchParams.checkOut) <= new Date(searchParams.checkIn)) {
      alert('La date de départ doit être après la date d\'arrivée');
      return;
    }

    // Appel de la fonction de recherche avec les paramètres validés
    onSearch({
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests
    });
  };

  return (
    <div className="py-6 bg-white shadow-md -mt-16 relative z-10 rounded-lg max-w-6xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Champ Date d'arrivée */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fas fa-calendar mr-2 text-gray-400"></i>
              Date d'arrivée
            </label>
            <input
              type="date"
              name="checkIn"
              value={searchParams.checkIn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Champ Date de départ */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fas fa-calendar mr-2 text-gray-400"></i>
              Date de départ
            </label>
            <input
              type="date"
              name="checkOut"
              value={searchParams.checkOut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
              disabled={!searchParams.checkIn}
            />
          </div>

          {/* Champ Nombre de personnes */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fas fa-user-friends mr-2 text-gray-400"></i>
              Personnes
            </label>
            <select
              name="guests"
              value={searchParams.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
              ))}
            </select>
          </div>

          {/* Bouton Rechercher */}
          <div className="col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i> 
              Rechercher
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;