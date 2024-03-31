import React, { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);
  const initialForm = {
    email: "",
    emailOtp: "",
    mobile: "",
    mobileOtp: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",

    //step 3

    companyName: "",
    licenseNumber: "",
    gstNumber: "",
    panCardNumber: "",
    displayName: "",
    state: "",
    district: "",
    taluka: "",
    companyAddress1: "",
    companyAddress2: "",
    pincode: "",
    logo: "",
    drugLicenseNumber: "",
    wholesaleLicenseNumber: "",
    companyType: "",
    chargeType: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Basic validation example, customize as needed
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    // Simulate email verification
    // You can replace this with actual verification logic
    if (formData.email) {
      setEmailVerified(true);
    } else {
      setErrors({
        ...errors,
        email: "Please provide an email address",
      });
    }
  };

  const verifyMobile = (e) => {
    e.preventDefault();
    // Simulate mobile verification
    // You can replace this with actual verification logic
    if (formData.mobile) {
      setMobileVerified(true);
    } else {
      setErrors({
        ...errors,
        mobile: "Please provide a mobile number",
      });
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const confirmEmailOtp = (e) => {
    e.preventDefault();
    // Handle email OTP confirmation logic here
    console.log("Email OTP confirmed:", formData.emailOtp);
  };

  const confirmMobileOtp = (e) => {
    e.preventDefault();
    // Handle mobile OTP confirmation logic here
    console.log("Mobile OTP confirmed:", formData.mobileOtp);
  };

  const changeEmail = () => {
    setFormData({ ...formData, email: "", emailOtp: "" });
    setEmailVerified(false);
  };

  const changeMobile = () => {
    setFormData({ ...formData, mobile: "", mobileOtp: "" });
    setMobileVerified(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center text-gray-900">Register</h2>
        {step === 1 && (
          <form>
            <div className="mb-4 flex">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                readOnly={emailVerified}
                className=" flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={verifyEmail}
                className={` px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none disabled:bg-blue-300`}
                disabled={
                  errors.email || formData.email === "" || emailVerified
                }
              >
                Send OTP
              </button>
            </div>
            {emailVerified && (
              <div className="mb-4 flex">
                <input
                  type="text"
                  name="emailOtp"
                  placeholder="Email OTP"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  className="flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={confirmEmailOtp}
                  disabled={
                    formData.emailOtp.length !== 4 || isNaN(formData.emailOtp)
                  }
                  className={` px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600 focus:outline-none disabled:bg-blue-300`}
                >
                  Verify Email
                </button>
                <button
                  onClick={changeEmail}
                  className={` px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none disabled:bg-blue-300`}
                >
                  Change Email
                </button>
              </div>
            )}
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <div className="mb-4 flex">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                readOnly={mobileVerified}
                className="flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={verifyMobile}
                className={` px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none disabled:bg-blue-300`}
                disabled={
                  errors.mobile || formData.mobile === "" || mobileVerified
                }
              >
                Send OTP
              </button>
            </div>
            {mobileVerified && (
              <div className="mb-4 flex">
                <input
                  type="text"
                  name="mobileOtp"
                  placeholder="Mobile OTP"
                  value={formData.mobileOtp}
                  onChange={handleChange}
                  className="flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={confirmMobileOtp}
                  disabled={
                    formData.mobileOtp.length !== 4 || isNaN(formData.mobileOtp)
                  }
                  className={` px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none disabled:bg-blue-300`}
                >
                  Verify Mobile
                </button>
                <button
                  onClick={changeMobile}
                  className={` px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none disabled:bg-blue-300`}
                >
                  Change Mobile
                </button>
              </div>
            )}
            {errors.mobile && (
              <span className="text-red-500">{errors.mobile}</span>
            )}
            <button
              onClick={nextStep}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword}</span>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.companyName && (
                <span className="text-red-500">{errors.companyName}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.licenseNumber && (
                <span className="text-red-500">{errors.licenseNumber}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="gstNumber"
                placeholder="GST Number"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.gstNumber && (
                <span className="text-red-500">{errors.gstNumber}</span>
              )}
            </div>
            {/* Add other Step 3 form fields */}

            <div className="mb-4">
              <input
                type="text"
                name="panCardNumber"
                placeholder="Pan Card Number"
                value={formData.panCardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.panCardNumber && (
                <span className="text-red-500">{errors.panCardNumber}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.displayName && (
                <span className="text-red-500">{errors.displayName}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.state && (
                <span className="text-red-500">{errors.state}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.district && (
                <span className="text-red-500">{errors.district}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="taluka"
                placeholder="Taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.taluka && (
                <span className="text-red-500">{errors.taluka}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="companyAddress1"
                placeholder="Company Address 1"
                value={formData.companyAddress1}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.companyAddress1 && (
                <span className="text-red-500">{errors.companyAddress1}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="companyAddress2"
                placeholder="Company Address 2"
                value={formData.companyAddress2}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.companyAddress2 && (
                <span className="text-red-500">{errors.companyAddress2}</span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.pincode && (
                <span className="text-red-500">{errors.pincode}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="logo"
                placeholder="Logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.logo && (
                <span className="text-red-500">{errors.logo}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="drugLicenseNumber"
                placeholder="Drug License Number"
                value={formData.drugLicenseNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.drugLicenseNumber && (
                <span className="text-red-500">{errors.drugLicenseNumber}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="wholesaleLicenseNumber"
                placeholder="Whole Sales License Number"
                value={formData.wholesaleLicenseNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {errors.wholesaleLicenseNumber && (
                <span className="text-red-500">
                  {errors.wholesaleLicenseNumber}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="companyType" className="block text-gray-700">
                Company Type
              </label>
              <select
                name="companyType"
                id="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Company Type</option>
                <option value="selfSelling">Self Selling</option>
                <option value="companySelling">Company Selling</option>
              </select>
              {errors.companyType && (
                <span className="text-red-500">{errors.companyType}</span>
              )}
            </div>

            {formData.companyType === "selfSelling" && (
              <div className="mb-4">
                <label htmlFor="chargeType" className="block text-gray-700">
                  Charge Type
                </label>
                <select
                  name="chargeType"
                  id="chargeType"
                  value={formData.chargeType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Charge Type</option>
                  <option value="percentage">Percentage</option>
                  <option value="subscription">Subscription</option>
                </select>
                {errors.chargeType && (
                  <span className="text-red-500">{errors.chargeType}</span>
                )}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit}>{/* Remaining form fields */}</form>
        )}
      </div>
    </div>
  );
};

export default Register;
