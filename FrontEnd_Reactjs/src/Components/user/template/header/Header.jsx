import React, { useState } from "react";
import Button1 from "../../../common/Button1";
import { FaBars } from "react-icons/fa6";

export default function Header({ Login }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="flex flex-row px-[50px] lg:px-[100px] xl:px-[300px] py-1">
        <a
          href="#"
          className="page-logo cursor-pointer w-2/4 flex flex-row gap-3 items-center"
        >
          <img src="/img/main_logo.png" alt="" height={70} width={70} />
          <h1 className="font-bold text-[37px] text-[#5fcf86]">Green Rental</h1>
        </a>
        <div className="ml-auto flex items-center font-bold">
          <ul className="hidden lg:flex">
            <li className="px-3">
              <a href="" className="hover:text-gray-500">
                Về chúng tôi
              </a>
            </li>
            <li className="pl-5 border-r border-gray-300 px-3">
              <a href="" className="hover:text-gray-500">
                Thuê xe ngay
              </a>
            </li>
            <li>
              <a type="button" href="" className="hover:text-gray-500 px-3">
                Đăng Ký
              </a>
            </li>
            <li>
              <a
                type="button"
                className="rounded-md border-2 px-3 py-3 cursor-pointer hover:text-white hover:bg-gray-500"
                onClick={Login}
              >
                Đăng Nhập
              </a>
            </li>
          </ul>
          <FaBars
            className="lg:hidden font-bold text-[45px]"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
      </div>
      <div
        className={`flex flex-col px-[50px] mt-8 transition-all duration-500 ease-in-out transform
    ${
      openMenu
        ? "opacity-100 translate-y-0 max-h-[500px]"
        : "opacity-0 -translate-y-5 max-h-0 overflow-hidden"
    }
  `}
      >
        <div className="font-bold p-5 lg:hidden shadow-lg rounded-lg">
          <ul className="flex flex-col items-center justify-between gap-7">
            <li className="border-b border-gray-700">
              <a href="" className="hover:text-gray-500">
                Về chúng tôi
              </a>
            </li>
            <li className="border-b border-gray-700">
              <a href="">Thuê xe ngay</a>
            </li>
            <li className="border-b border-gray-700">
              <a type="button" href="" className="hover:text-gray-500">
                Đăng Ký
              </a>
            </li>
            <li>
              <button
                type="button"
                className="rounded-md border-2 px-3 py-3 hover:text-white hover:bg-gray-500"
                onClick={Login}
              >
                Đăng Nhập
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
