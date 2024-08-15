import React, { useEffect, useState } from 'react';
import { decodeToken } from '../../Services/auth';
import { getSalesmanById } from '../../Services/salesman';

export default function SalesmanLanding() {
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
  // console.log(currSalesman);

  return (
    <div className="flex-1 ms-14">
      <div className="p-4 pt-3 flex justify-between gap-4">
        <h1 className="text-3xl font-semibold text-white mt-4">
          My Profile
        </h1>
      </div>
      <hr />
      <div className="p-2">
        <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Personal Information
          </h2>
          <div className="space-y-2">
            <div className="flex items-center text-white">
              <svg className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span>ID: {currSalesman?.salesmanId}</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 11H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2zM5 13h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" />
              </svg>
              <span>Name: {currSalesman?.firstName} {currSalesman?.lastName}</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 2v16h8V2H8z" />
              </svg>
              <span>Email: {currSalesman?.email}</span>
            </div>
            <div className="flex items-center text-white">
              <svg className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15.66V8.34C21 7.75 20.62 7.22 20.05 7.07l-7-2c-.38-.11-.78-.11-1.16 0l-7 2C3.38 7.22 3 7.75 3 8.34v7.32c0 .59.38 1.12.95 1.27l7 2c.18.05.37.08.55.08s.37-.03.55-.08l7-2c.57-.15.95-.68.95-1.27z" />
              </svg>
              <span>Mobile: {currSalesman?.mobileNumber}</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-4 mb-3">
            Assigned Talukas
          </h2>
          <ul className="mt-2 space-y-2">
            {currSalesman?.areasAssigned.map((area) => (
              <li key={area.id} className="flex items-center bg-gray-800 p-2 rounded-lg shadow w-fit">
                <svg className="h-4 w-4 text-orange-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V7.618a1 1 0 0 1 .553-.894L9 4"></path>
                  <path d="M15 4l5.447 2.724A1 1 0 0 1 21 7.618v8.764a1 1 0 0 1-.553.894L15 20"></path>
                  <path d="M9 4v16l6-3.382V7.618L9 4z"></path>
                </svg>
                <span className="text-white text-sm font-medium">
                  {area.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
