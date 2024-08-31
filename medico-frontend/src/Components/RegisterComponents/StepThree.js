import React, { useEffect, useState } from "react";
import Subscription from "./Subscription";
import Modal from "react-modal";
import { getStates } from "../../Services/location";
import { setFormData } from "../../Services/auth";
import CustomButton from "../Global/Button";

const StepThree = (props) => {
  const {
    formData,
    handleChange,
    errors,
    nextStep,
    prevStep,
    states,
    districts,
    talukas,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: "Monthly Plan", price: "₹ 3000/month" },
    { id: 2, name: "Six Months Plan", price: "₹ 15,000/six months" },
    { id: 3, name: "Annual Plan", price: "₹ 25,000 Annually" },
  ];

  const handleSave = () => {
    if (selectedPlan) {
      // Do something with the selected plan
      console.log("Selected plan:", selectedPlan);
      setFormData({ ...formData, subscription: selectedPlan.id });
      // Close the modal
      setShowModal(false);
    }
  };

  return (
    <div className="text-center border rounded-xl bg-white relative">
      <div className=" relative">
        {/* <div className="text-black absolute left-0  top-10">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8.999 20.133a4.969 4.969 0 0 0 3.536-1.465l7.134-7.133a5.007 5.007 0 0 0-.001-7.072C18.723 3.52 17.467 3 16.132 3s-2.591.52-3.534 1.464l-7.134 7.134a5.009 5.009 0 0 0 0 7.072a4.97 4.97 0 0 0 3.535 1.463m5.013-14.255A2.979 2.979 0 0 1 16.132 5c.802 0 1.556.313 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892L11.12 8.77zm-7.134 7.134l2.828-2.828l4.242 4.243l-2.827 2.827c-1.133 1.133-3.11 1.132-4.243.001a3.005 3.005 0 0 1 0-4.243'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute left-10  top-9">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8.999 20.133a4.969 4.969 0 0 0 3.536-1.465l7.134-7.133a5.007 5.007 0 0 0-.001-7.072C18.723 3.52 17.467 3 16.132 3s-2.591.52-3.534 1.464l-7.134 7.134a5.009 5.009 0 0 0 0 7.072a4.97 4.97 0 0 0 3.535 1.463m5.013-14.255A2.979 2.979 0 0 1 16.132 5c.802 0 1.556.313 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892L11.12 8.77zm-7.134 7.134l2.828-2.828l4.242 4.243l-2.827 2.827c-1.133 1.133-3.11 1.132-4.243.001a3.005 3.005 0 0 1 0-4.243'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute left-10  top-0">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8.999 20.133a4.969 4.969 0 0 0 3.536-1.465l7.134-7.133a5.007 5.007 0 0 0-.001-7.072C18.723 3.52 17.467 3 16.132 3s-2.591.52-3.534 1.464l-7.134 7.134a5.009 5.009 0 0 0 0 7.072a4.97 4.97 0 0 0 3.535 1.463m5.013-14.255A2.979 2.979 0 0 1 16.132 5c.802 0 1.556.313 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892L11.12 8.77zm-7.134 7.134l2.828-2.828l4.242 4.243l-2.827 2.827c-1.133 1.133-3.11 1.132-4.243.001a3.005 3.005 0 0 1 0-4.243'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute left-0  top-0">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8.999 20.133a4.969 4.969 0 0 0 3.536-1.465l7.134-7.133a5.007 5.007 0 0 0-.001-7.072C18.723 3.52 17.467 3 16.132 3s-2.591.52-3.534 1.464l-7.134 7.134a5.009 5.009 0 0 0 0 7.072a4.97 4.97 0 0 0 3.535 1.463m5.013-14.255A2.979 2.979 0 0 1 16.132 5c.802 0 1.556.313 2.122.878a3.004 3.004 0 0 1 .001 4.243l-2.893 2.892L11.12 8.77zm-7.134 7.134l2.828-2.828l4.242 4.243l-2.827 2.827c-1.133 1.133-3.11 1.132-4.243.001a3.005 3.005 0 0 1 0-4.243'/%3E%3C/svg%3E" />
        </div> */}
        {/* <div className="text-black absolute right-3 top-4">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 14 14'%3E%3Cpath fill='none' stroke='%23001a66' stroke-linecap='round' stroke-linejoin='round' d='m1.532 8.384l-.221-1.97a1 1 0 0 1 .993-1.112h9.392a1 1 0 0 1 .993 1.112l-.221 1.97a3.998 3.998 0 0 1-1.966 3.012c.17.305.288.645.343 1.008a.748.748 0 0 1-.74.858h-6.21a.748.748 0 0 1-.74-.858c.055-.363.173-.703.342-1.008a3.998 3.998 0 0 1-1.965-3.012m5.937-3.103l2.373-3.72a1.198 1.198 0 0 1 1.644-.372v0c.569.355.736 1.107.37 1.67L10.281 5.28m-5.03 4.002H8.75M7 7.534v3.497'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute bottom-2 right-20">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 14 14'%3E%3Cpath fill='none' stroke='%235577dd' stroke-linecap='round' stroke-linejoin='round' d='m1.532 8.384l-.221-1.97a1 1 0 0 1 .993-1.112h9.392a1 1 0 0 1 .993 1.112l-.221 1.97a3.998 3.998 0 0 1-1.966 3.012c.17.305.288.645.343 1.008a.748.748 0 0 1-.74.858h-6.21a.748.748 0 0 1-.74-.858c.055-.363.173-.703.342-1.008a3.998 3.998 0 0 1-1.965-3.012m5.937-3.103l2.373-3.72a1.198 1.198 0 0 1 1.644-.372v0c.569.355.736 1.107.37 1.67L10.281 5.28m-5.03 4.002H8.75M7 7.534v3.497'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute bottom-4 right-14 top-1 ">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 14 14'%3E%3Cpath fill='none' stroke='%235577dd' stroke-linecap='round' stroke-linejoin='round' d='m1.532 8.384l-.221-1.97a1 1 0 0 1 .993-1.112h9.392a1 1 0 0 1 .993 1.112l-.221 1.97a3.998 3.998 0 0 1-1.966 3.012c.17.305.288.645.343 1.008a.748.748 0 0 1-.74.858h-6.21a.748.748 0 0 1-.74-.858c.055-.363.173-.703.342-1.008a3.998 3.998 0 0 1-1.965-3.012m5.937-3.103l2.373-3.72a1.198 1.198 0 0 1 1.644-.372v0c.569.355.736 1.107.37 1.67L10.281 5.28m-5.03 4.002H8.75M7 7.534v3.497'/%3E%3C/svg%3E" />
        </div>
        <div className="text-black absolute bottom-4 right-10">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 14 14'%3E%3Cpath fill='none' stroke='%23001a66' stroke-linecap='round' stroke-linejoin='round' d='m1.532 8.384l-.221-1.97a1 1 0 0 1 .993-1.112h9.392a1 1 0 0 1 .993 1.112l-.221 1.97a3.998 3.998 0 0 1-1.966 3.012c.17.305.288.645.343 1.008a.748.748 0 0 1-.74.858h-6.21a.748.748 0 0 1-.74-.858c.055-.363.173-.703.342-1.008a3.998 3.998 0 0 1-1.965-3.012m5.937-3.103l2.373-3.72a1.198 1.198 0 0 1 1.644-.372v0c.569.355.736 1.107.37 1.67L10.281 5.28m-5.03 4.002H8.75M7 7.534v3.497'/%3E%3C/svg%3E" />
        </div> */}
        <h1 className="text-3xl text-black mb-4 py-6 font-medium border-b-2">
          Company Basic Details
        </h1>
      </div>
      <div className="m-4 text-left ">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block text-black bg-white">
              Email Id
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className="w-full px-3 py-2 rounded-lg border text-gray-900 focus:outline-none bg-gray-300 focus:border-green-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block text-black bg-white">
              Company Email Id
            </label>
            <input
              type="text"
              name="companyEmail"
              placeholder="Email Id"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 focus:outline-none focus:border-green-500"
            />
            {errors.companyEmail && (
              <span className="text-red-500">{errors.companyEmail}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 ">
            <label htmlFor="email" className="block bg-white text-black">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.licenseNumber && (
              <span className="text-red-500">{errors.licenseNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              GST Number
            </label>
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.gstNumber && (
              <span className="text-red-500">{errors.gstNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Pan Card Number
            </label>
            <input
              type="text"
              name="panCardNumber"
              placeholder="Pan Card Number"
              value={formData.panCardNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.panCardNumber && (
              <span className="text-red-500">{errors.panCardNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.displayName && (
              <span className="text-red-500">{errors.displayName}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="state" className="block bg-white text-black">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-500">{errors.state}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="district" className="block bg-white text-black">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <span className="text-red-500">{errors.district}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="taluka" className="block bg-white text-black">
              Taluka
            </label>
            <select
              name="taluka"
              value={formData.taluka}
              disabled={!formData.district}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            >
              <option value="">Select Taluka</option>
              {talukas.map((taluka) => (
                <option key={taluka.id} value={taluka.name}>
                  {taluka.name}
                </option>
              ))}
            </select>
            {errors.taluka && (
              <span className="text-red-500">{errors.taluka}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Company Address 1
            </label>
            <input
              type="text"
              name="companyAddress1"
              placeholder="Company Address 1"
              value={formData.companyAddress1}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyAddress1 && (
              <span className="text-red-500">{errors.companyAddress1}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Company Address 2
            </label>
            <input
              type="text"
              name="companyAddress2"
              placeholder="Company Address 2"
              value={formData.companyAddress2}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyAddress2 && (
              <span className="text-red-500">{errors.companyAddress2}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.pincode && (
              <span className="text-red-500">{errors.pincode}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Drug License Number
            </label>
            <input
              type="text"
              name="drugLicenseNumber"
              placeholder="Drug License Number"
              value={formData.drugLicenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.drugLicenseNumber && (
              <span className="text-red-500">{errors.drugLicenseNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-white text-black">
              Whole Sales License Number
            </label>
            <input
              type="text"
              name="wholesaleLicenseNumber"
              placeholder="Whole Sales License Number"
              value={formData.wholesaleLicenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.wholesaleLicenseNumber && (
              <span className="text-red-500">
                {errors.wholesaleLicenseNumber}
              </span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="companyType" className="block bg-white text-black ">
              Company Type
            </label>
            <select
              name="companyType"
              id="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-900 rounded-lg  border border-gray-300 focus:outline-none focus:border-green-500"
            >
              <option value="" className="text-gray-900">
                Select Company Type
              </option>
              <option value="1" className="text-gray-900">
                Self Selling
              </option>
              <option value="0" className="text-gray-900">
                Company Selling
              </option>
            </select>
            {errors.companyType && (
              <span className="text-red-500">{errors.companyType}</span>
            )}
          </div>
          {formData.companyType === "1" && (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
              <label htmlFor="chargeType" className="block bg-white text-black">
                Charge Type
              </label>
              <select
                name="chargeType"
                id="chargeType"
                value={formData.chargeType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              >
                <option className="text-gray-900" value="">
                  Select Charge Type
                </option>
                <option value="1" className="text-gray-900">
                  Percentage
                </option>
                <option value="0" className="text-gray-900">
                  Subscription
                </option>
              </select>
              {errors.chargeType && (
                <span className="text-red-500">{errors.chargeType}</span>
              )}
            </div>
          )}
          {formData.chargeType === "0" && (
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-[#3e9a6f] text-black rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                View Plans
              </button>
            </div>
          )}
          <div className="mt-4 w-full">
            <CustomButton
              onClick={nextStep}
              className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-xl hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600"
            >
              Next
            </CustomButton>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal p-6 bg-white rounded-lg-md shadow-lg w-full md:w-1/2 mx-auto"
        overlayClassName="modal-overlay fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
        contentLabel="Select a Plan"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-bold mb-4">Select a Plan</h2>
        <div className="flex gap-4 justify-between">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={` flex-1 ${
                selectedPlan !== null && selectedPlan.id === plan.id
                  ? "bg-cyan-200"
                  : "bg-gray-100"
              } bg-gray-100 rounded-lg-md p-4 flex flex-col justify-between`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {/* {console.log(selectedPlan)} */}
              <p className="text-gray-600 min-h-16">{plan.price}</p>
              <button
                className="mt-2 px-4 py-2 bg-white align-baseline text-black rounded-lg hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                onClick={() => setSelectedPlan(plan)}
              >
                {selectedPlan !== null && selectedPlan.id === plan.id
                  ? "Selected"
                  : "Select"}
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StepThree;
