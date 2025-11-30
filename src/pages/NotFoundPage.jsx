import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">❌ Page not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;