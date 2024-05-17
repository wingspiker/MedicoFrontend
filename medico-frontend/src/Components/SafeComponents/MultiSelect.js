import React, { useState, useEffect } from "react";

const MultiSelect = ({ options, selectedOptions, setSelectedOptions, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full bg-white border border-gray-300 text-black py-2 px-4 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div key={option.value} className="flex items-center p-2">
              <input
                type="checkbox"
                id={`checkbox-${option.value}`}
                value={option.value}
                onChange={handleCheckboxChange}
                checked={selectedOptions.includes(option.value)}
                className="mr-2"
              />
              <label htmlFor={`checkbox-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
