import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { filterProducts } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";
import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";

export default function BuyerListing() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [search, setSearch] = useState(location?.state?.search ?? "");
  const [companyFilter, setCompanyFilter] = useState([]);

  const [filterSearch, setFilterSearch] = useState('')

  const navigate = useNavigate();


  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    filterProducts(email, search+filterSearch, priceRange).then((resp) => {
      console.log(resp);
      setProducts(resp);
    });
  }, [search, filterSearch, companyFilter]);

  // console.log(products);

  const handleClick = (index, id) => {
    // console.log('kkk',id);
    navigate(`/Home/Products/${index}`, { state: { pid:id } });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1">
        <ProductFilter
          setSearchProduct={setSearchProduct}
          setPriceRange={setPriceRange}
          setFilterSearch={setFilterSearch}
          setCompanyFilter={setCompanyFilter}
        />
        <div className="w-3/4 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                role='button'
                type="button"
                key={product.id}
                onClick={() => handleClick(index, product.id)}
                className=" cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
