import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { cart, deleteProductFromCart } from "../../Services/cart"; // Ensure you have a removeFromCart method in your cart service

export default function BuyerCart() {
  const [flag, setFlag] = useState(true);
  const [currCart, setCurrCart] = useState([]);

  useEffect(() => {
    setCurrCart(cart);
  }, [flag]);

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle item deletion
  const handleDelete = (prodId, batchId) => {
    deleteProductFromCart(prodId, batchId);
    setFlag((f) => !f);
  };

  const validateCompanyNames = () => {
    const companyName = currCart[0]?.companyName; // Get the companyName of the first item
    return currCart.every((item) => item.companyName === companyName);
  };

  const handleCheckout = () => {
    if (validateCompanyNames()) {
      // Proceed with checkout logic here
      console.log("Proceeding to checkout...");
    } else {
      alert(
        "All products must be from the same company to proceed to checkout."
      );
    }
  };

  return (
    <div className="h-screen w-screen fixed flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1 p-6 gap-4">
        <div className="flex-1 overflow-y-auto pr-4 bg-white p-8 shadow-md h-[88vh] overflow-auto no-scrollbar">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {currCart.map((item) => (
            <div
              key={item.prodId}
              className="flex items-center justify-between p-8 border-b border-gray-200 relative"
            >
              <div className="flex items-center">
                <img
                  src={item.photoUrl}
                  alt={item.productName}
                  className="w-20 h-20 mr-4 object-cover"
                />
                <div>
                  <h5 className="text-lg font-semibold">{item.productName}</h5>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleDelete(item.prodId, item.batchId)}
                  className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                >
                  Delete
                </button>
              </div>
              <span className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">
                {item.companyName}
              </span>
            </div>
          ))}
        </div>
        <div className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Price Details</h3>
            <div className="flex justify-between mb-2">
              <p>Total Price:</p>
              <p>₹ {Number(total).toFixed(2)}</p>
            </div>
            {/* Additional price details can be placed here */}
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
