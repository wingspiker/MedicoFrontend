import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";
import { FaShoppingCart } from "react-icons/fa";
import {
  EffectivePriceCalculationTypeEnum,
  prescriptionEnum,
} from "../../Models/enums.model";
import { addProductToCart } from "../../Services/cart";

export default function BuyerProductDetails() {
  const location = useLocation();
  const pid = location.state.pid;
  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => parseInt(prevQuantity, 10) + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, parseInt(prevQuantity, 10) - 1));
  };

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getProductDetails(email, pid)
      .then((resp) => {
        // console.log('kkkkkkkkkkk', resp);
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

  const handleAddtocart = () => {
    console.log(product);
    console.log(selectedBatchId);

    const selectedBatch = product.productBatches.find(
      (b) => b.id === selectedBatchId
    );

    console.log(selectedBatch);
    const cartObj = {
      prodId: product.id,
      batchId: selectedBatchId,
      price: selectedBatch.price,
      quantity,
      productName: product.drugName,
      companyName: product.manufacturerName,
      photoUrl: product.photoUrl,
      ownerEmail:owner.email,
      ownerName:owner.name,
    };

    addProductToCart(cartObj);

    setQuantity(1)
    setSelectedBatchId('')
  };


  return (
    <div className="h-screen w-screen fixed flex flex-col bg-white">
      <Navbar />

      {product && owner && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex justify-center items-center">
              <img
                src={product.photoUrl}
                alt={product.drugName}
                className="w-full h-auto max-w-sm"
              />
            </div>
            <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-12 h-[88vh] overflow-auto no-scrollbar">
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
                <div className="flex space-x-4">
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
                        {`Expiry Date - ${batch.manufacturingDate} - Price ₹${batch.price}`}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      disabled={quantity === 1}
                      className="bg-red-300 disabled:hover:bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      placeholder="Qty"
                      min="1"
                      className="block w-16 text-center bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-none shadow leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleAddtocart}
                  className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-md ${
                    !selectedBatchId
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                  disabled={!selectedBatchId}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to cart
                </button>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <ul className="list-disc ml-5 mt-2 text-gray-700">
                  <span className=" text-cyan-700 font-semibold"></span>
                  <li>
                    Manufacturer:{" "}
                    <span className=" text-cyan-700 font-semibold">
                      {product.manufacturerName}
                    </span>{" "}
                  </li>
                  {/* <li>License No: {product.licenseNo}</li> */}
                  <li>
                    Prescription:{" "}
                    <span className=" text-cyan-700 font-semibold">
                      {
                        prescriptionEnum[
                          Object.keys(prescriptionEnum)[product.prescription]
                        ]
                      }{" "}
                    </span>
                  </li>
                  <li>
                    Division:
                    <span className=" text-cyan-700 font-semibold">
                      {" "}
                      {product.division}{" "}
                    </span>
                  </li>
                  <li>
                    Effective Price Calculation Type:{" "}
                    {/* {product.effectivePriceCalculationType} */}
                    <span className=" text-cyan-700 font-semibold">
                      {
                        EffectivePriceCalculationTypeEnum[
                          Object.keys(EffectivePriceCalculationTypeEnum)[
                            product.effectivePriceCalculationType
                          ]
                        ]
                      }{" "}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Owner Details</h2>
                <ul className="list-disc ml-5 mt-2 text-gray-700">
                  <li>
                    Name:
                    <span className=" text-cyan-700 font-semibold">
                      {" "}
                      {owner.name}
                    </span>{" "}
                  </li>
                  <li>
                    Email:
                    <span className=" text-cyan-700 font-semibold">
                      {" "}
                      {owner.email}
                    </span>{" "}
                  </li>
                  <li>
                    Type:
                    <span className=" text-cyan-700 font-semibold">
                      {" "}
                      {owner.ownerType}
                    </span>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
