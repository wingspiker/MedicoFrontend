import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { setFormData } from "../../Services/auth";
import Loader from "../../Loader";
import CustomButton from "../Global/Button";

const StepTwo = (props) => {
  const { formData, handleChange, errors, signUp } = props;

  const [loading, setLoading] = useState(false);

  const Validate = () => {
    setLoading(true);
    if (formData.role === "" || errors.role) {
      toast.error(errors.role ?? "Role is required");
      return;
    }
    if (formData.username === "" || errors.username) {
      toast.error(errors.username ?? "Username is required");
      return;
    }
    if (formData.password === "" || errors.password) {
      toast.error(errors.password ?? "Password is required");
      return;
    }
    if (formData.confirmPassword === "" || errors.confirmPassword) {
      toast.error(errors.confirmPassword ?? "Confirm Password is required");
      return;
    }

    const { email, mobile, role, username, password, confirmPassword } =
      formData;
    const fD = {
      email,
      phoneNumber: mobile,
      role: Number(role),
      username,
      password,
      confirmPassword,
    };
    console.log(fD);
    setFormData(formData);
    signUp(fD, setLoading);
    // setLoading(false)
  };
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: "red" },
        }}
      />
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          readOnly
          className="text-gray-900 bg-green-50 flex-1 w-full px-3 py-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          readOnly
          className="text-gray-900 bg-green-50 flex-1 w-full px-3 py-2 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
        />
        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="text-gray-900 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="0">Buyer</option>
            <option value="1">Company</option>
          </select>
          {errors.role && <span className="text-red-500">{errors.role}</span>}
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="text-gray-900 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500"
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
          className="text-gray-900 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500"
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
          className="text-gray-900 w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="flex justify-end mt-4">
        {/* <button
        onClick={prevStep}
        className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Previous
      </button> */}
        <CustomButton
          onClick={Validate}
          className="w-full px-4 py-2  hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          {loading ? <Loader /> : "Create Account"}
        </CustomButton>
      </div>
    </>
  );
};

export default StepTwo;
