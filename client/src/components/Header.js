import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../Context/HomeContext";

function Header() {
    const navigate = useNavigate()
    const {user} = useContext(HomeContext)

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      };
  return (
    <div className="header sticky top-0 w-full h-14 bg-white drop-shadow-sm z-50">
      <div className="search flex w-1/2 h-full justify-start items-center float-left">
        <svg
          className="w-6 h-full text-slate-400 mx-3"
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          ></path>
        </svg>
        <input
          className="h-3/4 w-3/4 focus:outline-none"
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            e.key === "Enter" && console.log("Enter");
          }}
        />
      </div>
      <div className="flex h-full mr-2 justify-end items-center">
        <svg
          className="w-6 h-full text-slate-400 mx-3 hover:text-slate-600"
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          ></path>
        </svg>
        {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}
        <div className="relative inline-block z-0">
          <svg
            className="peer w-6 h-full cursor-pointer text-slate-400 mx-3 hover:text-slate-600"
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
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <ul className="z-10 hidden absolute box-border w-24 right-[5px] top-[40px]
          bg-white shadow-2xl rounded text-md text-slate-400
          peer-hover:block hover:block
          before:content-['.'] before:text-white before:w-20 before:z-20 
          before:absolute before:top-[-20px]
          before:right-[1px] before:block">
            <li className="px-4 py-1 hover:text-bg-nav hover:bg-gray-200"><a href="#a">Profile</a></li>
            <li className="px-4 py-1 hover:text-bg-nav hover:bg-gray-200"><a href="#a">Setting</a></li>
            <li className="px-4 py-1 text-red-500 border-t border-gray-300
             hover:bg-gray-200"><a href="#logout" onClick={handleLogout}>Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
