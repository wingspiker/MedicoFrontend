import React from "react";

export const CustomInput = ({ label, placeholder, inputProps, error }) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-lg">{label}</label>
      <input
        {...inputProps}
        className={
          "w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900" +
          " " +
          inputProps?.className
        }
        placeholder={placeholder}
      />
      {error && <span className="text-red-600 mt-1">{error.message}</span>}
    </div>
  );
};

export const CustomSelect = ({ label, options, inputProps, error }) => {
  // console.log('hhh');
  // console.log(options);
  return (
    <div className="flex flex-col">
      <label className="text-black text-lg">{label}</label>
      <select
        {...inputProps}
        className={
          "w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900" +
          " " +
          inputProps?.className
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 mt-1">{error.message}</span>}
    </div>
  );
};

export const CustomTextArea = ({
  label,
  placeholder,
  inputProps,
  error,
  small,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-lg">{label}</label>
      <textarea
        {...inputProps}
        className={
          `w-52 ${
            small ? "h-10" : "h-20"
          }  bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900` +
          " " +
          inputProps?.className
        }
        placeholder={placeholder}
      />
      {error && <span className="text-red-600 mt-1">{error.message}</span>}
    </div>
  );
};

export const CustomCheckbox = ({ label, checked, onChange, error }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 mr-2 border border-solid border-gray-900 rounded-sm"
      />
      <label className="text-black text-lg">{label}</label>
      {error && <span className="text-red-600 ml-2">{error.message}</span>}
    </div>
  );
};
