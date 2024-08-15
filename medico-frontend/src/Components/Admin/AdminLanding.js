import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import {
  signOut,
} from "../../Services/auth";

import { useNavigate } from "react-router-dom";

export default function AdminLanding() {
    const navigate = useNavigate();

    const onlogout = () => {
      signOut();
      navigate("/admin");
    };
  
    return (
      <>
        <div className=" p-4 py-3 flex justify-between ms-12">
        <h1 className="text-3xl font-bold text-white">Medico <p className=" text-red-500 text-xs text-right -me-6 -mt-2">Admin</p> </h1>
          
        </div>
        <hr />
        <AdminSidebar changeLogin={onlogout} />
      </>
    );
}
