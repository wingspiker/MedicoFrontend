// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import {
//   Slider,
//   Typography,
//   Box,
//   FormControlLabel,
//   Checkbox,
// } from "@mui/material";
// import { prescriptionEnum } from "../../Models/enums.model";

// const ProductFilter = ({ setSearchProduct, setPriceRange }) => {
//   const [searchItem, setSearchItem] = useState("");
//   const [priceRange, setPriceRangeState] = useState([0, 10000]);

//   const handleSearchProductName = (e) => {
//     setSearchItem(e.target.value);
//   };

//   const handleSearch = () => {
//     setSearchProduct(searchItem);
//   };

//   const handlePriceRangeChange = (event, newValue) => {
//     setPriceRangeState(newValue);
//     setPriceRange(newValue);
//   };
//   return (
//     <div className="w-1/4 p-4 bg-gray-100">
//       <h2 className="text-lg font-bold">Filters</h2>
//       <div className="flex items-center mt-2">
//         <input
//           type="text"
//           value={searchItem}
//           onChange={handleSearchProductName}
//           placeholder="Search..."
//           className="flex-grow p-2 border border-gray-300 rounded-l"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white mx-2 p-2 rounded-r"
//         >
//           <FaSearch />
//         </button>
//       </div>
//       <Box sx={{ mt: 4 }}>
//         <Typography id="price-range-slider" gutterBottom>
//           Price Range
//         </Typography>
//         <Slider
//           value={priceRange}
//           onChange={handlePriceRangeChange}
//           valueLabelDisplay="auto"
//           min={0}
//           max={1000}
//           sx={{ color: "primary.main" }}
//         />
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="body2">${priceRange[0]}</Typography>
//           <Typography variant="body2">${priceRange[1]}</Typography>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default ProductFilter;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Slider,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { prescriptionEnum } from "../../Models/enums.model";

const ProductFilter = ({ setSearchProduct, setPriceRange }) => {
  const [searchItem, setSearchItem] = useState("");
  const [priceRange, setPriceRangeState] = useState([0, 10000]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  console.log(selectedPrescriptions);

  const handleSearchProductName = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearch = () => {
    setSearchProduct(searchItem);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeState(newValue);
    setPriceRange(newValue);
  };

  const handleCheckboxChange = (index) => {
    setSelectedPrescriptions((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleFilter = () => {
    console.log("Hello");
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={searchItem}
          onChange={handleSearchProductName}
          placeholder="Search..."
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white mx-2 p-2 rounded-r"
        >
          <FaSearch />
        </button>
      </div>
      <Box sx={{ mt: 4 }}>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          sx={{ color: "primary.main" }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">₹ {priceRange[0]}</Typography>
          <Typography variant="body2">₹ {priceRange[1]}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography gutterBottom>Prescription Types</Typography>
        {Object.keys(prescriptionEnum).map((key, index) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={selectedPrescriptions.includes(index)}
                onChange={() => handleCheckboxChange(index)}
                color="primary"
              />
            }
            label={prescriptionEnum[key]}
          />
        ))}
      </Box>
      <button
        onClick={handleFilter}
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default ProductFilter;
