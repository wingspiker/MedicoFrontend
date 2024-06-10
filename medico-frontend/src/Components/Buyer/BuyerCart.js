import React from "react";
import Navbar from "./Navbar";

// Mock cart data, replace with your actual cart service data import
const cart = [
    {
        prodId: "100498bc-f9ec-439f-878f-9a57adb2fcac",
        batchId: "0350c7c4-9ce8-47ec-a2c4-b2853633a7c0",
        price: 1200,
        quantity: 3,
        productName: "Codistar DX Syrup",
        companyName: "Mankind Pharma Ltd",
        photoUrl: "https://medico-bucket-ahm.s3.ap-south-1.amazonaws.com/documents/9JI2AOSFJYIGGBMXC119H2O5GUA0T6RD_codistar.png"
    },
    {
        prodId: "8fd584db-f4ac-4c8c-99a8-7ab2a151e5da",
        batchId: "2d6cc539-48c1-44a9-a2a0-e43a5995c627",
        price: 1249,
        quantity: 4,
        productName: "asdTesting",
        companyName: "asdfghj",
        photoUrl: "https://medico-bucket-ahm.s3.ap-south-1.amazonaws.com/documents/GF0RPFEU9L16PCGQ5814EQBOBHBGPVMP_Banana_11_jpg.rf.188551ec3d51326e5562675d285d0e6a.jpg"
    }
];

export default function BuyerCart() {
  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="h-screen flex flex-col bg-gray-100 ">
      <Navbar />
      <div className="flex flex-1 p-6 gap-4">
        {/* Cart Items Column */}
        <div className="flex-1 overflow-y-auto pr-4 bg-white p-8  shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {cart.map((item) => (
            <div key={item.prodId} className="flex items-center justify-between p-8 border-b border-gray-200">
              <div className="flex items-center">
                <img src={item.photoUrl} alt={item.productName} className="w-20 h-20 mr-4 object-cover" />
                <div>
                  <h5 className="text-lg font-semibold">{item.productName}</h5>
                  <p className="text-sm text-gray-600">{item.companyName}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Price Breakdown Column */}
        <div className="w-64 bg-white shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Price Details</h3>
          <div>
            <div className="flex justify-between mb-2">
              <p>Total Items:</p>
              <p>{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Total Price:</p>
              <p>₹{total}</p>
            </div>
            {/* You can add more price details here */}
          </div>
        </div>
      </div>
    </div>
  );
}
