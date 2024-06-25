// import React, { useEffect, useState } from "react";
// import { Toaster } from "sonner";
// import Navbar from "./Navbar";
// import { cart } from "../../Services/cart";
// import { useLocation, useNavigate } from "react-router-dom";
// import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
// import { applyOffer, getOffersByEmail } from "../../Services/offer";
// import { decodeToken } from "../../Services/auth";

// export default function BuyerApplyOffer() {
//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const [isRed, setIsRed] = useState(true);
//   const [offers, setOffers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const [offerCode, setOfferCode] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const ownerEmail = location?.state?.ownerEmail;

//   useEffect(() => {
//     getOffersByEmail(ownerEmail)
//       .then((resp) => {
//         setOffers(resp);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [ownerEmail]);

//   const handleBack = () => {
//     navigate("/Home/Cart");
//   };

//   const user = decodeToken();
//   // console.log(user);

//   const keys = Object.keys(user);
//   const email = user[keys.find((k) => k.endsWith("emailaddress"))];

//   const openModal = (offer) => {
//     setSelectedOffer(offer);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const onApplyOffer = () => {
//     // console.log("Applying offer code:", offerCode);
//     // // Implement offer code application logic here

//     // console.log(cart);
//     const offerProducts = cart.map(c=>{
//       return {
//         productId:c.prodId,
//         batchId:c.batchId,
//         quantity:c.quantity,
//         price:c.price
//       }
//     });

//     let totalPrice = 0;

//     offerProducts.forEach(c=>{
//       totalPrice += c.totalPrice
//     });

//     const applyOfferObj = {
//       offerCode,
//       offerProducts,
//       totalPrice
//     }

//     applyOffer(email, applyOfferObj)
//     .then(resp=>{
//       console.log(resp);
//     })
//     .catch(err=>{
//       console.log(err);
//     })

//   };

//   return (
//     <div className="h-screen w-screen fixed flex flex-col bg-gray-100">
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: { color: `${isRed ? "red" : "green"}` },
//         }}
//       />
//       <Navbar />
//       <div className="flex flex-1 p-6 gap-4">
//         <div className="flex-1 overflow-y-auto pr-4 bg-white p-8 shadow-md h-[88vh] overflow-auto no-scrollbar">
//           <div className="flex items-center mb-4">
//             <button
//               onClick={handleBack}
//               className="text-2xl me-4 hover:text-blue-500"
//             >
//               <IoMdArrowRoundBack />
//             </button>
//             <h2 className="text-xl font-semibold">Available Offers</h2>
//           </div>
//           <div className="flex flex-col gap-4">
//             {offers.map((offer) => (
//               <div
//                 key={offer.id}
//                 className="p-4 bg-slate-100 shadow rounded-lg flex justify-between items-center"
//               >
//                 <div className="flex gap-4">
//                   <img
//                     src={offer.offerPhoto}
//                     alt={offer.offerName}
//                     className="w-20 h-20 object-cover"
//                   />
//                   <div>
//                     <h5 className="text-lg font-bold text-orange-600">
//                       {offer.offerName}
//                     </h5>
//                     <p>{offer.offerDescription}</p>
//                     <p className="text-sm">
//                       Promo Code:{" "}
//                       <span
//                         style={{
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                         }}
//                       >
//                         {offer.offerCode}
//                       </span>
//                       {" | "}
//                       Expiry:{" "}
//                       <span
//                         style={{
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                         }}
//                       >
//                         {new Date(offer.expiryDate).toLocaleDateString()}
//                       </span>
//                     </p>
//                     <button
//                       onClick={() => openModal(offer)}
//                       className="text-blue-500 hover:underline"
//                     >
//                       Offer Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Price Details</h3>
//             <div className="flex justify-between mb-2">
//               <p>Total Price:</p>
//               <p>₹ {Number(total).toFixed(2)}</p>
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter offer code"
//                 value={offerCode}
//                 onChange={(e) => setOfferCode(e.target.value)}
//                 className="p-2 w-2/3 border rounded"
//               />
//               <button
//                 onClick={onApplyOffer}
//                 disabled={offerCode.length < 3} // Disable the button if less than 3 characters are entered
//                 className={`py-2 bg-blue-500 w-1/3 text-white font-bold rounded ${
//                   offerCode.length < 3
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-blue-600"
//                 }`}
//               >
//                 Apply Offer
//               </button>
//             </div>
//             <button className="mt-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full">
//               Add Shipping
//             </button>
//           </div>
//         </div>
//       </div>
//       {modalOpen && selectedOffer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 text-2xl text-red-500 p-2"
//             >
//               <IoMdClose />
//             </button>
//             <h3 className="text-lg font-bold">{selectedOffer.offerName}</h3>
//             <p>
//               <strong>Description:</strong> {selectedOffer.offerDescription}
//             </p>
//             <p>
//               <strong>Expiry Date:</strong>{" "}
//               {new Date(selectedOffer.expiryDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Promo Code:</strong> {selectedOffer.offerCode}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { cart } from "../../Services/cart";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { applyOffer, getOffersByEmail } from "../../Services/offer";
import { decodeToken } from "../../Services/auth";

export default function BuyerApplyOffer() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isRed, setIsRed] = useState(true);
  const [offers, setOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [offerResponse, setOfferResponse] = useState(null);

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

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  const openModal = (offer) => {
    setSelectedOffer(offer);
    setSelectedProductId(""); // Reset the selection on opening a new modal
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProductId(""); // Clear selection on modal close
  };

  const onApplyOffer = () => {
    const offerProducts = cart.map((c) => ({
      productId: c.prodId,
      batchId: c.batchId,
      quantity: c.quantity,
      price: c.price,
    }));

    let totalPrice = offerProducts.reduce(
      (acc, c) => acc + c.price * c.quantity,
      0
    );

    const applyOfferObj = {
      offerCode,
      offerProducts,
      totalPrice,
    };

    applyOffer(email, applyOfferObj)
      .then((resp) => {
        setOfferResponse(resp);
        setModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderOfferDetails = () => {
    if (!offerResponse) return null;

    const handleChange = (event) => {
      setSelectedProductId(event.target.value);
    };

    if (offerResponse.discountOffer) {
      return (
        <div>
          <h3>Congratulations! You got a discount!</h3>
          <p>Discount Amount: {offerResponse.discountOffer.maximumDiscount}</p>
        </div>
      );
    } else if (offerResponse.freeGoodsBenefits) {
      return (
        <div>
          <h3>Select your free goods:</h3>
          {offerResponse.freeGoodsBenefits.map((good) => (
            <div key={good.id} className="my-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="selectedGood"
                  value={good.id}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span>
                  {good.articleOptions
                    .map((option) =>
                      option.articleWithQuantities.map(
                        (q) => q.article.articleName
                      )
                    )
                    .join(", ")}
                </span>
              </label>
            </div>
          ))}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedProductId}
          >
            Choose
          </button>
        </div>
      );
    } else if (offerResponse.freeProductsBenefits) {
      return (
        <div>
          <h3>Select your free products:</h3>
          {offerResponse.freeProductsBenefits.map((product) =>
            product.productOptions.map((option) => (
              <div key={option.id} className="my-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="selectedProduct"
                    value={option.id}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span>
                    {option.productWithQuantities
                      .map((q) => q.productDetails.drugName)
                      .join(", ")}
                  </span>
                </label>
              </div>
            ))
          )}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedProductId}
          >
            Choose
          </button>
        </div>
      );
    }

    return <div>No specific offer details available.</div>;
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
          <div className="flex flex-col gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 bg-slate-100 shadow rounded-lg flex justify-between items-center"
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
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {offer.offerCode}
                      </span>
                      {" | "}Expiry:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
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
        </div>
        <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Price Details</h3>
            <div className="flex justify-between mb-2">
              <p>Total Price:</p>
              <p>₹ {Number(total).toFixed(2)}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter offer code"
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value)}
                className="p-2 w-2/3 border rounded"
              />
              <button
                onClick={onApplyOffer}
                disabled={offerCode.length < 3}
                className={`py-2 bg-blue-500 w-1/3 text-white font-bold rounded ${
                  offerCode.length < 3
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Apply Offer
              </button>
            </div>
            <button className="mt-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full">
              Add Shipping
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-2xl text-red-500 p-2"
            >
              <IoMdClose />
            </button>
            {renderOfferDetails()}
          </div>
        </div>
      )}
    </div>
  );
}
