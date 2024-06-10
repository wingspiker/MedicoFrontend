import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Slider,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { prescriptionEnum } from "../../Models/enums.model";
import { getAllCompanies } from "../../Services/company";

const ProductFilter = ({ setSearchProduct, setPriceRange, setFilterSearch, setCompanyFilter }) => {
  const [searchItem, setSearchItem] = useState("");
  const [priceRange, setPriceRangeState] = useState([0, 10000]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);

  // console.log(selectedCompanies);

  useEffect(() => {
    getAllCompanies()
      .then((resp) => {
        setCompanies(resp); // assuming resp is an array of company objects
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleCompanyCheckboxChange = (companyEmail) => {
    setSelectedCompanies((prev) => {
      if (prev.includes(companyEmail)) {
        // Remove the company from the array if it is already selected
        return prev.filter((email) => email !== companyEmail);
      } else {
        // Add the company to the array if it is not already selected
        return [...prev, companyEmail];
      }
    });
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
    console.log("Filtering products...");
    // console.log(selectedPrescriptions);
    // console.log(selectedCompanies);
    // console.log(priceRange);
    let str = ''
    selectedPrescriptions.forEach(p=>{
      str += `&prescriptionTypes=${p}`
    })

    str+=`&minSellingPrice=${priceRange[0]}&maxSellingPrice=${priceRange[1]}`

    setFilterSearch(str);
    setCompanyFilter(selectedCompanies);
  };

  return (
    <div className="w-1/4 p-4 bg-gray-100 h-[92vh] overflow-x-auto no-scrollbar">
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
      <Typography sx={{ mt: 4 }} id="price-range-slider" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
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
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom>Company Names</Typography>
        {companies.map((company) => (
          <FormControlLabel
            key={company.companyEmail}
            control={
              <Checkbox
                checked={selectedCompanies.includes(company.companyEmail)}
                onChange={() =>
                  handleCompanyCheckboxChange(company.companyEmail)
                }
                color="primary"
              />
            }
            label={company.name}
          />
        ))}
      </Box>
      {/* {console.log(companies)} */}
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
