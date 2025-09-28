import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryForm from "./categoryForm";

export default function CategoryList() {
  const [cars, setCars] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7265/api/Car")
      .then((rep) => rep.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

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
    return cars.slice(start, start + carsPerPage);
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

  return (
    <div>
      <div className="flex flex-row w-full">
        <h1 className="text-bold text-[30px] w-9/10">Categories</h1>
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
                <td class="px-4 py-2 text-sm text-gray-800">{item.carId}</td>
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
                  <button className="bg-red-500  px-3 py-1 rounded-md text-white cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row mt-5 items-center gap-4">
          <div className="w-5/10">
            <select
              name=""
              id=""
              value={carsPerPage}
              onChange={(e) => setCarsPerPage(Number(e.target.value))}
              className="border-1 px-3 py-1 rounded-md"
            >
              <option value={2}>2 items/Page</option>
              <option value={5}>5 items/Page</option>
              <option value={10}>10 items/Page</option>
            </select>
          </div>

          <div className="w-2/10 text-end">
            <h3 className="text-bold text-[20px] text-gray-700">
              Page {currentPage} / {totalPages}
            </h3>
          </div>

          <div className="flex float-end space-x-2 w-3/10">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* If first page isn't in window */}
            {pageWindow[0] > 1 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  1
                </button>
                {pageWindow[0] > 2 && <span className="px-2">…</span>}
              </>
            )}

            {/* Page numbers */}
            {pageWindow.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === item
                    ? "bg-gray-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

            {/* If last page isn't in window */}
            {pageWindow[pageWindow.length - 1] < totalPages && (
              <>
                {pageWindow[pageWindow.length - 1] < totalPages - 1 && (
                  <span className="px-2">…</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {openForm && (
        <CategoryForm
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
              carTypeName: "Gasolin",
              active: 1,
              address: "",
              image: "",
              cityId: null,
              districtId: null,
            }
          }
          onClose={()=>setOpenForm(false)}
        />
      )}
    </div>
  );
}
