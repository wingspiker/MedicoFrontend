import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { cartLength } from "../../Services/cart";

function SalesmanNavbar() {
  return (
    <>
      <div className="flex justify-between ms-14 px-6">
        <h2 className="text-3xl font-semibold text-white my-2 mb-3 mx-3 p-1">
          Scheme
        </h2>
        {/* <FaShoppingCart className="absolute top-0 right-0 mt-3 mr-10 text-white text-3xl" /> */}
        <Link
          to="/sales/Cart"
          className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2 relative me-3 mt-2"
        >
          <IoCartOutline className="text-3xl text-white" />

          {cartLength() > 0 && (
            <span className=" absolute -top-2 -right-2  bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
              {cartLength()}
            </span>
          )}
        </Link>
      </div>
      <hr />
    </>
  );
}

export default SalesmanNavbar;
