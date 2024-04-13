import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div className="bg-cyan-900 h-screen text-white flex flex-col justify-center items-center">
      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <h1 className="text-3xl font-bold">Medico <span className=' text-sm absolute bottom-2 text-red-500'>Admin</span> </h1>
      </header>
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4 font-bold text-gray-800">Admin Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium">Email</label>
              <input type="email" id="email" name="email" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-800 font-medium">Password</label>
              <input type="password" id="password" name="password" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600">Login</button>
          </form>
        </div>
      </div>
      {/* <div className="flex justify-center items-center">
        <img src="medico-logo.png" alt="Medico Logo" className="w-64 h-64" />
      </div> */}
    </div>
  );
}
