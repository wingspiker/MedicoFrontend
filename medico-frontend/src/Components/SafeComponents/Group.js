import React from 'react'
import { signOut } from '../../Services/auth';
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Group(props) {
    const {changeLogin} = props
    const navigate = useNavigate();
    const logout = () => {
        signOut();
        
        changeLogin(false);
      };
      const onAddGroup = () => {
        navigate("/Group/add");
      };
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
              onClick={onAddGroup}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Group
            </button>
          </div>
          <hr></hr>
        </div>
        <div className=" p-8">
          Hello Groups
        </div>
      </div>
    </div>
  )
}
