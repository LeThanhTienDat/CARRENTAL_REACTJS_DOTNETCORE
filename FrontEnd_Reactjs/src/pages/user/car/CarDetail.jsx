import React, { useEffect, useState } from "react";
import Header from "../../../Components/user/template/header/Header";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FormatCurrency } from "../../../Helper/formatCurrency";
import DateTimeForm from "../../../Components/user/Form/DateTimeForm";


export default function CarDetail() {
  const { slug, id } = useParams();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hireTime, setHireTime] = useState(() => endDate - startDate);

  const [currentCar, setCurrentCar] = useState(null);
  useEffect(() => {
    fetch(`https://localhost:7191/api/Car/slug/${slug}/${id}`)
      .then((rep) => rep.json())
      .then((data) => setCurrentCar(data))
      .catch((err) => console.log(err));
  }, [slug, id]);

  return currentCar == null ? (
    <>
      <Header />
      <h1>Loading ...</h1>
    </>
  ) : (
    <>
      <Header />
      <div className="xl:px-[300px]">
        <div className="flex flex-row gap-5">
          <div className="w-1/3">
            <h1 className="font-bold text-[30px]">{currentCar.model}</h1>
            <span className="flex flex-row items-center text-[24px] mb-5">
              <IoLocationOutline />{" "}
              {currentCar.districtName + ", " + currentCar.cityName}
            </span>
            <div className=" border-1 border-gray-300 rounded-lg w-full bg-[#f7fbff]">
              <div className="flex flex-row gap-1 items-center px-3 my-3">
                <h1 className="font-bold text-[23px] text-[#8cd289]">
                  {FormatCurrency(currentCar.pricePerDay)}
                </h1>
                <span>/Ngày</span>
              </div>
              <div className="flex flex-row mx-3 rounded-lg border-1 border-gray-300 bg-white py-3">
                <button className="w-1/2 border-r border-gray-300 flex flex-col cursor-pointer" onClick={()=>setOpenDatePicker(true)}>
                  <h2 className="font-bold">Nhận xe</h2>
                  <div className="flex flex-row items-center justify-center gap-5">
                    <h2>27/9/2025</h2>
                    <h2>21:00</h2>
                  </div>
                </button>
                <button className="w-1/2 flex flex-col cursor-pointer">
                  <h2 className="font-bold">Trả xe</h2>
                  <div className="flex flex-row items-center justify-center gap-5">
                    <h2>27/9/2025</h2>
                    <h2>21:00</h2>
                  </div>
                </button>
              </div>
              <div className="mx-3 my-3 border-b pb-5 border-gray-300">
                <h1 className="font-bold mb-3">Địa điểm giao nhận xe</h1>
                <div className="flex flex-col bg-white rounded-lg p-5 border-1 border-gray-300">
                  <div className="flex flex-row gap-3 items-center">
                    <input type="radio" />
                    <label htmlFor="">
                      Tôi tự đến lấy xe{" "}
                      <span className="bg-[#5fcf86] px-3 py-1 rounded-lg">
                        Miễn phí
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <IoLocationOutline />
                    <h1 htmlFor="">{currentCar.districtName + ", "+currentCar.cityName}</h1>
                  </div>
                </div>
              </div>
              <div className="mx-3 flex flex-row items-center">
                <h1 className="font-bold w-1/2">Đơn giá thuê</h1>
                <p className="w-1/2 text-end">{currentCar.pricePerDay} /Ngày</p>
              </div>
            </div>
          </div>
          <div className="w-2/3">
            <img src={currentCar.image} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
      {
        openDatePicker && (
            <DateTimeForm />
        )
      }
    </>
  );
}
