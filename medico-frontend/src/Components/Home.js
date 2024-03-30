import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 h-screen text-white">
      <header className="flex justify-between items-center py-4 px-8">
        <h1 className="text-2xl font-bold">Medico</h1>
        <div>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">Login</Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Register</Link>
        </div>
      </header>
      {/* Add your home page content here */}
    </div>
  );
}

export default Home;
