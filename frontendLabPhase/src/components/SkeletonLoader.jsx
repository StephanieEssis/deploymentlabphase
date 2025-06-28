import React from 'react';

const SkeletonLoader = ({ type = 'room' }) => {
  if (type === 'room') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'feature') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="w-12 h-12 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
};

export default SkeletonLoader; 