import React from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Product(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;

  const onAddProduct = () => {
    navigate("/Product/add");
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      {/* <Sidebar /> Add the Sidebar component */}
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddProduct}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Product
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
