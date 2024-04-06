import React from "react";
import Loader from "../../Loader";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const StepOne = ({
  formData,
  handleChange,
  verifyEmail,
  emailVerified,
  errors,
  confirmEmailOtp,
  nextStep,
  changeEmail,
  confirmMobileOtp,
  changeMobile,
  mobileVerified,
  verifyMobile,
  otpEmailLoading,
  otpMobileLoading,
  E,
  M,
}) => {
  return (
    <>
      <div className="mb-4 flex ">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          readOnly={emailVerified || E}
          className="text-gray-900 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-green-500"
        />
        <button
          onClick={verifyEmail}
          className={` px-4 py-2 bg-[#3e9a6f] text-white rounded-r hover:bg-green-600 focus:outline-none ${
            E ? "disabled:bg-green-600" : "disabled:bg-[#72d3a6]"
          } `}
          disabled={errors.email || formData.email === "" || emailVerified || E}
        >
          {E ? <MdVerified /> : otpEmailLoading ? <Loader /> : "Send OTP"}
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
            className=" text-gray-900 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={confirmEmailOtp}
            disabled={
              formData.emailOtp.length !== 6 || isNaN(formData.emailOtp)
            }
            className={` px-4 py-2 bg-green-500 text-white  hover:bg-green-600 focus:outline-none disabled:bg-green-300`}
          >
            Verify Email
          </button>
          <button
            onClick={changeEmail}
            className={` px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none disabled:bg-green-300`}
          >
            Change Email
          </button>
        </div>
      )}
      {errors.email && <span className="text-red-500">{errors.email}</span>}
      <div className="mb-4 flex">
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          readOnly={mobileVerified || M}
          className="text-gray-900 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-green-500"
        />
        <button
          onClick={verifyMobile}
          className={` px-4 py-2 bg-[#3e9a6f] text-white rounded-r hover:bg-green-600 focus:outline-none ${
            M ? "disabled:bg-green-600" : "disabled:bg-[#72d3a6]"
          }`}
          disabled={
            errors.mobile || formData.mobile === "" || mobileVerified || M
          }
        >
          {M ? <MdVerified /> : otpMobileLoading ? <Loader /> : "Send OTP"}
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
            className="text-gray-900 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={confirmMobileOtp}
            disabled={
              formData.mobileOtp.length !== 6 || isNaN(formData.mobileOtp)
            }
            className={` px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none disabled:bg-green-300`}
          >
            Verify Mobile
          </button>
          <button
            onClick={changeMobile}
            className={` px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none disabled:bg-green-300`}
          >
            Change Mobile
          </button>
        </div>
      )}
      {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
      <button
        onClick={nextStep}
        disabled={!(E && M)}
        className="w-full mt-4 px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 disabled:bg-[#72d3a6] focus:outline-none focus:bg-green-600"
      >
        Next
      </button>
      <p className=" text-center mt-2 text-cyan-800">
        Already an User? <Link className=" font-semibold hover:text-cyan-600" to={'/login'}>Login</Link> 
      </p>
    </>
  );
};

export default StepOne;
