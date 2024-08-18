import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { cn } from "../../lib/cn";

export default function CustomButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        `flex items-center justify-center bg-cyan-600 text-white px-4 py-2 rounded-xl`,
        className
      )}
    >
      {children}
    </button>
  );
}
