import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function DateTimeForm() {
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-2/8">
          <div className="w-full flex flex-row justify-end">
            <button className="cursor-pointer">
              <IoMdCloseCircleOutline size={30} className="text-gray-500" />
            </button>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <h2 className="font-bold text-[30px]">Thời gian</h2>
          </div>
          <form className="w-full bg-white rounded-sm border-gray-500 min-h-2/3 px-10 flex flex-col pb-5"></form>
        </div>
      </div>
    </>
  );
}
