import React, { useState } from "react";
import { PiSeatbeltFill } from "react-icons/pi";
import { PiGasCanThin } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { FormatCurrency } from "../../../Helper/formatCurrency";


export default function CarCard(prop) {
  const [discount, setDiscount] = useState(true);
  return (
    <div className="w-full border-1 rounded-lg border-gray-300 min-h-[350px] p-5 flex flex-col items-center">
      <div className="w-[270px] h-[200px] border-1 rounded-lg border-gray-300 relative">
        <img src={prop.image} alt="" className="h-full w-full object-cover rounded-lg" />
        <span
          className={`absolute right-5 top-[180px] bg-orange-300 px-4 py-1 rounded-full ${
            discount ? "block" : "hidden"
          } `}
        >
          Discount {prop.discount} %
        </span>
      </div>
      <div className="flex flex-col mt-5 w-full gap-2">
        <div className="flex mb-1">
          <h1 className="font-bold text-lg truncate w-full">{prop.model}</h1>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-2/3 flex flex-row gap-1 items-center">
            <PiSeatbeltFill />
            {prop.seatCount} Chỗ
          </div>
          <div className="w-1/3 flex felx-row items-center gap-1 ">
            <PiGasCanThin />
            {prop.carTypeName}
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center border-b border-gray-300 pb-2">
            <IoLocationSharp />
            <h1>{prop.districtName +", "+prop.cityName}</h1>
        </div>
        <div className="flex flex-row gap-1 items-center">
            <h1 className="font-bold text-[23px] text-[#8cd289]">{FormatCurrency(prop.pricePerDay)}</h1>
            <span>/Ngày</span>
        </div>
      </div>
    </div>
  );
}
