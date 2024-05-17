import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../Services/auth';
import { Sidebar } from './Sidebar';

export default function AdminSettings(props) {
    const { changeLogin } = props;
    const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    changeLogin(false)
    navigate("/admin");
  };


  return (
    <>
      <div className=" p-5 flex justify-between ms-12">
        <h1 className="text-3xl font-semibold text-white">Settings </h1>
        <button
        //   onClick={onAddOffer}
          className="  cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
        >
          Temppp
        </button>
      </div>
      <hr />
      <Sidebar changeLogin={onlogout} />
    </>
  )
}
