import React from "react";

const StepThree = ({ formData, handleChange, errors, nextStep, prevStep }) => {
  return (
    <div className="text-center border rounded-xl">
      <h1 className="text-3xl text-white mb-4 py-6">Company Basic Details</h1>
      <form className="m-4 text-left ">
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
              className="w-full px-3 py-2 rounded border text-gray-900 focus:outline-none focus:border-green-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
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
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.state && (
              <span className="text-red-500">{errors.state}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              District
            </label>
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.district && (
              <span className="text-red-500">{errors.district}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block bg-cyan-900 text-white">
              Taluka
            </label>
            <input
              type="text"
              name="taluka"
              placeholder="Taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border text-gray-900 border-gray-300 focus:outline-none focus:border-green-500"
            />
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
              <option value="selfSelling" className="text-gray-900">
                Self Selling
              </option>
              <option value="companySelling" className="text-gray-900">
                Company Selling
              </option>
            </select>
            {errors.companyType && (
              <span className="text-red-500">{errors.companyType}</span>
            )}
          </div>
          {formData.companyType === "selfSelling" && (
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
          <div className="mt-4 w-full">
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
