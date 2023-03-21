function Option({ itemId, isOpen, setIsOpen, idIsOpen, setId }) {
  const handleShowOption = (id) => {
    setId(id);
    id === idIsOpen ? setIsOpen(!isOpen) : setIsOpen(true);
  };
  return (
    <button
      className="mt-1 ml-8 focus:outline-none"
      onClick={() => handleShowOption(itemId)}
    >
      <svg
        className="w-5 h-5 text-gray-400 hover:text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        ></path>
      </svg>
    </button>
  );
}

export default Option;
