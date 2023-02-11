import React, { useState } from "react";

function Sort() {
  const [sort, setSort] = useState("desc");
  const desc = () => {
    return (
      <svg
        className="w-4 h-4 inline-block ml-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
        />
      </svg>
    );
  };
  const asc = () => {
    return (
      <svg
        className="w-4 h-4 inline-block ml-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
        />
      </svg>
    );
  };
  function handleSort() {
    sort === "desc" ? setSort("asc") : setSort("desc");
  }
  return <button onClick={handleSort}>{sort === "desc" ? desc() : asc()}</button>;
}

export default Sort;
