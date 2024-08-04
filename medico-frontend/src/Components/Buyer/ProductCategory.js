import React from "react";

export default function ProductCategory({ category, onClick }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h2 className="text-xl font-bold text-white mb-2">{category.name}</h2>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm py-1 px-3 rounded-full">
          Explore
        </span>
      </div>
    </div>
  );
}

export function BrandCards({ brand }) {
  return (
    <div className="group relative overflow-hidden rounded-[120px] shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className=" h-36">
        <img
          src={brand?.image}
          alt={brand?.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute  right-0 left-0 bottom-0 p-4">
        <h2 className="text-xl font-bold text-white mb-2 grid place-content-center">
          {brand?.name}
        </h2>
      </div>
    </div>
  );
}
