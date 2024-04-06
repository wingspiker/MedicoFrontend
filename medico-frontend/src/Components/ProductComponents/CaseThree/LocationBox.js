import React, { useEffect, useState } from "react";
import Loader from "../../../Loader";

export default function LocationBox({
  register,
  errors,
  isLoading,
  data,
  loadNext,
  next,
}) {
  const [options, setOptions] = useState(data);
  const [selected, setSelected] = useState([]);

  //   console.log(data);

  useEffect(() => {
    console.log(data);
    setOptions(data);
    setSelected([]);
  }, [data]);

  const handleOptionsClick = (id) => {
    const selectedData = options.find((o) => o.id === id);
    const remainingOptions = options.filter((o) => o.id !== id);
    setSelected([...selected, selectedData]);
    setOptions(remainingOptions);
  };

  const handleSelectedClick = (id) => {
    const selectedData = selected.find((s) => s.id === id);
    const remainingSelected = selected.filter((s) => s.id !== id);
    setOptions([...options, selectedData]);
    setSelected(remainingSelected);
  };

  const onLoadNext = (e) => {
    e.preventDefault();
    const selectedIDs = selected.map((s) => s.id);
    console.log(selectedIDs);
    loadNext(selectedIDs);
  };

  return (
    <>
      <fieldset className="p-4 border rounded-md mt-4  max-w-5xl">
        <div className="flex flex-col md:flex-row md:justify-between">
          <legend className="text-2xl text-white mb-4 md:mb-0 md:mr-4 w-full">
            Select States
          </legend>
          <div className=" flex justify-end w-full">
            <button
              disabled={selected.length == 0}
              className={` cursor-pointer relative bg-[#3e9a6f] hover:bg-green-600 disabled:bg-green-300 disabled:cursor-auto text-white font-bold py-1 px-2 rounded`}
              onClick={onLoadNext}
            >
              {isLoading ? <Loader /> : `Load ${next}`}
              {selected.length > 0 && (
                <p className=" absolute top-0 right-0 bg-red-500 text-white p-[2px] px-[6px] text-xs rounded-full translate-x-1/2 -translate-y-1/2">
                  {selected.length}
                </p>
              )}
            </button>
          </div>
        </div>
        <div className=" grid grid-cols-2 mt-4 gap-3">
          <div className=" bg-gray-300 p-2 h-96 overflow-auto rounded-md no-scrollbar">
            {options.map((state, index) => {
              return (
                <div key={index} className=" flex mb-2">
                  <p className=" bg-orange-200 rounded-md rounded-e-none p-1 flex-1">
                    {state.name}
                  </p>
                  <p
                    onClick={() => handleOptionsClick(state.id)}
                    className=" cursor-pointer bg-[#5bb77d] hover:bg-green-600 text-white font-bold py-1 px-2 rounded rounded-s-none"
                  >
                    +
                  </p>
                </div>
              );
            })}
          </div>
          <div className=" bg-green-300 p-2 h-96 overflow-auto rounded-md no-scrollbar">
            {selected.map((state, index) => {
              return (
                <div key={index} className=" flex mb-2">
                  <p className=" bg-orange-200 rounded-md rounded-e-none p-1 flex-1">
                    {state.name}
                  </p>
                  <p
                    onClick={() => handleSelectedClick(state.id)}
                    className=" cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded rounded-s-none"
                  >
                    -
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </fieldset>
    </>
  );
}
