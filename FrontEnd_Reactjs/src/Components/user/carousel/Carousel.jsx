import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function Carousel({ children: panelList }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((curr) => (curr === 0 ? panelList.length - 1 : curr - 1));
  const next = () =>
    setCurrent((curr) => (curr === panelList.length - 1 ? 0 : curr + 1));

  return (
    <div className="overflow-hidden relative h-[722px] w-full rounded-lg">
      <div className="flex flex-col transition-transform ease-out duration-500 h-full" style={{transform:`translateY(-${current * 100}%)`}}>{panelList}</div>
      <div className="text-[50px] text-gray-400  absolute inset-0 right-0 top-35">
        <div className="flex flex-col items-end mr-5 h-4/5 justify-between">
          <button
            className="w-[80px] cursor-pointer rounded-full hover:bg-white/60"
            onClick={prev}
          >
            <IoIosArrowDropupCircle size={80} />
          </button>
          <button
            className="w-[80px] cursor-pointer rounded-full hover:bg-white/60"
            onClick={next}
          >
            <IoIosArrowDropdownCircle size={80} />
          </button>
        </div>
      </div>
    </div>
  );
}
