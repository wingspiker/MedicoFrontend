import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function SalesmanNavbar() {
  return (
    <div className="flex-1 ms-14 relative">
      <h2 className="text-3xl font-semibold text-white my-2 mb-3 mx-3 p-1">
        Scheme
      </h2>
      <FaShoppingCart className="absolute top-0 right-0 mt-3 mr-10 text-white text-3xl" />
      <hr />
    </div>
  );
}

export default SalesmanNavbar;
