import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../Services/auth";
import { getSalesmanById } from "../../Services/salesman";
import SalesmanNavbar from "./SalesmanNavbar";
import SalesmanProductCard from "./SalesmanProductCard";

export default function CreateScheme() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getSalesmanById(email)
      .then((resp) => {
        setProducts(resp?.productTalukaAssignments || []);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        // Optionally set an error state and display it
      });
  }, [email]);

  const handleClick = (index, id) => {
    navigate(`/sales/Scheme/${index}`, { state: { pid: id } });
  };

  if (products.length === 0) {
    return (
      <div>
        <SalesmanNavbar />
        <p className="text-center">No products available. Please check back later.</p>
      </div>
    );
  }

  return (
    <div>
      <SalesmanNavbar />
      <div className="flex flex-wrap ms-16">
        {products.map((product, index) => (
          <div
            key={product.id}
            role="button"
            onClick={() => handleClick(index, product.product.id)}
            className="cursor-pointer grid grid-cols-1 p-4 w-full md:w-1/2 lg:w-1/3"
          >
            <SalesmanProductCard product={product.product} />
          </div>
        ))}
      </div>
    </div>
  );
}
