import React, { useEffect, useState } from "react";
import { decodeToken } from "../../Services/auth";
import { getSalesmanById } from "../../Services/salesman";

export default function SalesmanSettings() {
  const [currSalesman, setCurrSalesman] = useState(null);

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getSalesmanById(email)
      .then((resp) => {
        setCurrSalesman(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleResetPassword = () => {
    // Add logic to handle password reset
    console.log("Reset password clicked");
  };

  return (
    <div className="flex-1 ms-14">
      <div className="p-1 mb-1 mx-2 flex justify-between gap-4">
        <h1 className="text-3xl font-semibold text-white mt-4">
          Settings
        </h1>
      </div>
      <hr />
      <div className="p-2">
        <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <span className="text-blue-400 mr-2">&#9679;</span>
              <span className="font-semibold">ID:</span> <span className="ml-2">{currSalesman?.salesmanId}</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-green-400 mr-2">&#9679;</span>
              <span className="font-semibold">Name:</span> <span className="ml-2">{currSalesman?.firstName} {currSalesman?.lastName}</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-red-400 mr-2">&#9679;</span>
              <span className="font-semibold">Email:</span> <span className="ml-2">{currSalesman?.email}</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-yellow-400 mr-2">&#9679;</span>
              <span className="font-semibold">Mobile:</span> <span className="ml-2">{currSalesman?.mobileNumber}</span>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleResetPassword}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
