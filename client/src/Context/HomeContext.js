import { createContext} from "react";
import { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../Context/AppContext";
import {SERVER_DOMAIN} from "../utils/Constaint"
import GetProject from "../FetchData/GetProject";


export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { token } = useContext(AppContext);
  const [page, setPage] = useState("1");
  const [reload, setReload] = useState(false);
  const user = jwt_decode(token);
  const {
    data: project,
    error,
    isLoading,
  } = GetProject(`${SERVER_DOMAIN}/user/project?token=${token}`, reload);
  return (
    <HomeContext.Provider value={{ token,SERVER_DOMAIN, page, setPage, user, reload, setReload, project, error, isLoading}}>
      {children}
    </HomeContext.Provider>
  );
};
