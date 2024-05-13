import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { signOut } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import { getAdminSellingCompanies } from "../../Services/product";

export default function AdminProduct() {
  const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  const [adminSellingCompanies, setAdminSellingCompanies] = useState([]);

  useEffect(() => {
    getAdminSellingCompanies()
      .then((data) => setAdminSellingCompanies(data))
      .catch((err) => console.log(err));
  }, []);

  const viewCompany = (index) => {
    const company = adminSellingCompanies[index]
    const email = company.companyEmail
    navigate(`/admin/Product/${index}`,{state:{email:email}})
  }

  return (
    <>
      <div className="p-5 pb-6 flex justify-between">
        <h1 className=" ms-16 text-3xl font-semibold text-white">
          Products - Admin Selling Companies
        </h1>
      </div>
      <hr />
      <div className="ms-16 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {adminSellingCompanies.map((company, index) => (
            <div
              key={company.id}
              className=" bg-teal-300 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  className="w-full h-32 sm:h-48 object-cover"
                  src="/pharma.jpg" // Placeholder image, replace URL with real image path if available
                  alt="Company"
                />
                <div className="absolute top-0 right-0 bg-yellow-400 text-white p-2 text-xs uppercase font-bold rounded-bl-lg">
                  {company.companyType }{" "}
                  {/* Example condition, adjust according to your data */}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{company.companyName}</h3>
                <p className="text-sm text-gray-500">{company.companyEmail}</p>
                <div className="text-sm mt-2">
                  
                  
                </div>
              <button onClick={()=>viewCompany(index)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Sidebar changeLogin={onlogout} />
    </>
  );
}
