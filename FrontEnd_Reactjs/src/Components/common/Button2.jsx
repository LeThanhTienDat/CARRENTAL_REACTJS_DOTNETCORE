import React, { Children } from "react";

export default function Button2({ children }) {
  return (
    <>
      <button className="bg-[#5fcf86] text-white shadow-md hover:shadow-lg hover:shadow-gray-300 transition-shadow duration-200-gray-300 text-[21px] px-3 py-1 rounded-md cursor-pointer">
        {children}
      </button>
    </>
  );
}
