import React, { useState } from 'react'
import { Toaster, toast } from "sonner";
import { Sidebar } from "./Sidebar";
import { signOut, decodeToken } from "../../Services/auth";
export default function Salesman(props) {
    const { changeLogin } = props;
    const [isRed, setIsRed] = useState(false)

    const logout = () => {
        signOut();
        changeLogin(false);
      };
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      />
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
            //   onClick={openModal}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Salesman
            </button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-white px-8 py-2">Salesman</p>
      </div>
    </div>
  )
}
