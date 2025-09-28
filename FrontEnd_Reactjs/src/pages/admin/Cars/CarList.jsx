import { FaPlus } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import CarForm from "./CarForm";
import { addIndex } from "../../../Helper/AddIndexHelper";
import DeleteConfirm from "./DeleteConfirm";
import { FilterButton } from "../../../Components/admin/FilterButton";

export default function CarList() {
  const [openForm, setOpenForm] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [cars, setCars] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [destroyImg, setDestroyImg] = useState("");

  useEffect(() => {
    fetch("https://localhost:7191/api/Car")
      .then((rep) => rep.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddEdit = async (Car, mode) => {
    const cityRes = await fetch(
      `https://localhost:7191/api/City/${Car.cityId}`
    );
    const cityData = await cityRes.json();

    const districtRes = await fetch(
      `https://localhost:7191/api/District/${Car.districtId}`
    );
    const districtData = await districtRes.json();
    if (mode === "add") {
      try {
        const carWithNames = {
          ...Car,
          cityName: cityData.cityName,
          districtName: districtData.districtName,
        };

        setCars([carWithNames, ...cars]);
      } catch (err) {
        console.log(err);
        setCars([Car, ...cars]); // fallback if fetch fails
      }
    } else if (mode === "edit") {
      try {
        const carWithNames = {
          ...Car,
          cityName: cityData.cityName,
          districtName: districtData.districtName,
        };

        setCars((prevCars) =>
          prevCars.map((c) =>
            c.carId === carWithNames.carId ? carWithNames : c
          )
        );
      } catch (err) {
        console.log(err);
        setCars((prevCars) =>
          prevCars.map((c) => (c.carId === Car.carId ? Car : c))
        );
      }
    }
  };
  // const handleAddCar = (newCar) => {
  //   var carWithOutIndex = [
  //     newCar,
  //     ...cars
  //   ]
  //   var carWithIndex = addIndex(carWithOutIndex, currentPage, carsPerPage);
  //   setCars(carWithIndex);
  // };

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(10);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(cars.length / carsPerPage));
  }, [cars.length, carsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (cars.length === 0) setCurrentPage(1);
  }, [currentPage, totalPages, cars]);

  const currentCars = useMemo(() => {
    const start = (currentPage - 1) * carsPerPage;
    const sliced = cars.slice(start, start + carsPerPage);
    return addIndex(sliced, currentPage, carsPerPage);
  }, [currentPage, carsPerPage, cars]);

  const pageWindow = useMemo(() => {
    const delta = 1;
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (end - start < delta * 2) {
      start = Math.max(1, end - delta * 2);
      end = Math.min(totalPages, start + delta * 2);
    }

    let pages = [];
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }
    return pages;
  }, [currentPage, totalPages]);

  const handleAdd = () => {
    setEditInfo(null);
    setOpenForm(true);
  };
  const handleEdit = (carInfo) => {
    setEditInfo(carInfo);
    setOpenForm(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`https://localhost:7191/api/Car/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Delete successfully");
        await fetch("https://localhost:7191/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(destroyImg),
        });
        setOpenConfirmDelete(false);
        setCars((prev) => prev.filter((car) => car.carId !== deleteId));
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <h1 className="text-bold text-[30px] w-9/10">Cars</h1>
        <div className="w-1/10 float-end">
          <button
            className="bg-blue-400 text-white text-bold text-[21px] px-2 py-1 rounded-md flex flex-row items-center cursor-pointer"
            onClick={() => handleAdd()}
          >
            <FaPlus className="me-2" />
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <FilterButton  children={"Filter by Price Per Day"}/>
        <FilterButton  children={"Filter by Seat Count"}/>
        <FilterButton  children={"Filter by Name"}/>
      </div>
      <div class="overflow-x-auto mt-3">
        <table class="min-w-full border border-gray-300 ">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/24">
                Id
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-2/24">
                Brand
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-5/24">
                Model
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-1/24">
                Seat
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-2/24">
                Price / Day
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-6/24">
                Location
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-2/24">
                Status
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 w-5/24">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {currentCars.map((item) => (
              <tr key={item.carId}>
                <td class="px-4 py-2 text-sm text-gray-800">
                  {item.orderNumber}
                </td>
                <td class="px-4 py-2 text-sm text-gray-800">{item.brand}</td>
                <td class="px-4 py-2 text-sm text-gray-800">{item.model}</td>
                <td class="px-4 py-2 text-sm text-gray-800">
                  {item.seatCount}
                </td>
                <td class="px-4 py-2 text-sm text-gray-800">
                  {item.pricePerDay}
                </td>
                <td class="px-4 py-2 text-sm text-gray-800">
                  {item.address +
                    (item.districtName != null
                      ? ", " + item.districtName
                      : "") +
                    ", " +
                    item.cityName}
                </td>
                <td class="px-4 py-2 text-sm text-gray-800">
                  {item.carStatus}
                </td>
                <td className="flex flex-row gap-3">
                  <button
                    className="bg-yellow-400 px-3 py-1 rounded-md cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500  px-3 py-1 rounded-md text-white cursor-pointer"
                    onClick={() => {
                      setOpenConfirmDelete(true);
                      setDeleteId(item.carId);
                      setDestroyImg(item.image);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex items-center justify-between">
        {/* Left: Items per page */}
        <div className="w-1/19">
          <select
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
            onChange={(e) => setCarsPerPage(Number(e.target.value))}
            value={carsPerPage}
          >
            <option value={2}>2 Items/Page</option> 
            <option value={5}>5 Items/Page</option>
            <option value={10}>10 Items/Page</option>
            <option value={20}>20 Items/Page</option>
          </select>
        </div>

        {/* Page info */}
        <div className="text-sm text-gray-600 w-1/19">
          {`Page ${currentPage} / ${totalPages}`}
        </div>

        {/* Center: Pagination buttons */}
        <div className="flex justify-end space-x-1 w-16/19">
          {/* Prev button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* First page + ellipsis */}
          {pageWindow[0] > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100"
              >
                1
              </button>
              {pageWindow[0] > 2 && (
                <span className="px-3 py-1 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {pageWindow.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                currentPage === item
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}

          {/* Last page + ellipsis */}
          {pageWindow[pageWindow.length - 1] < totalPages && (
            <>
              {pageWindow[pageWindow.length - 1] < totalPages - 1 && (
                <span className="px-3 py-1 text-gray-500">...</span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {openForm && (
        <CarForm
          mode={editInfo ? "edit" : "add"}
          initialValues={
            editInfo || {
              brand: "",
              model: "",
              seatCount: 0,
              color: "",
              licensePlate: "",
              pricePerDay: 0,
              carStatus: "Waiting",
              carTypeId: null,
              cateId: "",
              active: 1,
              address: "",
              carImages: [],
              cityId: null,
              districtId: null,
            }
          }
          onClose={() => setOpenForm(false)}
          onSuccess={handleAddEdit}
          context={editInfo ? "edit" : "add"}
        />
      )}
      {openConfirmDelete && (
        <DeleteConfirm
          handleConfirmDelete={handleConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
        />
      )}
    </div>
  );
}
