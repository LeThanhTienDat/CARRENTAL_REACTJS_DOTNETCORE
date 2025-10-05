import { getPublicId } from "./getPublicIdHelper";

export const RemoveCloudImg = async (url) => {
  if (!url) return null;

  try {
    // const publicId = getPublicId(url);

    // const cloudName = "dpwseh8x3";
    // const apiKey = "935684112947878";
    // const apiSecret = "9ZxOGkFUQLOlcqD3vymj2J9l5F4";
    // const auth = btoa(`${apiKey}:${apiSecret}`);

    // const res = await fetch(
    //   `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Basic ${auth}`,
    //     },
    //     body: JSON.stringify({
    //       public_id: publicId,
    //     }),
    //   }
    // );
    // const data = await res.json();
    // return data;
    const res = await fetch(
      "https://localhost:7191/api/cloudinary/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url),
      }
    );

    if (!res.ok) {
      const resFail = await res.text();
      console.log("delete fail:", resFail);
      return null;
    }
    const data = await res.json();
    console.log("deleted:", data);
    return data;
  } catch (err) {
    console.error("Cloudinary API delete error:", err);
    return null;
  }
};
