

export const FilterButton = ({children}) => {
  return (
    <button
      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 
             rounded-lg shadow-sm hover:bg-gray-100 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-all duration-200"
    >
      {children}
    </button>
  );
};
