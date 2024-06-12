import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { cart } from "../../Services/cart";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getOffersByEmail } from "../../Services/offer";

export default function BuyerApplyOffer() {
  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isRed, setIsRed] = useState(true);
  const [offers, setOffers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const ownerEmail = location?.state?.ownerEmail;

  useEffect(() => {
    // console.log('rrrr');
    getOffersByEmail(ownerEmail)
    .then(resp=>{
        setOffers(resp);
    })
    .catch(err=>{
        console.log(err);
    })
  }, [])

  const handleBack = () => {
    navigate('/Home/Cart')
  };
  return (
    <div className="h-screen w-screen fixed flex flex-col bg-gray-100">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      <Navbar />
      <div className="flex flex-1 p-6 gap-4">
        <div className="flex-1 overflow-y-auto pr-4 bg-white p-8 shadow-md h-[88vh] overflow-auto no-scrollbar">
          <div className="flex items-center mb-4">
            <button
              onClick={() => handleBack()}
              className=" text-2xl me-4 hover:text-blue-500"
            >
              {/* Arrow icon as content */}
              <IoMdArrowRoundBack />
            </button>

            <h2 className="text-xl font-semibold">Available Offers</h2>
          </div>
          {console.log(offers)}
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
          <button className="mt-4 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded w-full">
            Add Shipping
          </button>
        </div>
      </div>
    </div>
  );
}
