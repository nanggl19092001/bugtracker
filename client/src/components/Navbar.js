import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HomeContext } from "../Context/HomeContext";
function Navbar({ notify, setNotify}) {
  const {setPage} = useContext(HomeContext)
  const handlePage = (page) => {
    setPage(page)
  }
  return (
    <div className="col-span-1 h-screen shadow-md bg-white px-1">
      <ul className="relative">
      <li className="relative">
          <NavLink
            className="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            to="/"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            onClick={() => handlePage('1')}
          >
            LOGO
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            to="#a"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            onClick={() => handlePage('1')}
          >
            Sidenav NavLink 1
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            to="#b"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            onClick={() => handlePage('2')}
          >
            Sidenav NavLink 2
          </NavLink>
        </li>
        <li className="relative">
          <a
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-red-500 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            href="/logout"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
