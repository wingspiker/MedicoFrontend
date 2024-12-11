import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { cn } from "../../lib/cn";

export default function CustomButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        `flex items-center justify-center bg-cyan-600 text-cyan-50 px-4 py-2 rounded-full hover:bg-cyan-800  hover:text-white focus:bg-cyan-800 focus:outline-none`,
        className
      )}
    >
      {children}
    </button>
  );
}
