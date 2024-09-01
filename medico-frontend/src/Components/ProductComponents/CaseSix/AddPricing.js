import React, { useEffect, useState } from "react";

function AddPricing({
  setUpdatedBuyer,
  updatedBuyer,
  data,
  cols,
  setData,
  defaultPrice,
  setErSix,
}) {
  const [errors, setErrors] = useState({});

  // Check if there are any errors
  const hasErrors = () => {
    return Object.values(errors).some(error => error !== "");
  };

  useEffect(() => {
    // Initial validation check on component mount
    setErSix(hasErrors());
  }, [errors]); // Also update when errors state changes

  const handleInputChange = (e, id) => {
    const newPrice = e.target.value;
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, price: newPrice };
      }
      return item;
    });
    setData(newData);

    // const newErrors = {
    //   ...errors,
    //   [id]: Number(newPrice) < Number(defaultPrice) ? "Price must be higher than default price." : "",
    // };

    const newErrors = {
      ...errors,
      [id]: isNaN(newPrice) ? "Enter Valid Price, Only Numbers are allowed" : "",
    };
    setErrors(newErrors);
    setErSix(hasErrors());
  };

  return (
    <div className="overflow-x-auto">
      {data.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-gray-600">
          <table className="min-w-full text-white">
            <thead className="bg-cyan-300">
              <tr>
                {cols.map((col, index) => {
                  if (col === "id") return null;
                  return (
                    <th key={col} className={`text-lg text-gray-700 font-semibold py-2 px-4 capitalize ${index !== cols.length - 1 ? "border-r" : ""} border-gray-600`}>
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b text-gray-900 border-gray-600 bg-gray-200">
                  {cols.map((col, index) => {
                    if (col === "id") return null;
                    if (col === "price") {
                      return (
                        <td key={col} className={`text-lg py-2 px-4 border-2 ${index !== cols.length - 1 ? "border-r" : ""} border-gray-600 border-y-0`}>
                          <div>
                            <input
                              type="number"
                              value={row[col]}
                              onChange={(e) => handleInputChange(e, row.id)}
                              className="w-full border-2 bg-gray-100 border-gray-600 rounded-md py-1 px-2 focus:outline-none focus:border-blue-500"
                            />
                            {errors[row.id] && (
                              <div className="text-red-500 text-xs mt-1">
                                {errors[row.id]}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td key={col} className={`text-lg py-2 px-4 ${index !== cols.length - 1 ? "border-r" : ""} border-gray-600`}>
                        {row[col]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddPricing;

