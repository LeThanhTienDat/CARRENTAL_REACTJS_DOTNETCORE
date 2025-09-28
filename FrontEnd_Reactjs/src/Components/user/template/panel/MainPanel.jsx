import React from "react";
import Carousel from "../../carousel/Carousel";
import { FaCarAlt } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowDropdownCircle } from "react-icons/io";

export default function MainPanel() {
  const panelList = [
    "./img/Raptor-texted.png",
    "./img/car-rental-social-media-thumbnail-template-flat-cartoon-background-illustration-vector.jpg",
    "./img/PanelImg_1.jpg",
  ];
  return (
    <>
      <div className="w-full xl:px-[300px] mt-5 flex flex-col items-center realtive">
        <Carousel>
          {panelList.map((item, index) => (
            <div key={index} className="h-[722px] w-full flex-shrink-0">
              <img
                src={item}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
        <div className="w-full h-[80px]  flex items-center justify-center relative">
          <div className="absolute shadow-2xl bottom-27 xl:w-3/5  flex flex-row h-full rounded-lg bg-white border-gray-500 pb-3">
            <div className="flex flex-row items-center rounded-tl-lg justify-between w-1/3 h-full border-r  bg-[#5fcf86] text-[#fffff7] font-bold text-[25px]">
              <a
                href=""
                type="button"
                className="text-center w-full flex flex-row items-center justify-between  sm:p-5 2xl:p-15"
              >
                <GiSteeringWheel />
                Xe tự lái
              </a>
            </div>
            <div className="flex flex-row items-center rounded-tl-lg justify-between w-1/3 h-full border-r text-[#c6c6c9] font-bold text-[25px]">
              <a
                href=""
                type="button"
                className="text-center w-full flex flex-row items-center justify-between xl:p-0 2xl:p-10"
              >
                <FaCarAlt />
                Xe có tài xế
              </a>
            </div>
            <div className="flex flex-row items-center rounded-tl-lg justify-between w-1/3 h-full border-r text-[#c6c6c9] font-bold text-[25px]">
              <a
                href=""
                type="button"
                className="text-center w-full flex flex-row items-center justify-between p-4"
              >
                <CiCalendarDate />
                Thuê xe dài hạn
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 w-full lg:w-2/3 shadow-[-4px_-4px_10px_rgba(0,0,0,0.3)] bg-white flex flex-row justify-between items-center h-full rounded-lg">
            <div className="flex flex-row w-1/3 p-2">
              <div className="w-1/5 flex items-center justify-between pl-3">
                <CiLocationOn size={30} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-bold text-[#c6c6c9]">Địa Điểm</label>
                <div className="flex flex-row items-center justify-between gap-5">
                  <h3>Tp Hồ Chí Minh</h3>
                  <IoMdArrowDropdownCircle className="text-[#c6c6c9]"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
