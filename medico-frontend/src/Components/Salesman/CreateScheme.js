import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../Services/auth";
import { getSalesmanById } from "../../Services/salesman";
import SalesmanNavbar from "./SalesmanNavbar"; // Adjust the path as necessary
import SalesmanProductCard from "./SalesmanProductCard"; // Adjust the path as necessary

export default function CreateScheme() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getSalesmanById(email)
      .then((resp) => {
        setProducts(resp?.assignedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  const handleClick = (index, id) => {
    // console.log('kkk',id);
    navigate(`/sales/Scheme/${index}`, { state: { pid: id } });
  };

  return (
    <div>
      <SalesmanNavbar />

      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <div
            role="button"
            type="button"
            key={product.id}
            onClick={() => handleClick(index, product.id)}
            className=" cursor-pointer"
          >
            <SalesmanProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
