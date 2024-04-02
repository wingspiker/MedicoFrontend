import React from "react";

const StepTwo = ({ formData, handleChange, errors, nextStep }) => {
  return (
    <form>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          readOnly
          className="text-gray-900 bg-green-200 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          readOnly
          className="text-gray-900 bg-green-200 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
        />
        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
          >
            <option value="">Select Role</option>
            <option value="0">Company</option>
            <option value="1">Buyer</option>
          </select>
          {errors.role && <span className="text-red-500">{errors.role}</span>}
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
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
          className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
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
          className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="flex justify-between mt-4">
        {/* <button
        onClick={prevStep}
        className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Previous
      </button> */}
        <button
          onClick={nextStep}
          className="w-1/2 px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default StepTwo;

// <form>
//   <div className="mb-4">
//     <input
//       type="email"
//       name="email"
//       placeholder="Email"
//       value={formData.email}
//       onChange={handleChange}
//       readOnly
//       className="text-gray-900 bg-green-200 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
//     />
//     <input
//       type="text"
//       name="mobile"
//       placeholder="Mobile Number"
//       value={formData.mobile}
//       onChange={handleChange}
//       readOnly
//       className="text-gray-900 bg-green-200 flex-1 w-full px-3 py-2 rounded-l border border-gray-300 mb-4 focus:outline-none focus:border-green-500"
//     />
//     <input
//       type="text"
//       name="username"
//       placeholder="Username"
//       value={formData.username}
//       onChange={handleChange}
//       className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
//     />
//     {errors.username && (
//       <span className="text-red-500">{errors.username}</span>
//     )}
//   </div>
//   <div className="mb-4">
//     <input
//       type="password"
//       name="password"
//       placeholder="Password"
//       value={formData.password}
//       onChange={handleChange}
//       className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
//     />
//     {errors.password && (
//       <span className="text-red-500">{errors.password}</span>
//     )}
//   </div>
//   <div className="mb-4">
//     <input
//       type="password"
//       name="confirmPassword"
//       placeholder="Confirm Password"
//       value={formData.confirmPassword}
//       onChange={handleChange}
//       className="text-gray-900 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
//     />
//     {errors.confirmPassword && (
//       <span className="text-red-500">{errors.confirmPassword}</span>
//     )}
//   </div>
//   <div className="flex justify-between mt-4">
//     {/* <button
//       onClick={prevStep}
//       className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
//     >
//       Previous
//     </button> */}
//     <button
//       onClick={nextStep}
//       className="w-1/2 px-4 py-2 bg-[#3e9a6f] text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
//     >
//       Next
//     </button>
//   </div>
// </form>
