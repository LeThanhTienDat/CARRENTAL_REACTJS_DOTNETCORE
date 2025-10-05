import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowDown } from "react-icons/fa6";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { TimePicker } from "antd";
import "@ant-design/v5-patch-for-react-19";
import dayjs from "dayjs";
import Button1 from "../../common/Button1";
import Button2 from "../../common/Button2";

export default function DateTimeForm({ onClose, onConfirm }) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [startTime, setStartTime] = useState(dayjs("12:00", "HH:mm"));
  const [returnTime, setReturnTime] = useState(dayjs("12:30", "HH:mm"));
  const handleSelectDate = (dateRange) => {
    setDateRange(dateRange.selection);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-50 xl:mt-20 sm:w-6/8 xl:w-4/8">
          <div className="w-full flex flex-row justify-end">
            <button className="cursor-pointer">
              <IoMdCloseCircleOutline
                size={30}
                className="text-gray-500"
                onClick={() => onClose(false)}
              />
            </button>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <h2 className="font-bold text-[30px]">Thời gian thuê</h2>
          </div>
          <form className="w-full bg-white rounded-sm border-gray-500 min-h-2/3 px-10 flex flex-col pb-5 relative">
            <div className="grid grid-cols-[60%_40%]">
              <div className="text-center">
                <h1 className="m-5 font-bold text-[21px]">Ngày</h1>
                <DateRangePicker
                  ranges={[dateRange]}
                  className="w-full"
                  onChange={handleSelectDate}
                  minDate={new Date()}
                />
              </div>
              <div className="text-center grid grid-rows-2 relative">
                <FaArrowDown className="absolute inset-0 top-45 left-39" />
                <div className="text-center w-full">
                  <h1 className="m-5 font-bold text-[21px]">Giờ nhận xe</h1>
                  <TimePicker
                    className="w-2/3 h-12"
                    value={startTime}
                    onChange={(time) => setStartTime(time)}
                    format="HH:mm"
                    minuteStep={30}
                    placeholder="Chọn giờ"
                    needConfirm={true}
                  />
                </div>
                <div>
                  <h1 className="m-5 font-bold text-[21px]">Giờ trả xe</h1>
                  <TimePicker
                    className="w-2/3 h-12"
                    value={returnTime}
                    onChange={(time) => setReturnTime(time)}
                    format="HH:mm"
                    minuteStep={30}
                    placeholder="Chọn giờ"
                    needConfirm={true}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#f3f2f2] rounded-lg flex flex-col gap-3 mx-10 p-2">
              <div className="flex flex-row items-center justify-between px-10">
                <h1>Thời gian nhận xe</h1>
                <h1>
                  {dayjs(dateRange.startDate).format("DD/MM/YYYY") +
                    " " +
                    startTime.format("HH:mm")}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between px-10">
                <h1>Thời gian trả xe</h1>
                <h1>
                  {dayjs(dateRange.endDate).format("DD/MM/YYYY") +
                    " " +
                    returnTime.format("HH:mm")}
                </h1>
              </div>
            </div>
            <div className="flex flex-row items-end justify-end px-10 mt-5 gap-3">
              <button
                className="bg-[#5fcf86] text-white shadow-md hover:shadow-lg hover:shadow-gray-300 transition-shadow duration-200-gray-300 text-[21px] px-3 py-1 rounded-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const data = {
                    startDate: dayjs(dateRange.startDate).format("DD/MM/YYYY"),
                    endDate: dayjs(dateRange.endDate).format("DD/MM/YYYY"),
                    startTime: startTime.format("HH:mm"),
                    returnTime: returnTime.format("HH:mm"),
                  };
                  onConfirm(data);
                }}
              >
                Xác nhận
              </button>
              <button
                onClick={() => onClose(false)}
                className="bg-[#5fcf86] text-white shadow-md hover:shadow-lg hover:shadow-gray-300 transition-shadow duration-200-gray-300 text-[21px] px-3 py-1 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
