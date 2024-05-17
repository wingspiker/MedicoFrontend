import React from 'react'
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../Services/auth';

export default function Settings(props) {
    const { changeLogin } = props;
//   const navigate = useNavigate();
  const logout = () => {
    signOut();
    changeLogin(false);
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
    <Sidebar changeLogin={logout} />
    <div className="flex-1 ms-14">
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings </h1>
        <div className="p-2 flex justify-end gap-4">
          <button
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
          >
           Tempp
          </button>
        </div>
        <hr />
      </div>
      
    </div>
  </div>
  )
}
