import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { filterProducts } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";
import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";

export default function BuyerListing() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const location = useLocation();
  const search = location?.state?.search ?? "";

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    filterProducts(email, search, priceRange).then((resp) => {
      console.log(resp);
      setProducts(resp);
    });
  }, [search, priceRange, email]);

  console.log(products);

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1">
        <ProductFilter
          setSearchProduct={setSearchProduct}
          setPriceRange={setPriceRange}
        />
        <div className="w-3/4 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
