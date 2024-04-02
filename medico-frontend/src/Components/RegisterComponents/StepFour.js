import React from "react";

const StepFour = ({
  formData,
  handleChange,
  errors,
  prevStep,
  handleSubmit,
  handleFileChange,
}) => {
  return (
    <form onSubmit={handleSubmit} className=" border p-6 rounded-2xl">
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="LOGOFile"
          className=" inline-block text-white bg-cyan-900 w-1/4"
        >
          Company Logo
        </label>
        <input
          type="file"
          id="logoFile"
          name="logoFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500 "
        />
        {errors.logo && <span className="text-red-500">{errors.logo}</span>}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="aadharCardFile"
          className="text-white bg-cyan-900 inline-block w-1/4"
        >
          Aadhar Card
        </label>
        <input
          type="file"
          id="aadharCardFile"
          name="aadharCardFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.aadharCardFile && (
          <span className="text-red-500">{errors.aadharCardFile}</span>
        )}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="panCardFile"
          className="text-white  bg-cyan-900 inline-block w-1/4"
        >
          PAN Card
        </label>
        <input
          type="file"
          id="panCardFile"
          name="panCardFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.panCardFile && (
          <span className="text-red-500">{errors.panCardFile}</span>
        )}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="gstLicenseFile"
          className="text-white bg-cyan-900 inline-block w-1/4"
        >
          GST Number
        </label>
        <input
          type="file"
          id="gstLicenseFile"
          name="gstLicenseFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.gstLicenseFile && (
          <span className="text-red-500">{errors.gstLicenseFile}</span>
        )}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="wholesaleDrugLicenseFile"
          className="text-white bg-cyan-900 inline-block w-1/4"
        >
          Wholesale Drug License
        </label>
        <input
          type="file"
          id="wholesaleDrugLicenseFile"
          name="wholesaleDrugLicenseFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.wholesaleDrugLicenseFile && (
          <span className="text-red-500">
            {errors.wholesaleDrugLicenseFile}
          </span>
        )}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="retailDrugLicenseFile"
          className="text-white bg-cyan-900 inline-block w-1/4"
        >
          Retail Drug License
        </label>
        <input
          type="file"
          id="retailDrugLicenseFile"
          name="retailDrugLicenseFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.retailDrugLicenseFile && (
          <span className="text-red-500">{errors.retailDrugLicenseFile}</span>
        )}
      </div>
      <div className="mb-4 border-b pb-4">
        <label
          htmlFor="companyRegistrationLicenseFile"
          className="text-white bg-cyan-900 inline-block w-1/4"
        >
          Company Registration License
        </label>
        <input
          type="file"
          id="companyRegistrationLicenseFile"
          name="companyRegistrationLicenseFile"
          onChange={handleFileChange}
          className="inline-block w-3/4 px-3 py-2 rounded  focus:outline-none focus:border-green-500"
        />
        {errors.companyRegistrationLicenseFile && (
          <span className="text-red-500">
            {errors.companyRegistrationLicenseFile}
          </span>
        )}
      </div>
      <div className="mt-4 text-center">
        <button className="px-4  py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">
          Submit
        </button>
      </div>
    </form>
  );
};

export default StepFour;
