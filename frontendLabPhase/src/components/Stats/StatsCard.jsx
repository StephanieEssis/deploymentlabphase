import React from 'react';

const StatsCard = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 text-4xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatsCard;