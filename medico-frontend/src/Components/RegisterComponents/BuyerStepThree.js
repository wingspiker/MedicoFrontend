import React from "react";

const BuyerStepThree = ({
  formData,
  handleChange,
  errors,
  nextStep,
  states,
  districts,
  talukas,
  setCurrState,
  setCurrDistrict,
  setCurrTaluka
}) => {
  return (
    <div className="text-center border rounded-xl">
      <h1 className="text-3xl text-white mb-4 py-6">Step Three - Buyer</h1>
      <div className="m-4 text-left ">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="email" className="block text-white bg-cyan-900">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className={`w-full px-3 py-2 rounded border bg-green-300 text-gray-900 focus:outline-none focus:border-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label
              htmlFor="first name"
              className="block text-white bg-cyan-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border text-gray-900 focus:outline-none focus:border-green-500 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName}</span>
            )}
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label htmlFor="last name" className="block text-white bg-cyan-900">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border text-gray-900 focus:outline-none focus:border-green-500 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName}</span>
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
                <option key={taluka.id} value={taluka.id}>
                  {taluka.name}
                </option>
              ))}
            </select>
            {errors.taluka && (
              <span className="text-red-500">{errors.taluka}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <label
              htmlFor="occupation"
              className="block bg-cyan-900 text-white"
            >
              Occupation
            </label>
            <select
              name="occupation"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-900 rounded border border-gray-300 focus:outline-none focus:border-green-500 ${
                errors.occupation ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Occupation</option>
              <option value="Doctor">Doctor</option>
              <option value="Medical Store">Medical Store</option>
            </select>
            {errors.occupation && (
              <span className="text-red-500">{errors.occupation}</span>
            )}
          </div>
          {formData.occupation === "Doctor" && (
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
              <label htmlFor="degree" className="block bg-cyan-900 text-white">
                Degree
              </label>
              <select
                name="degree"
                id="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-gray-900 rounded border border-gray-300 focus:outline-none focus:border-green-500 ${
                  errors.degree ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Degree</option>
                <option value="Master of Surgery">Master of Surgery</option>
                <option value="Doctor of Medicine">Doctor of Medicine</option>
                <option value="Bachelor of Medicine Bachelor of Surgery">
                  Bachelor of Medicine Bachelor of Surgery
                </option>
                <option value="Bachelor of Dental Surgery">
                  Bachelor of Dental Surgery
                </option>
                <option value="Bachelor of Homeopathy Medicine and Surgery">
                  Bachelor of Homeopathy Medicine and Surgery
                </option>
              </select>
              {errors.degree && (
                <span className="text-red-500">{errors.degree}</span>
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
      </div>
    </div>
  );
};

export default BuyerStepThree;
