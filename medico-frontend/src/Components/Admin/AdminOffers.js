import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { signOut } from "../../Services/auth";

import { useNavigate } from "react-router-dom";

export default function AdminOffers() {
  const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  return (
    <>
      <div className=" p-5 flex justify-between ms-12">
        <h1 className="text-3xl font-semibold text-white">Offers </h1>
        <button className="  cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2">
          Add Offers
        </button>
      </div>
      <hr />
      <Sidebar changeLogin={onlogout} />
    </>
  );
}
