import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { getAlladdress } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";

export default function BuyerShippingandPayment() {
  const [isRed, setIsRed] = useState(true);
  const [optId, setOptId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getAlladdress(email).then(resp=>{
        console.log(resp);
        setAddresses(resp)
    }).catch(err=>{
        console.log(err);
    })
  }, []);

  const handleBack = () => {
    navigate("/Home");
  };

  const optionId = location?.state?.optionId;
  if (optionId) setOptId(optionId);
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
              onClick={handleBack}
              className="text-2xl me-4 hover:text-blue-500"
            >
              <IoMdArrowRoundBack />
            </button>
            <h2 className="text-xl font-semibold">Shipping Details</h2>
          </div>
          <div className="flex flex-col gap-4">addresses here</div>
        </div>
        <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          </div>
          <div>
            {/* <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter offer code"
                    value={offerCode}
                    onChange={(e) => setOfferCode(e.target.value)}
                    readOnly={offerEditable}
                    className="p-2 w-2/3 border rounded"
                  />
                  <button
                    onClick={onApplyOffer}
                    disabled={offerCode.length < 3 || offerEditable}
                    className={`py-2 bg-blue-500 w-1/3 text-white font-bold rounded  ${
                      offerCode.length < 3 || offerEditable
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }`}
                  >
                    Apply Offer
                  </button>
                </div> */}
            <button
              className="mt-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full"
              //   onClick={handleAddShipping}
            >
              Add Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
