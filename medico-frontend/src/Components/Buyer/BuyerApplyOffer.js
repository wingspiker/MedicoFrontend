import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { cart } from "../../Services/cart";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getOffersByEmail } from "../../Services/offer";
import { IoMdClose } from "react-icons/io";

export default function BuyerApplyOffer() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isRed, setIsRed] = useState(true);
  const [offers, setOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const ownerEmail = location?.state?.ownerEmail;

  useEffect(() => {
    getOffersByEmail(ownerEmail)
      .then((resp) => {
        setOffers(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ownerEmail]);

  const handleBack = () => {
    navigate("/Home/Cart");
  };

  const openModal = (offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
              onClick={handleBack}
              className="text-2xl me-4 hover:text-blue-500"
            >
              <IoMdArrowRoundBack />
            </button>
            <h2 className="text-xl font-semibold">Available Offers</h2>
          </div>
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div className="flex gap-4">
                <img
                  src={offer.offerPhoto}
                  alt={offer.offerName}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h5 className="text-lg font-bold text-orange-600">
                    {offer.offerName}
                  </h5>
                  <p>{offer.offerDescription}</p>
                  <p className="text-sm">
                    Promo Code:{" "}
                    <span
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {offer.offerCode}
                    </span>
                    {" | "}
                    Expiry:{" "}
                    <span
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {new Date(offer.expiryDate).toLocaleDateString()}
                    </span>
                  </p>
                  <button
                    onClick={() => openModal(offer)}
                    className="text-blue-500 hover:underline"
                  >
                    Offer Details
                  </button>
                </div>
              </div>
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
          </div>
          <button className="mt-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full">
            Add Shipping
          </button>
        </div>
      </div>
      import {IoMdClose} from 'react-icons/io'; // Import the close icon
      {modalOpen && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-2xl text-red-500 p-2"
            >
              <IoMdClose /> {/* Use the close icon here */}
            </button>
            <h3 className="text-lg font-bold">{selectedOffer.offerName}</h3>
            <p>
              <strong>Description:</strong> {selectedOffer.offerDescription}
            </p>
            <p>
              <strong>Expiry Date:</strong>
              {new Date(selectedOffer.expiryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Promo Code:</strong> {selectedOffer.offerCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
