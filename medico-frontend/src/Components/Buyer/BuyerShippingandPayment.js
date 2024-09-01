import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "./Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrderAddress,
  addPayment,
  getAlladdress,
} from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import { handleImageUpload } from "../../Services/upload";
import Loader from "../../Loader";
import { emptyCart } from "../../Services/cart";

export default function BuyerShippingandPayment() {
  const [isRed, setIsRed] = useState(true);
  const [flag, setFlag] = useState(true);
  const [optId, setOptId] = useState(null);
  const [payment, setpayment] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State to track selected address
  const [paymentDetail, setPaymentDetail] = useState(null); // State to track payment detail upload
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    taluka: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({}); // State to track form errors
  const [orderSummary, setOrderSummary] = useState(null); // State to track form errors
  const [isLoading, setIsloading] = useState(false); // State to track form errors

  const navigate = useNavigate();
  const location = useLocation();

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getAlladdress(email)
      .then((resp) => {
        console.log(resp);
        setAddresses(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      setOrderSummary(location.state?.orderResponse);
    }
  }, []);

  const handleBack = () => {
    navigate("/Home");
  };

  const handlePaymentDetailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(e)
        .then((resp) => {
          setpayment(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onConfirmPayment = () => {
    if (!payment) {
      setIsRed(true);
      toast.error("Payment proof not uploaded", { style: { color: "red" } });
      return;
    }
    const paymentObj = {
      orderId: orderSummary.id,
      paymentDetails: {
        paymentMethod: "UPI",
        amount: orderSummary.totalAmount,
        paymentScreenshot: payment,
      },
    };

    setIsloading(true);
    addPayment(paymentObj)
      .then((resp) => {
        console.log(resp);
        setIsloading(false);
        setIsRed(false);
        emptyCart();
        toast.success("Order Created Successfully", { style: { color: "green" } });
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };

  return (
    <div className="h-screen w-screen fixed flex flex-col bg-gray-100">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: isRed ? "red" : "green" },
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
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>
          <div>
            {orderSummary ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <p>
                  Order Date:{" "}
                  {new Date(orderSummary.orderDate).toLocaleString()}
                </p>
                <p>Total Amount: ₹{orderSummary.totalAmount}</p>

                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <p>
                  {orderSummary.orderAddress.addressLine1},{" "}
                  {orderSummary.orderAddress.addressLine2}
                </p>
                <p>
                  {orderSummary.orderAddress.city},{" "}
                  {orderSummary.orderAddress.state},{" "}
                  {orderSummary.orderAddress.pinCode}
                </p>
                <p>{orderSummary.orderAddress.country}</p>

                <h3 className="text-lg font-semibold">Items Ordered</h3>
                {orderSummary.products.map((product, index) => (
                  <div key={index} className="p-2 border-b">
                    <p>Product ID: {product.productId}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                ))}

                {orderSummary.appliedOffer && (
                  <div>
                    <h3 className="text-lg font-semibold">Applied Offer</h3>
                    <p>Offer Name: {orderSummary.appliedOffer.offerName}</p>
                    <p>
                      Description: {orderSummary.appliedOffer.offerDescription}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p>No order details available.</p>
            )}
          </div>
        </div>
        <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
            <p className=" mb-2">
              Total payable amount{" "}
              {orderSummary && (
                <span className=" font-bold">
                  ₹ {orderSummary.totalAmount.toFixed(2)}/-
                </span>
              )}{" "}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePaymentDetailChange}
              className="mb-4"
            />
            {payment && (
              <p className="text-green-500 text-sm">Uploaded successfully</p>
            )}
          </div>
          <div>
            <button
              className="mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-bold rounded w-full"
              disabled={!payment}
              onClick={onConfirmPayment}
            >
              {isLoading ? <Loader /> : "Confirm Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
