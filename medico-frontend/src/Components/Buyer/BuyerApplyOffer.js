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
  const [disAmount, setDisAmount] = useState(0);
  const [optionId, setOptionId] = useState("");
  const [offerEditable, setOfferEditable] = useState(false);

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
      offerCode: offerCode.trim(),
      offerProducts,
      totalPrice,
    };

    applyOffer(email, applyOfferObj)
      .then((resp) => {
        console.log(resp);
        setOfferResponse(resp);
        setModalOpen(true);
        if (resp.discountOffer) {
          setDisAmount(resp.discountOffer.maximumDiscount);
          setOfferEditable(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setOfferResponse(err);
        setModalOpen(true);
      });
  };

  const handleAddShipping = () => {
    console.log(optionId);
    navigate('/Home/Checkout', {state:{optionId}})
  };

  const onChooseOptions = () => {
    setModalOpen(false);
    setOptionId(selectedProductId);
    setSelectedProductId("");
    setOfferEditable(true);
  };

  const cancleOffer = () => {
    setOfferCode("");
    setOptionId("");
    setOfferEditable(false);
  };

  const renderOfferDetails = () => {
    let x = offerResponse.response;
    if (!offerResponse) return null;

    const handleChange = (event) => {
      const optId = event.target.value;
      console.log(optId);
      setSelectedProductId(optId);
      // console.log(selectedProductId);
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
          {console.log(offerResponse.freeGoodsBenefits[0].articleOptions)}
          {offerResponse.freeGoodsBenefits[0].articleOptions.map((good) => (
            <div key={good.id} className="my-2">
              {/* {console.log("ppp")}
              {console.log(good.id)} */}
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="selectedGood"
                  value={good.id}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span>
                  {/* {good.articleOptions
                    .map((option) =>
                      option.articleWithQuantities[0].map(
                        (q) => q.article.articleName
                      )
                    )
                    .join(", ")} */}
                  {good.articleWithQuantities[0].article.articleName}
                </span>
              </label>
            </div>
          ))}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-300 disabled:bg-blue-300  text-white font-bold py-2 px-4 rounded"
            disabled={!selectedProductId}
            onClick={onChooseOptions}
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
            className="mt-4 bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-300 disabled:bg-blue-300  text-white font-bold py-2 px-4 rounded"
            disabled={!selectedProductId}
            onClick={onChooseOptions}
          >
            Choose
          </button>
        </div>
      );
    } else if (offerResponse?.response?.status === 500) {
      return (
        <div>
          <p>
            {offerResponse?.response?.data?.detail ?? "something went wrong"}
          </p>
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
            <div className="flex justify-between mb-2">
              <p>Total Discount:</p>
              <p>-₹ {Number(disAmount).toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between mb-2">
              <p>Payable Amount:</p>
              <p>₹ {Number(total - disAmount).toFixed(2)}</p>
            </div>

            {offerEditable && (
              <div className="flex relative justify-between mb-2 bg-green-300 p-2">
                <p>Offer {offerCode} Applied Successfully</p>
                <button
                  onClick={cancleOffer}
                  className="absolute top-0 right-0 text-2xl text-red-500 p-2"
                >
                  <IoMdClose />
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
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
            </div>
            <button
              className="mt-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded w-full"
              onClick={handleAddShipping}
            >
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
