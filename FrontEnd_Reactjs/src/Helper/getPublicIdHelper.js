export const getPublicId = (url)=>{
    if(!url) return null;

    const part = url.split("/upload/")[1];
    const publicId = part.substring(0,part.lastIndexOf("."));

    return publicId;
}