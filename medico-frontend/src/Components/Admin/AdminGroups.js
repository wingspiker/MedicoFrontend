import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { signOut } from "../../Services/auth";

import { useNavigate } from "react-router-dom";

export default function AdminGroups(props) {
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/admin");
  };

  const { changeLogin } = props;
  const onAddGroup = () => {
    navigate("/admin/Groups/add");
  };

  return (
    <>
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
          <div className=" p-8">Hello Groups</div>
        </div>
      </div>
    </>
  );
}
