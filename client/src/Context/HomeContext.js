import { createContext} from "react";
import { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../Context/AppContext";
import {SERVER_DOMAIN} from "../utils/Constaint"


export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { token } = useContext(AppContext);
  const [page, setPage] = useState("1");
  const user = jwt_decode(token);
  
  return (
    <HomeContext.Provider value={{ token,SERVER_DOMAIN, page, setPage, user}}>
      {children}
    </HomeContext.Provider>
  );
};
