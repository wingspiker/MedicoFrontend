import React, { useState } from "react";
import Navbar from "./Navbar";
import BuyerSlider from "./BuyerSlider";
import ProductCategory from "./ProductCategory";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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
    "https://images.unsplash.com/photo-1487777571634-48eb9b252b68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const handleCategoryClick = (type) => {
    // console.log("Category Clicked:", type);
    const searchStr = `?productTypes=${type}`
    navigate('/Home/Products',{state:{search:searchStr}})
  }

  return (
    <div className="bg-white h-screen">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <BuyerSlider images={images} />
      <Container className="mt-8">
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Shop by Product Category
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={index}>
              <div onClick={()=>handleCategoryClick(category.type)} className=" cursor-pointer">
                <ProductCategory category={category} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
