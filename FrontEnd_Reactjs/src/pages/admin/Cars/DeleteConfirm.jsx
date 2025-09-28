export default function DeleteConfirm({handleConfirmDelete, onClose}) {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-20 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Edit
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to Delete this item?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
    )
}