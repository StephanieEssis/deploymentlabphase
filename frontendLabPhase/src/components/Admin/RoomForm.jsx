import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';

const RoomForm = ({ onSubmit, editingRoom, onCancel }) => {
  const [formData, setFormData] = useState({
    name: editingRoom?.name || '',
    description: editingRoom?.description || '',
    price: editingRoom?.price || '',
    capacity: editingRoom?.capacity || '',
    category: editingRoom?.category || '',
    amenities: editingRoom?.amenities || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erreur dans le formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={editingRoom ? faEdit : faPlus} className="mr-2" />
        {editingRoom ? 'Modifier la chambre' : 'Ajouter une nouvelle chambre'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix par nuit (FCFA) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="0"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ex: Standard, Deluxe, Suite"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting && <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />}
            {editingRoom ? 'Mettre à jour' : 'Ajouter'}
          </button>
          
          {editingRoom && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RoomForm; 