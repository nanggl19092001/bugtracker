import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../Context/AppContext";
import { SERVER_DOMAIN } from "../utils/Constaint";

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { token } = useContext(AppContext);
  const [page, setPage] = useState("1");
  const user = jwt_decode(token);

  useEffect(() => {
    function fetchData() {
      fetch(`${SERVER_DOMAIN}/user/project?${token}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error("Error:", error));
    }
    fetchData();
  }, [token]);
  return (
    <HomeContext.Provider value={{ page, setPage, user}}>
      {children}
    </HomeContext.Provider>
  );
};
