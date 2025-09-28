import { useFormik } from "formik";
import { string, object, number, mixed } from "yup";

export default function CategoryForm({ initialValues, onClose, mode }) {
  const validator = object({
    brand: string().required(),
    model: string().required(),
    seatCount: number().required().min(2).max(50),
    color: string().required(),
    licensePlate: string().required(),
    pricePerDay: number().required().min(1000).max(100000000),
    carStatus: string().required(),
    carTypeName: string().required(),
    image: mixed().required(),
    active: number().required(),
    address: string().required(),
    cityId: number().required(),
    districtId: number().required(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      if (mode === "add") {
        console.log("Add form.");
      } else {
        console.log("Edit form.");
      }
      onClose();
    },
    validationSchema: validator,
    enableReinitialize: true,
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = formik;

  const AddCar = (data) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/5">
        <h2 className="text-xl font-bold mb-4">Add New Car</h2>
        <form
          className="w-full bg-white rounded-sm border-gray-500 min-h-2/3 flex flex-col pb-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <input
                value={formik.values.brand}
              type="text"
              name="brand"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Brand"
              className="pl-2 py-2 border-b border-gray-400 w-full"
            />
            <span className="pl-2 block errorMess text-sm text-red-500 min-h-[20px]">
              {touched.brand && errors.brand ? errors.brand : undefined}
            </span>
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={formik.values.model}
              placeholder="Model"
              onBlur={handleBlur}
              onChange={handleChange}
              name="model"
              className="pl-2 py-2 border-b border-gray-400 w-full"
            />
            <span className="pl-2 block errorMess text-sm text-red-500 min-h-[20px]">
              {touched.model && errors.model ? errors.model : undefined}
            </span>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 me-3">
              <div className="relative">
                <input
                  type="text"
                  value={formik.values.licensePlate}
                  name="licensePlate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="License Plate"
                  className="pl-2 py-2 border-b border-gray-400 w-full"
                />
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.licensePlate && errors.licensePlate
                  ? errors.licensePlate
                  : undefined}
              </span>
            </div>
            <div className="w-1/2 ms-1">
              <div className="relative">
                <input
                  type="number"
                  value={formik.values.seatCount}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="seatCount"
                  placeholder="Seat Count"
                  className="pl-2 py-2 border-b border-gray-400 w-full"
                />
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.seatCount && errors.seatCount
                  ? errors.seatCount
                  : undefined}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 me-3">
              <div className="relative">
                <span className="text-gray-600 absolute inset-y-0 right-1 flex items-center">
                  <h1 className="font-bold">VND</h1>
                </span>
                <input
                  type="number"
                  value={formik.values.pricePerDay}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Price Per Day"
                  name="pricePerDay"
                  className="pl-2 py-2 border-b border-gray-400 w-full"
                />
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.pricePerDay && errors.pricePerDay
                  ? errors.pricePerDay
                  : undefined}
              </span>
            </div>

            <div className="w-1/2 ms-1">
              <div className="relative">
                <select
                  name="carStatus"
                  value={formik.values.carStatus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600 h-10"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintain">Maintain</option>
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.carStatus && errors.carStatus
                  ? errors.carStatus
                  : undefined}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 me-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Color"
                  name="color"
                  value={formik.values.color}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="pl-2 py-2 border-b border-gray-400 w-full h-10"
                />
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.color && errors.color ? errors.color : undefined}
              </span>
            </div>

            <div className="w-1/2 ms-1">
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  className=" block w-full text-sm text-gray-700 
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0  
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-600
                                  hover:file:bg-blue-100"
                />
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.image && errors.image ? errors.image : undefined}
              </span>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 me-3">
              <div className="relative">
                <select
                  name="carTypeName"
                  value={formik.values.carTypeName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600 h-10"
                >
                  <option value="Gasolin">Gasolin</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.carTypeName && errors.carTypeName
                  ? errors.carTypeName
                  : undefined}
              </span>
            </div>

            <div className="w-1/2 ms-1">
              <div className="relative">
                <select
                  name="active"
                  value={formik.values.active}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600 h-10"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.active && errors.active ? errors.active : undefined}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Address"
                value={formik.values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                name="address"
                className="pl-2 py-2 border-b border-gray-400 w-full"
              />
            </div>
            <span className="block errorMess text-sm text-red-500 min-h-[20px]">
              {touched.address && errors.address ? errors.address : undefined}
            </span>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 me-3">
              <div className="relative">
                <select
                  name="cityId"
                  value={formik.values.cityId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600"
                >
                  <option value={null} disabled selected hidden>
                    Select City
                  </option>
                  <option value={1}>SAIGON</option>
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.cityId && errors.cityId ? errors.cityId : undefined}
              </span>
            </div>

            <div className="w-1/2 ms-1">
              <div className="relative">
                <select
                  name="districtId"
                  value={formik.values.districtId}
                  id=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600"
                >
                  <option value={null} disabled selected hidden>
                    Select District
                  </option>
                  <option value={1}>QUAN7</option>
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.districtId && errors.districtId
                  ? errors.districtId
                  : undefined}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
