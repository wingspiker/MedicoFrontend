import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen bg-cyan-700">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-cyan-700 mb-4">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
        <button
          className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
