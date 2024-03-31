import React, { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    emailOtp: "",
    mobile: "",
    mobileOtp: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
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
                className="w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={verifyEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Verify
              </button>
            </div>
            {emailVerified && (
              <>
                <input
                  type="text"
                  name="emailOtp"
                  placeholder="Email OTP"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </>
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
                className="w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={verifyMobile}
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Verify
              </button>
            </div>
            {mobileVerified && (
              <>
                <input
                  type="text"
                  name="mobileOtp"
                  placeholder="Mobile OTP"
                  value={formData.mobileOtp}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </>
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
          <form onSubmit={handleSubmit}>{/* Remaining form fields */}</form>
        )}
      </div>
    </div>
  );
};

export default Register;
