import React, {useState} from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../Services/auth";

import {Toaster, toast} from 'sonner'



export default function Product(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;

  const onAddProduct = () => {
    navigate("/Product/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false)
  };
  const [isRed, setIsRed] = useState(true)

  const showToast = (message, isRed) => {
    setIsRed(isRed);
    if(isRed){
      toast.error(message)
    }else{
      toast.success(message)
    }
  }
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      {/* <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      /> */}
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout}  />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Product
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
