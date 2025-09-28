import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";

export default function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7191/api/Car/TopCar")
      .then((rep) => rep.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 lg:px-[300px]">
      {cars.map((car, index) => (
        <Link
          key={index}
          className="cursor-pointer"
          to={`/car/slug/${car.slug}`}
        >
          <CarCard
            image={car.carImages[0]?.image}
            model={car.model}
            seatCount={car.seatCount}
            carTypeName={car.carTypeName}
            cityName={car.cityName}
            districtName={car.districtName}
            pricePerDay={car.pricePerDay}
          />         
        </Link>
      ))}
    </div>
  );
}
