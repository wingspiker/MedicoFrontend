import React from "react";

const CustomInput = ({ label, placeholder, inputProps, error }) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-lg">{label}</label>
      <input
        {...inputProps}
        className={
          "w-52 h-10 bg-gray-400 py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900" +
          " " +
          inputProps?.className
        }
        placeholder={placeholder}
      />
      {error && <span className="text-[red] mt-1">{error.message}</span>}
    </div>
  );
};

export default CustomInput;
