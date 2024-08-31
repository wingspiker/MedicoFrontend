import React, { useState } from "react";
import Navbar from "./Navbar";
import BuyerSlider from "./BuyerSlider";
import ProductCategory, { BrandCards } from "./ProductCategory";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Footer from "../Global/Footer";

export default function BuyerHome() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform the search logic here or navigate to a search results page
    console.log("Search Term:", searchTerm);
  };

  // Example image URLs
  const images = [
    "https://www.shutterstock.com/image-vector/colorful-discount-sale-podium-special-600nw-2055955985.jpg",
    "https://media.istockphoto.com/id/1487007474/photo/snowy-landscape-during-blizzard-conditions.webp?s=170667a&w=0&k=20&c=cQ9sPHhXy-lDwJiX35iUxe-yvIjQF_HN3BBqbJ1FDK0=",
    "https://media.istockphoto.com/id/1487007474/photo/snowy-landscape-during-blizzard-conditions.webp?s=170667a&w=0&k=20&c=cQ9sPHhXy-lDwJiX35iUxe-yvIjQF_HN3BBqbJ1FDK0=",
  ];

  const categories = [
    {
      type: 0,
      name: "Capsule",
      image:
        "https://images.unsplash.com/photo-1598046937895-2be846402c0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fwc3VsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      type: 1,
      name: "Tablets",
      image:
        "https://images.unsplash.com/photo-1588718889344-f7bd7a565d20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0c3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const brands = [
    {
      type: 0,
      name: "Pfizer",
      image:
        "https://cdn.pixabay.com/photo/2014/10/14/16/34/maserati-488394_640.jpg",
    },
    {
      type: 1,
      name: "AstraZeneca",
      image:
        "https://cdn.pixabay.com/photo/2014/10/14/16/34/maserati-488394_640.jpg",
    },
  ];
  const handleCategoryClick = (type) => {
    // console.log("Category Clicked:", type);
    const searchStr = `?productTypes=${type}`;
    navigate("/Home/Products", { state: { search: searchStr } });
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <BuyerSlider images={images} />
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-xl border py-4 px-4 my-4 bg-orange-100">
          <h2 className="text-lg text-orange-600 font-medium pb-4 ">
            Shop by <span className="">Product Category</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ProductCategory
                key={index}
                category={category}
                onClick={() => handleCategoryClick(category.type)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border py-4 px-4 my-4 bg-rose-100">
          <h2 className="text-lg text-rose-600 font-medium pb-4">
            Shop by <span className="">Brand</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((item, index) => (
              <BrandCards
                key={index}
                brand={item}
                // onClick={() => handleCategoryClick(category.type)}/
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border py-4 px-4 my-4 bg-blue-100">
          <h2 className="text-lg text-blue-600 font-medium pb-4">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                drugName: "Paracetamol",
                manufacturerName: "Cipla",
                contents: "500mg",
                sellingPrice: 50,
              },
              {
                drugName: "Disprin",
                manufacturerName: "Reckitt Benckiser",
                contents: "500mg",
                sellingPrice: 20,
              },
              {
                drugName: "Dolo 650",
                manufacturerName: "Micro Labs",
                contents: "650mg",
                sellingPrice: 30,
              },
              {
                drugName: "Crocin",
                manufacturerName: "GSK",
                contents: "500mg",
                sellingPrice: 40,
              },
            ].map((item, index) => (
              <ProductCard
                key={index}
                product={item}
                // onClick={() => handleCategoryClick(category.type)}/
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-medium text-zinc-500 my-8 pb-2 border-b-2 border-blue-800">
    {children}
  </h2>
);
