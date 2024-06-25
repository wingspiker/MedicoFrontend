import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "./Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderAddress, getAlladdress } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import { handleImageUpload } from "../../Services/upload";

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

  const handleBack = () => {
    navigate("/Home");
  };

  const handleAddAddress = () => {
    setShowModal(true);
  };

  const handleModalClose = (address) => {
    if (address) {
      setAddresses([...addresses, address]);
    }
    setShowModal(false);
    setNewAddress({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      taluka: "",
      pinCode: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newAddress.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!newAddress.addressLine2)
      newErrors.addressLine2 = "Address Line 2 is required";
    if (!newAddress.city) newErrors.city = "City is required";
    if (!newAddress.state) newErrors.state = "State is required";
    if (!newAddress.country) newErrors.country = "Country is required";
    if (!newAddress.pinCode) newErrors.pinCode = "Pin Code is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const address = { ...newAddress, talukaId: 1 }; // Mock new address
    console.log(address);

    addOrderAddress(email, address)
      .then((resp) => {
        handleModalClose(address); // Close the modal and pass the new address back to the parent component
        setIsRed(false);
        toast.success("Address added successfully");
        setFlag((f) => !f);
      })
      .catch((err) => {
        console.log(err);
        handleModalClose(address);
        setIsRed(true);
        toast.error("Something went wrong, please try again later");
      });
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handlePaymentDetailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setPaymentDetail(file);
      handleImageUpload(e)
        .then((resp) => {
          // console.log(resp.data);
          setpayment(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onConfirmOrder = () => {
    if (!selectedAddressId) {
      setIsRed(true);
      toast.error("Please Select an Address");
      return;
    }
    if (!payment) {
      setIsRed(true);
      toast.error("Please upload payment details");
    }

    if (selectedAddressId && payment) {
      const optionId = location?.state?.optionId;
      setIsRed(false);
      toast.success("sab sahi hai");
    }
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
            <h2 className="text-xl font-semibold">Shipping Details</h2>
          </div>
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-md shadow-sm flex items-center"
              >
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddressId === address.id}
                  onChange={() => handleAddressSelect(address.id)}
                  className="mr-4"
                />
                <div>
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.country} - {address.pinCode}
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddAddress}
              className="mt-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-full"
            >
              Add Address
            </button>
          </div>
        </div>
        <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handlePaymentDetailChange}
              className="mb-4"
            />
            {payment && (
              <p className="text-green-500 text-sm">uploaded successfully</p>
            )}
          </div>
          <div>
            <button
              className="mt-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold rounded w-full"
              disabled={!payment} // Disable button until a file is uploaded
              onClick={onConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-1/2">
            <h2 className="text-2xl mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  name="addressLine1"
                  value={newAddress.addressLine1}
                  onChange={handleChange}
                  placeholder="Address Line 1"
                  className="border p-2 rounded w-full"
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm">{errors.addressLine1}</p>
                )}
              </div>
              <div>
                <input
                  name="addressLine2"
                  value={newAddress.addressLine2}
                  onChange={handleChange}
                  placeholder="Address Line 2"
                  className="border p-2 rounded w-full"
                />
                {errors.addressLine2 && (
                  <p className="text-red-500 text-sm">{errors.addressLine2}</p>
                )}
              </div>
              <div>
                <input
                  name="city"
                  value={newAddress.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border p-2 rounded w-full"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div>
                <input
                  name="state"
                  value={newAddress.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border p-2 rounded w-full"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  name="country"
                  value={newAddress.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border p-2 rounded w-full"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
              <div>
                <input
                  name="pinCode"
                  value={newAddress.pinCode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className="border p-2 rounded w-full"
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm">{errors.pinCode}</p>
                )}
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => handleModalClose(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
