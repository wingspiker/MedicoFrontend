import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { signOut } from "../../Services/auth";
import { decodeToken } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../../Services/group";

export default function AdminGroups(props) {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const logout = () => {
    signOut();
    navigate("/admin");
  };

  const { changeLogin } = props;
  const onAddGroup = () => {
    navigate("/admin/Groups/add");
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getGroups(email)
      .then((g) => {
        setGroups(g);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex h-screen bg-cyan-900 text-white">
        <Sidebar changeLogin={logout} />
        <div className="flex-1 ms-14">
          <div>
            <div className=" p-5 flex justify-end gap-4">
              <button
                onClick={onAddGroup}
                className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
              >
                Add Group
              </button>
            </div>
            <hr></hr>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white text-black rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-2">{group.name}</h2>
                <p className="text-gray-700">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p></p>
    </>
  );
}
