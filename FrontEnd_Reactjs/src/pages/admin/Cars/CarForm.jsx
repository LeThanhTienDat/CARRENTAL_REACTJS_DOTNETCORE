import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { string, object, number, mixed, array } from "yup";
import { UploadImgToCloudinary } from "../../../Helper/UploadHelper";
import { RemoveCloudImg } from "../../../Helper/RemoveCloudImgHelper";
import { CiWarning } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

export default function CarForm({ initialValues, onClose, mode, onSuccess }) {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [category, setCategory] = useState([]);
  const [carType, setCarType] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [countFileChange, setCountFileChange] = useState(0);
  useEffect(() => {
    if (initialValues?.carImages && mode == "edit") {
      setPreview(initialValues.carImages);
      setCarImages(initialValues.carImages);
    }
  }, [initialValues, mode]);
  useEffect(() => {
    console.log("carImages updated:", carImages);
  }, [carImages]);
  useEffect(() => {
    fetch("https://localhost:7191/api/City")
      .then((rep) => rep.json())
      .then((data) => {
        setCity(data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (mode === "edit" && initialValues?.cityId) {
      const fetchDistrict = async () => {
        try {
          const res = await fetch(
            `https://localhost:7191/api/District/get-by-cityid/${initialValues.cityId}`
          );
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setDistrict(data);
          } else {
            setDistrict([]);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchDistrict();
    }
  }, [mode, initialValues?.cityId]);
  useEffect(() => {
    fetch("https://localhost:7191/api/Category")
      .then((rep) => rep.json())
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch("https://localhost:7191/api/CarType")
      .then((rep) => rep.json())
      .then((data) => setCarType(data))
      .catch((err) => console.log(err));
  }, []);

  const validator = object({
    brand: string().required(),
    model: string().required(),
    seatCount: number().required().min(2).max(50),
    color: string().required(),
    licensePlate: string().required(),
    pricePerDay: number().required().min(1000).max(100000000),
    carStatus: string().required(),
    carTypeId: number().required(),
    cateId: number().required(),
    // carImages: array()
    //   .min(1, "At least one image is required")
    //   .required("At least one image is required"),
    tblCarImages: array().test(
      "carImages-required",
      "At least one image is required",
      function (value) {
        if (mode === "add") {
          return value && value.length > 0;
        }
        return true;
      }
    ),
    active: number().required(),
    address: string().required(),
    cityId: number().required(),
  });

  useEffect(() => {
    if (initialValues?.image) {
      setPreview(initialValues.image);
    }
  }, [initialValues]);
  const handleUpload = async (file) => {
    if (!file) return;

    const rawName = file.name;
    const url = await UploadImgToCloudinary(file, rawName);
    return url;
  };
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);
      setCarImages((prev) => [...prev, ...selectedFiles]);
      setPreview((prev) => [
        ...prev,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ]);
      await setFieldValue("tblCarImages", [
        ...formik.values.tblCarImages,
        ...selectedFiles,
      ]);
      setFieldTouched("tblCarImages", true);
    }
  };
  useEffect(() => {
    const check = preview.filter(
      (item) => typeof item === "string" && item.startsWith("blob:")
    );
    console.log(check);
  }, [preview]);
  const removeImage = (imgIndex) => {
    setCarImages((prev) => prev.filter((_, index) => index != imgIndex));
    setPreview((prev) => prev.filter((_, index) => index != imgIndex));
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (data) => {
      try {
        if (mode === "add") {
          if (data.tblCarImages && data.tblCarImages.length > 0) {
            const urls = await Promise.all(
              data.tblCarImages.map((carImage) => handleUpload(carImage))
            );
            data.tblCarImages = urls.map((url) => ({ image: url }));
            console.log(data);
          }

          const res = await fetch("https://localhost:7191/api/Car", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Add new Car failed!");
          const newCar = await res.json();
          console.log(newCar);

          if (res.status === 201) {
            alert("Add success!");
            if (typeof onSuccess === "function") onSuccess(newCar, "add");
          }
          console.log(data);
        } else if (mode === "edit") {
          const initImages = initialValues.carImages;
          const prepareUploadItems = carImages.filter(
            (item) => item instanceof File
          );
          const keepItems = carImages.filter((item) => !(item instanceof File));
          const prepareRemoveItems = initImages.filter(
            (initItem) =>
              !preview.some(
                (p) => typeof p === "object" && p.image === initItem.image
              )
          );
          const removedImageResult = await Promise.all(
            prepareRemoveItems.map((item) => RemoveCloudImg(item.image))
          );
          console.log("remove result:", removedImageResult);
          const newUrls = await Promise.all(
            prepareUploadItems.map((carImage) => handleUpload(carImage))
          );
          console.log(newUrls);
          const newImages = [
            ...keepItems.map((item) => item.image),
            ...newUrls,
          ];
          console.log("new urls:", newImages);

          data.tblCarImages = newImages.map((image) => ({ image: image }));
          const resOfRemoveAllDatabaseImages = await fetch(
            `https://localhost:7191/api/CarImages/${data.carId}`,
            {
              method: "DELETE",
            }
          );
          if (resOfRemoveAllDatabaseImages.ok) {
            const res = await fetch(
              `https://localhost:7191/api/Car/${data.carId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            if (!res.ok) throw new Error("Add new Car failed!");
            const editedCar = await res.json();
            if (res.status === 200) {
              alert("Update success!");
              if (typeof onSuccess === "function") onSuccess(editedCar, "edit");
            }
          }
        }
      } catch (err) {
        console.log(err);
        alert(err.message || "something when wrong!");
      } finally {
        setCarImages([]);
        onClose();
      }
      // console.log(data);
    },
    validationSchema: validator,
    enableReinitialize: true,
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
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
                <span className="text-gray-600 absolute inset-y-0 right-5 flex items-center">
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

          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="relative">
                <select
                  name="cateId"
                  value={formik.values.cateId}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("cateId", Number(e.target.value));
                  }}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600"
                >
                  <option value="" disabled>
                    Chose Category
                  </option>
                  {category.map((item) => (
                    <option key={item.cateId} value={item.cateId}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.cateId && errors.cateId ? errors.cateId : undefined}
              </span>

              <div className="relative">
                <select
                  name="carTypeId"
                  value={formik.values.carTypeId || ""}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("carTypeId", Number(e.target.value));
                  }}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600 h-10"
                >
                  <option value="" disabled>
                    Chose Car's Type
                  </option>
                  {carType.map((item) => (
                    <option key={item.carTypeId} value={item.carTypeId}>
                      {item.carTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.carTypeId && errors.carTypeId
                  ? errors.carTypeId
                  : undefined}
              </span>

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
              <div className="relative">
                <select
                  name="cityId"
                  value={formik.values.cityId}
                  onBlur={handleBlur}
                  onChange={async (e) => {
                    handleChange(e);
                    const selectedCityId = Number(e.target.value);
                    setFieldValue("cityId", selectedCityId);
                    setFieldValue("districtId", null);
                    try {
                      const res = await fetch(
                        `https://localhost:7191/api/District/get-by-cityid/${selectedCityId}`
                      );
                      const data = await res.json();
                      if (Array.isArray(data) && data.length > 0) {
                        setDistrict(data);
                        console.log(data);
                      } else {
                        setDistrict([]);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  id=""
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600"
                >
                  <option value="" disabled selected hidden>
                    Select City
                  </option>
                  {city.map((item) => (
                    <option key={item.cityId} value={item.cityId}>
                      {item.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.cityId && errors.cityId ? errors.cityId : undefined}
              </span>
              <div className="relative">
                <select
                  name="districtId"
                  value={formik.values.districtId}
                  id=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="pl-1 py-2 border-b border-gray-400 w-full text-gray-600"
                >
                  <option value="" disabled selected hidden>
                    Select District
                  </option>
                  {district.map((item) => (
                    <option key={item.districtId} value={item.districtId}>
                      {item.districtName}
                    </option>
                  ))}
                </select>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                {touched.districtId && errors.districtId
                  ? errors.districtId
                  : undefined}
              </span>
              <div className="flex justify-end gap-2 mt-10">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
                  onClick={() => {
                    setCarImages([]);
                    setPreview([]);
                    onClose();
                  }}
                  type="button"
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
            </div>
            <div className="w-1/2 me-3">
              <div className="ms-3  ">
                <div className="relative">
                  <label htmlFor="">
                    <input
                      disabled={carImages.length == 4 ? true : false}
                      type="file"
                      multiple
                      name="tblCarImages"
                      onChange={(e) => {
                        if (mode === "edit")
                          setCountFileChange((prev) => prev + 1);
                        handleFileChange(e);
                      }}
                      className=" block w-full text-sm text-gray-700 
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-blue-50 file:text-blue-600
                                  hover:file:bg-blue-100"
                    />
                  </label>
                </div>
                {mode === "edit" && (
                  <p className="text-red-600 text-sm mt-1">
                    ❗ If you want to change the image, please choose a new one.
                  </p>
                )}
                <span className="block errorMess text-sm text-red-500 min-h-[20px]">
                  {touched.tblCarImages && errors.tblCarImages
                    ? errors.tblCarImages
                    : undefined}
                </span>
              </div>
              <div className="w-1/2 flex flex-row items-center justify-center mx-4 px-1 rounded-lg bg-red-300">
                <CiWarning /> Maximum 4 images
              </div>
              {preview && mode == "add" && (
                <div className="grid grid-cols-2 grid-rows-2 items-center justify-between m-4 w-full gap-3">
                  {preview.map((item, index) => (
                    <div className="rounded-lg relative" key={index}>
                      <img
                        src={item}
                        alt=""
                        className="min-h-[130px] rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 cursor-pointer text-white"
                      >
                        <MdCancel size={30} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {preview && mode == "edit" && (
                <div className="grid grid-cols-2 grid-rows-2 items-center justify-between m-4 w-full gap-3">
                  {preview.map((item, index) => (
                    <div className="rounded-lg relative" key={index}>
                      <img
                        src={item.image || item}
                        alt=""
                        className="min-h-[130px] rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 cursor-pointer text-white"
                      >
                        <MdCancel size={30} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
