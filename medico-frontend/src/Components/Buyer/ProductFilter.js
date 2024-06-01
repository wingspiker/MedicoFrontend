// import React, { useState } from "react";

// const FilterComponent = ({ setFilters }) => {
//   const [filter, setFilter] = useState("");

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   const applyFilter = () => {
//     setFilters(filter);
//   };

//   return (
//     <div className="w-1/4 p-4 bg-gray-100">
//       <h2 className="text-lg font-bold">Filters</h2>
//       <input
//         type="text"
//         value={filter}
//         onChange={handleFilterChange}
//         placeholder="Search..."
//         className="w-full p-2 border border-gray-300 rounded mt-2"
//       />
//       <button
//         onClick={applyFilter}
//         className="w-full bg-blue-500 text-white p-2 rounded mt-2"
//       >
//         Apply Filter
//       </button>
//     </div>
//   );
// };

// export default FilterComponent;

import React, { useState } from "react";

const ProductFilter = ({ setFilters }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const applyFilter = () => {
    setFilters(filter);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold">Filters</h2>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <button
        onClick={applyFilter}
        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default ProductFilter;
