import { useContext } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { HomeContext } from "../Context/HomeContext";
function Navbar() {
  const { setPage} = useContext(HomeContext);
  const navigate = useNavigate();

  const handlePage = (page) => {
    setPage(page);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
    window.location.reload()
  };

  return (
    <div
      className="col-span-1 h-full bg-bg-nav
    drop-shadow-xl"
    >
      <ul className="relative">
        <li className="relative">
          <NavLink
            className="flex items-center text-lg py-4 px-6 h-14 overflow-hidden
            bg-primary-nav text-white"
            to="/"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            onClick={() => handlePage("1")}
          >
            LOGO
          </NavLink>
        </li>
        <NavLink
          to="/dashboard"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          onClick={() => handlePage("1")}
        >
          <li
            className="relative flex flex-row items-center
        text-white py-4 px-6 overflow-hidden text-ellipsis whitespace-normal rounded
        hover:text-primary-nav
        hover:bg-white transition duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6 mr-3"
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Dashboard
          </li>
        </NavLink>
        <NavLink
          to="/ticket"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          onClick={() => handlePage("2")}
        >
          <li
            className="relative flex flex-row items-center
        text-white py-4 px-6 overflow-hidden text-ellipsis whitespace-normal rounded
        hover:text-primary-nav
        hover:bg-white transition duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6 mr-3"
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
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              ></path>
            </svg>
            Tickets
          </li>
        </NavLink>
        <a href="#a" onClick={handleLogout}>

        <li
        className="relative flex flex-row items-center
        text-red-500 py-4 px-6 overflow-hidden text-ellipsis whitespace-normal rounded
        hover:text-primary-nav
        hover:bg-white transition duration-300 ease-in-out"
          >
            <svg
              className="w-6 h-6 mr-3"
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              ></path>
            </svg>
            Logout
          </li>
        </a>
      </ul>
    </div>
  );
}

export default Navbar;
