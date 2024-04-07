import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../Services/auth";
import { Sidebar } from "../SafeComponents/Sidebar";

export default function Offer(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;

  const onAddProduct = () => {
    navigate("/offer/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false)
  };


  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Sidebar changeLogin={logout}  />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Offer
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
