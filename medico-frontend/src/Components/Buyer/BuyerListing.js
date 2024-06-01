// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { filterProducts } from "../../Services/buyer";
// import { decodeToken } from "../../Services/auth";
// import Navbar from "./Navbar";
// import ProductFilter from "./ProductFilter";
// import ProductCard from "./ProductCard";

// export default function BuyerListing() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const location = useLocation();

//   const search = location?.state?.search ?? "";

//   const user = decodeToken();
//   const keys = Object.keys(user);
//   const email = user[keys.find((k) => k.endsWith("emailaddress"))];

//   useEffect(() => {
//     filterProducts(email, search).then((resp) => {
//       console.log(resp);
//       setProducts(resp);
//     });
//   }, [search]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//     console.log("Added to cart:", product);
//   };

//   return (
//     <div className="h-screen bg-white flex">
//       <Navbar />

//       <ProductFilter setFilters={setProducts} />
//       <div className="w-3/4 p-4">
//         <div className="grid grid-cols-3 gap-4">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               addToCart={addToCart}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { filterProducts } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";
import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";

export default function BuyerListing() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const search = location?.state?.search ?? "";

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    filterProducts(email, search).then((resp) => {
      console.log(resp);
      setProducts(resp);
    });
  }, [search]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Added to cart:", product);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1">
        <ProductFilter setFilters={setProducts} />
        <div className="w-3/4 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
