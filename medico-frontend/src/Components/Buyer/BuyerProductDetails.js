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
    setQuantity(+e.target.value);
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
    // console.log(product);
    // console.log(selectedBatchId);

    const selectedBatch = product.productBatches.find(
      (b) => b.id === selectedBatchId
    );

    // console.log(selectedBatch);
    const cartObj = {
      prodId: product.id,
      batchId: selectedBatchId,
      price: selectedBatch.price,
      quantity,
      productName: product.drugName,
      companyName: product.manufacturerName,
      photoUrl: product.photoUrl,
      ownerEmail: owner.email,
      ownerName: owner.name,
    };

    addProductToCart(cartObj);

    setQuantity(1);
    setSelectedBatchId("");
  };

  return (
    <div className="min-h-screen w-screen  flex flex-col bg-white">
      <Navbar />
      <section className="px-32">
        {product && owner && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 flex justify-center items-center">
                <img
                  src={
                    product.photoUrl
                      ? product?.photoUrl
                      : "https://placehold.co/600x400"
                  }
                  alt={product?.drugName}
                  className="w-full h-auto max-w-sm"
                />
              </div>
              <div className="lg:w-1/2 mt-6 lg:mt-16 lg:pl-12 h-[88vh] overflow-auto no-scrollbar">
                <h1 className="text-3xl font-bold">{product.drugName}</h1>
                <p className="text-lg text-gray-700">{product.brandName}</p>

                <div className="my-4 bg-zinc-50 border rounded-2xl p-6 w-full">
                  <h2 className="text-lg font-medium text-zinc-500">
                    Contents
                  </h2>
                  <p className="text-sm">{product?.contents}</p>
                </div>
                <div className="border-2 rounded-2xl bg-emerald-50 py-2 px-4">
                  <div className=" text-3xl  flex  justify-start font-bold items-center gap-6 mt-4">
                    <p className="font-semibold text-green-600 ">
                      ₹{product?.sellingPrice}{" "}
                      <span className="text-zinc-400">MRP</span>
                    </p>
                    <p className="text-gray-500 line-through">₹{product.mrp}</p>
                  </div>
                  <p className="text-emerald-500">Inclusive of all taxes</p>
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
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8  rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline "
                      >
                        <option value="" disabled>
                          Select batch
                        </option>
                        {product?.productBatches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {`Expiry Date - ${batch.manufacturingDate} - Price ₹${batch.price}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-start items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        disabled={quantity === 1}
                        className="bg-red-300 disabled:hover:bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l-xl"
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
                        className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded-r-xl"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddtocart}
                      className={`flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl ${
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
                </div>

                <div className="mt-6">
                  <div className="bg-zinc-50 border shadow-sm rounded-2xl p-6 w-full">
                    <h2 className="text-lg font-medium text-zinc-500 border-b pb-2 mb-4">
                      Product Details
                    </h2>
                    <ul className="list-none text-gray-700 space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Manufacturer:</span>
                        <span className="text-cyan-700 font-semibold">
                          {product.manufacturerName}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Prescription:</span>
                        <span className="text-cyan-700 font-semibold">
                          {
                            prescriptionEnum[
                              Object.keys(prescriptionEnum)[
                                product.prescription
                              ]
                            ]
                          }
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Division:</span>
                        <span className="text-cyan-700 font-semibold">
                          {product.division}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">
                          Effective Price Calculation Type:
                        </span>
                        <span className="text-cyan-700 font-semibold">
                          {
                            EffectivePriceCalculationTypeEnum[
                              Object.keys(EffectivePriceCalculationTypeEnum)[
                                product.effectivePriceCalculationType
                              ]
                            ]
                          }
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-zinc-50  border rounded-2xl p-6 w-full mt-3">
                    <h2 className="text-lg font-medium text-zinc-500 border-b pb-2 mb-4">
                      Owner Details
                    </h2>
                    <ul className="list-none text-gray-700 space-y-2">
                      <li className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span className="text-cyan-700 font-semibold">
                          {owner.name}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span className="text-cyan-700 font-semibold truncate w-fit">
                          {owner.email}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span className="text-cyan-700 font-semibold">
                          {owner.ownerType}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
