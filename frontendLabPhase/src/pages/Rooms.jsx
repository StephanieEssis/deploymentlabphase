import React, { useState, useEffect } from 'react';
import RoomList from '../components/Room/RoomList';
import { categoryService } from '../services/categoryService';
import './Rooms.css';

const Rooms = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  if (loading) {
    return <div className="loading">Chargement des catégories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Nos Chambres</h1>
        <div className="category-filters">
          <button
            className={`category-filter ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            Toutes les chambres
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`category-filter ${selectedCategory === category._id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <RoomList categoryId={selectedCategory} />
    </div>
  );
};

export default Rooms;

