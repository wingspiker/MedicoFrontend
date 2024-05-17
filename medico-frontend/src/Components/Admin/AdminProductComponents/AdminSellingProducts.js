import React, { useState, useEffect } from "react";
import { Sidebar } from "../Sidebar";
import { signOut } from "../../../Services/auth";
import { useNavigate } from "react-router-dom";
import { getCompanyProducts } from "../../../Services/product";
import { useLocation } from "react-router-dom";
import { prescriptionEnum } from "../../../Models/enums.model";
import { useParams } from 'react-router-dom';

export default function AdminSellingProducts() {
  const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  const location = useLocation();

  // Access state object from location
  const email = location.state ? location.state.email : null;

  const [companyProducts, setCompanyProducts] = useState([]);

  useEffect(() => {
    if (email) {
      getCompanyProducts(email).then((p) => {
        setCompanyProducts(p);
      });
    }
  }, [email]);
  const { id } = useParams();

  const handleAddGroupClick = (product) => {
    console.log(product);
    navigate(`/admin/Product/${id}/AddGroups`,{state:{pid:product.id,step:2,sp:product.sellingPrice}})
  }

  return (
    <>
      <div className="p-5 pb-6 flex justify-between">
        <h1 className="ms-16 text-3xl font-semibold text-white">
          Products - Admin Selling Companies
        </h1>
      </div>
      <hr />
      <div className="ms-16 p-4 h-[88vh] overflow-auto no-scrollbar">
        <p className=" text-2xl text-white mb-4">Completed</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companyProducts.map((product, index) => product.isCompleted &&  (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={product.photoUrl}
                alt={product.brandName}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{product.brandName}</h2>
              <p className="text-gray-600">{product.drugName}</p>
              <p className="text-gray-800 font-bold">MRP: ₹ {product.mrp}</p>
              <p className="text-gray-800">
                Selling Price: ₹ {product.sellingPrice}
              </p>
              <p className="text-gray-600">
                Prescription:{" "}
                {
                  prescriptionEnum[
                    Object.keys(prescriptionEnum)[product.prescription]
                  ]
                }
              </p>
              {!product.isCompleted && (
                <button
                  onClick={() => handleAddGroupClick(product)}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Add Group
                </button>
              )}
            </div>
          ))}
        </div>

        <p className=" text-2xl text-white mb-4 mt-8">InComplete</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companyProducts.map((product, index) => product.isCompleted===false &&  (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={product.photoUrl}
                alt={product.brandName}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{product.brandName}</h2>
              <p className="text-gray-600">{product.drugName}</p>
              <p className="text-gray-800 font-bold">MRP: ₹ {product.mrp}</p>
              <p className="text-gray-800">
                Selling Price: ₹ {product.sellingPrice}
              </p>
              <p className="text-gray-600">
                Prescription:{" "}
                {
                  prescriptionEnum[
                    Object.keys(prescriptionEnum)[product.prescription]
                  ]
                }
              </p>
              {!product.isCompleted && (
                <button
                  onClick={() => handleAddGroupClick(product)}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Add Group
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Sidebar changeLogin={onlogout} />
    </>
  );
}
