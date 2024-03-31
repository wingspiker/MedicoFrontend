import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 h-screen text-white flex flex-col justify-center items-center">
      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <h1 className="text-3xl font-bold">Medico</h1>
        <div>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">Login</Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Register</Link>
        </div>
      </header>
      <div className="flex justify-center items-center">
        <img src="https://images.vexels.com/media/users/3/142777/isolated/lists/84711206e52e0d4ff6c793cb476ea264-heartbeat-star-medical-logo.png" alt="Medico Logo" className="w-64 h-64" />
      </div>
    </div>
  );
}

export default Home;
