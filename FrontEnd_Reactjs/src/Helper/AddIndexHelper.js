export const addIndex = (array, currentPage = 1, pageSize = null) => {
  return array.reduce((acc, item, idx) => {
    acc.push({
      ...item,
      orderNumber: pageSize ? (currentPage - 1) * pageSize + idx + 1 : idx + 1,
    });
    return acc;
  }, []);
};
