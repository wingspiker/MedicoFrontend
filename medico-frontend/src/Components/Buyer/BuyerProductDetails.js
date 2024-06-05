// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { getProductDetails } from "../../Services/buyer";
// import { decodeToken } from "../../Services/auth";
// import Navbar from "./Navbar";

// export default function BuyerProductDetails() {
//   const location = useLocation();
//   const pid = location.state.pid;
//   // console.log(pid);
//   const [product, setProduct] = useState(null);
//   const [owner, setOwner] = useState(null);

//   const user = decodeToken();
//   const keys = Object.keys(user);
//   const email = user[keys.find((k) => k.endsWith("emailaddress"))];

//   useEffect(() => {
//     getProductDetails(email, pid)
//       .then((resp) => {
//         setProduct(resp.productDetails);
//         setOwner(resp.ownerDetails);
//       })
//       .then((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="h-screen flex flex-col bg-white">
//       <Navbar />
//       {console.log(product)}
//       {console.log(owner)}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";
import { FaShoppingCart } from "react-icons/fa";

export default function BuyerProductDetails() {
  const location = useLocation();
  const pid = location.state.pid;
  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState("");

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getProductDetails(email, pid)
      .then((resp) => {
        setProduct(resp.productDetails);
        setOwner(resp.ownerDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBatchChange = (event) => {
    setSelectedBatchId(event.target.value);
  };

  if (!product || !owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={product.photoUrl}
              alt={product.drugName}
              className="w-full h-auto max-w-sm"
            />
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-12">
            <h1 className="text-3xl font-bold">{product.drugName}</h1>
            <p className="text-lg text-gray-700">{product.brandName}</p>
            <p className="text-xl font-semibold text-red-600 mt-4">
              ₹{product.sellingPrice}
            </p>
            <p className="text-gray-500 line-through">₹{product.mrp}</p>
            <p className="mt-4">{product.contents}</p>
            <div className="mt-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productBatch"
              >
                Select Batch
              </label>
              <select
                id="productBatch"
                value={selectedBatchId}
                onChange={handleBatchChange}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select batch
                </option>
                {product.productBatches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {`${batch.manufacturingDate} - ₹${batch.price}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <button
                className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-md ${
                  !selectedBatchId
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={!selectedBatchId}
              >
                <FaShoppingCart className="mr-2" />
                Buy Now
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Product Details</h2>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>Manufacturer: {product.manufacturerName}</li>
                <li>License No: {product.licenseNo}</li>
                <li>
                  Prescription:{" "}
                  {product.prescription ? "Required" : "Not Required"}
                </li>
                <li>Division: {product.division}</li>
                <li>
                  Effective Price Calculation Type:{" "}
                  {product.effectivePriceCalculationType}
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Owner Details</h2>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>Name: {owner.name}</li>
                <li>Email: {owner.email}</li>
                <li>Type: {owner.ownerType}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
