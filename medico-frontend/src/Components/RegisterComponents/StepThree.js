import React, { useEffect, useState } from "react";
import Subscription from "./Subscription";
import Modal from "react-modal";
import { getStates } from "../../Services/location";

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
    { id: 2, name: "Standard Plan", price: "₹ 15,000/six months" },
    { id: 3, name: "Premium Plan", price: "₹ 25,000 Annually" },
  ];

  const handleSave = () => {
    if (selectedPlan) {
      // Do something with the selected plan
      console.log("Selected plan:", selectedPlan);
      // Close the modal
      setShowModal(false);
    }
  };

  return (
    <div className="text-center border rounded-xl">
      <h1 className="text-3xl text-white mb-4 py-6">Company Basic Details</h1>
      <div className="m-4 text-left ">
        <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block text-white bg-cyan-900">
              Email Id
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className="w-full px-3 py-2 rounded border text-gray-900 focus:outline-none bg-green-300 focus:border-green-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block text-white bg-cyan-900">
              Company Email Id
            </label>
            <input
              type="text"
              name="companyEmail"
              placeholder="Email Id"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 focus:outline-none focus:border-green-500"
            />
            {errors.companyEmail && (
              <span className="text-red-500">{errors.companyEmail}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyName && (
              <span className="text-red-500">{errors.companyName}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2 ">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.licenseNumber && (
              <span className="text-red-500">{errors.licenseNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              GST Number
            </label>
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.gstNumber && (
              <span className="text-red-500">{errors.gstNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Pan Card Number
            </label>
            <input
              type="text"
              name="panCardNumber"
              placeholder="Pan Card Number"
              value={formData.panCardNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.panCardNumber && (
              <span className="text-red-500">{errors.panCardNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.displayName && (
              <span className="text-red-500">{errors.displayName}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="state" className="block bg-cyan-900 text-white">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
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
            <label htmlFor="district" className="block bg-cyan-900 text-white">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
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
            <label htmlFor="taluka" className="block bg-cyan-900 text-white">
              Taluka
            </label>
            <select
              name="taluka"
              value={formData.taluka}
              disabled={!formData.district}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
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
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Company Address 1
            </label>
            <input
              type="text"
              name="companyAddress1"
              placeholder="Company Address 1"
              value={formData.companyAddress1}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyAddress1 && (
              <span className="text-red-500">{errors.companyAddress1}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Company Address 2
            </label>
            <input
              type="text"
              name="companyAddress2"
              placeholder="Company Address 2"
              value={formData.companyAddress2}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyAddress2 && (
              <span className="text-red-500">{errors.companyAddress2}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.pincode && (
              <span className="text-red-500">{errors.pincode}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Drug License Number
            </label>
            <input
              type="text"
              name="drugLicenseNumber"
              placeholder="Drug License Number"
              value={formData.drugLicenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.drugLicenseNumber && (
              <span className="text-red-500">{errors.drugLicenseNumber}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Whole Sales License Number
            </label>
            <input
              type="text"
              name="wholesaleLicenseNumber"
              placeholder="Whole Sales License Number"
              value={formData.wholesaleLicenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.wholesaleLicenseNumber && (
              <span className="text-red-500">
                {errors.wholesaleLicenseNumber}
              </span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="companyType" className="block bg-cyan-900 ">
              Company Type
            </label>
            <select
              name="companyType"
              id="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-900 rounded  border border-gray-300 focus:outline-none focus:border-green-500"
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
              <label
                htmlFor="chargeType"
                className="block bg-cyan-900 text-white"
              >
                Charge Type
              </label>
              <select
                name="chargeType"
                id="chargeType"
                value={formData.chargeType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 rounded border border-gray-300 focus:outline-none focus:border-green-500"
              >
                <option className="text-gray-900" value="">
                  Select Charge Type
                </option>
                <option value="percentage" className="text-gray-900">
                  Percentage
                </option>
                <option value="subscription" className="text-gray-900">
                  Subscription
                </option>
              </select>
              {errors.chargeType && (
                <span className="text-red-500">{errors.chargeType}</span>
              )}
            </div>
          )}
          {formData.chargeType === "subscription" && (
            <div className="mt-6">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                View Plans
              </button>
            </div>
          )}
          <div className="mt-4 w-full">
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal p-6 bg-white rounded-md shadow-lg w-full md:w-1/2 mx-auto"
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
        <div className="grid grid-cols-1 gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className={`${(selectedPlan!==null && selectedPlan.id===plan.id)?'bg-cyan-200':'bg-gray-100'} bg-gray-100 rounded-md p-4`}>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {/* {console.log(selectedPlan)} */}
              <p className="text-gray-600">{plan.price}</p>
              <button
                className="mt-2 px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                onClick={() => setSelectedPlan(plan)}
              >
                {(selectedPlan!==null && selectedPlan.id === plan.id)?'Selected':'Select'} 
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
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
