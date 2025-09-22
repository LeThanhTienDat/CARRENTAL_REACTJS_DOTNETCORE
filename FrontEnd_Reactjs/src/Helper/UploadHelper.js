import { ChangeNameImg } from "./ChangeNameImgHelper";

export const UploadImgToCloudinary = async (file, rawName = null) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "CarRentalApi");
  formData.append("folder", "CARRENTAL_API/Images");

  const newName = ChangeNameImg(rawName);

  if(newName) {
    formData.append("public_id",newName);
  }

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpwseh8x3/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.log(err);
    return null;
  }
};
