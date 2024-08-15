import React, { useEffect, useState } from "react";
import { decodeToken } from "../../Services/auth";
import { getSalesmanById } from "../../Services/salesman";

export default function SalesmanCompany() {
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

  return (
    <div className="flex-1 ms-14">
      <div className="p-4 pt-3 flex justify-between gap-4">
        <h1 className="text-3xl font-semibold text-white mt-4">My Company</h1>
      </div>
      <hr />
      <div className="p-2">
        <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg">
          {currSalesman && currSalesman.ownerDetails && (
            <div>
              <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                Company Information
              </h2>
              <div className="space-y-4">
                <p className="text-white">
                  <span className="text-gray-400">Name:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.name}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">Email:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.companyEmail}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">Type:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.companyType === 0
                      ? "Pharmaceutical"
                      : "Other"}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">GST Number:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.gstNumber}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">License Number:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.licenseNumber}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">PAN Number:</span>{" "}
                  <span className="font-bold">
                    {currSalesman.ownerDetails.company.panNumber}
                  </span>
                </p>
                <p className="text-white">
                  <span className="text-gray-400">Address:</span>{" "}
                  <span className="font-bold">{`${currSalesman.ownerDetails.company.address1}, ${currSalesman.ownerDetails.company.address2}`}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
