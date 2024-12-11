import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { signOut } from "../../Services/auth";

import { useNavigate } from "react-router-dom";

export default function AdminLanding() {
  const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  return (
    <>
      <div className=" p-4 py-3 flex justify-between ms-12 bg-cyan-300">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold text-cyan-700">Medico </h1>
          <span className="text-2xl font-bold text-slate-600">admin</span>{" "}
        </div>
      </div>
      <hr />
      <AdminSidebar changeLogin={onlogout} />
    </>
  );
}
