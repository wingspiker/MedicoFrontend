import React, { useEffect, useState } from "react";
import Loader from "../../../Loader";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";

export default function LocationBox({
  register,
  errors,
  isLoading,
  data,
  loadNext,
  next,
  curr,
  setselectedTaluka,
  setDistActive,
  setTalukaActive,
}) {
  const [options, setOptions] = useState(data);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(data);
    setOptions(data);
    setSelected([]);
  }, [data]);

  useEffect(() => {
    if (curr == "Taluka") {
      const selectedTalukaIds = selected.map((s) => s.id);
      setselectedTaluka(selectedTalukaIds);
    }
  }, [selected]);

  const handleOptionsClick = (id) => {
    const selectedData = options.find((o) => o.id === id);
    const remainingOptions = options.filter((o) => o.id !== id);

    const newSelected = [...selected, selectedData];
    newSelected.sort((a, b) => a.id - b.id);
    setSelected(newSelected);

    remainingOptions.sort((a, b) => a.id - b.id);
    setOptions(remainingOptions);
  };

  const handleSelectedClick = (id) => {
    const selectedData = selected.find((s) => s.id === id);
    const remainingSelected = selected.filter((s) => s.id !== id);

    const newSelected = [...options, selectedData];
    newSelected.sort((a, b) => a.id - b.id);
    setOptions(newSelected);
    setSelected(remainingSelected);
    if (setDistActive) {
      setDistActive(false);
    }
    if (setTalukaActive) {
      setTalukaActive(false);
    }
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
            Select {curr}
          </legend>
          <div className=" flex justify-end w-full">
            {curr != "Taluka" && (
              <>
                {next.length && (
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
                )}
              </>
            )}
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
                    className=" cursor-pointer py-2 bg-[#5bb77d] hover:bg-green-600 text-white font-bold px-2 rounded rounded-s-none"
                  >
                    <IoIosAddCircle />
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
                    className=" cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded rounded-s-none"
                  >
                    <RiDeleteBin5Line />
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
