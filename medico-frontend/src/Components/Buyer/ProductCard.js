import React from "react";
import { BadgeCheck, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={
            product?.photoUrl
              ? product?.photoUrl
              : "https://placehold.co/600x400/EEE/31343C"
          }
          alt={product.drugName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">
          {product.manufacturerName}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.drugName}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {product.contents && product.contents.length > 50
            ? product.contents.substring(0, 40) + "..."
            : product.contents}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.sellingPrice}
          </span>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl flex items-center space-x-1 hover:bg-blue-700 transition duration-300">
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      {/* <div className="bg-gray-100 px-4 py-2 mt-2">
        <div className="flex items-center text-green-600">
          <BadgeCheck size={18} className="mr-1" />
          <span className="text-sm font-medium">In Stock</span>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCard;
