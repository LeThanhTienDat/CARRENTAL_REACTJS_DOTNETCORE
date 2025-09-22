export const ChangeNameImg = (rawName) => {
  const dotIndex = rawName.lastIndexOf(".");
  const extension = dotIndex !== -1 ? rawName.substring(dotIndex + 1) : "";

  const randomString = Math.random().toString(36).substring(2, 10);

  return randomString + "." + extension;
};
