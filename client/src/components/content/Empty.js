function Empty() {
  return (
    <div
      className="w-full h-[200px] mt-8
            border-dashed border-2 border-text-color"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <svg
          className="w-16 h-16 text-text-color"
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
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          ></path>
        </svg>
        <h2 className="text-2xl text-text-color font-bold">No have a task yet</h2>
        <p className="text-sm text-text-color">Please add some task</p>
      </div>
    </div>
  );
}

export default Empty;
