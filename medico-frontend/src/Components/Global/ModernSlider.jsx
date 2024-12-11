import React, { useState, useEffect, useCallback } from "react";

const ModernSlider = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = useCallback(
    (e) => {
      const newValue = [parseInt(e.target.value, 10), localValue[1]];
      setLocalValue(newValue);
    },
    [localValue]
  );

  const handleChange2 = useCallback(
    (e) => {
      const newValue = [localValue[0], parseInt(e.target.value, 10)];
      setLocalValue(newValue);
    },
    [localValue]
  );

  useEffect(() => {
    onChange(localValue);
  }, [localValue, onChange]);

  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  return (
    <div className="relative w-full h-16 mt-4">
      <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-200 rounded-full" />
      <div
        className="absolute inset-y-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
        style={{
          left: `${getPercent(localValue[0])}%`,
          width: `${getPercent(localValue[1]) - getPercent(localValue[0])}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={localValue[0]}
        onChange={handleChange}
        className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={localValue[1]}
        onChange={handleChange2}
        className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-1/2 w-4 h-4 -mt-2 bg-white border-2 border-blue-500 rounded-full shadow"
        style={{ left: `calc(${getPercent(localValue[0])}% - 0.5rem)` }}
      />
      <div
        className="absolute top-1/2 w-4 h-4 -mt-2 bg-white border-2 border-blue-500 rounded-full shadow"
        style={{ left: `calc(${getPercent(localValue[1])}% - 0.5rem)` }}
      />
      <div className="flex justify-between mt-8 text-sm text-gray-600">
        <span>₹{localValue[0]}</span>
        <span>₹{localValue[1]}</span>
      </div>
    </div>
  );
};

export default ModernSlider;
