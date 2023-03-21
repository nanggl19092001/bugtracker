function Modal(props) {
  return (
    <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div>
          <div className="mb-4 text-lg">
            Are you sure you want to delete this item?
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
              onClick={() => props.setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={(e) => props.handleDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
