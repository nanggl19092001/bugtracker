import { createContext} from "react";
import { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import {SERVER_DOMAIN} from "../utils/Constaint"
import GetProject from "../FetchData/GetProject";
import GetUser from "../FetchData/GetUser";
// import io from 'socket.io-client';


export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const { token } = useContext(AppContext);
  const [page, setPage] = useState("1");
  const [reload, setReload] = useState(false);
  const [reloadUser, setReloadUser] = useState(false);
  const [profile, setProfile] = useState(false)
  const { data: user } = GetUser(
    `${SERVER_DOMAIN}/user/profile?token=${token}`, reloadUser
  );

  const {
    data: project,
    error,
    isLoading,
  } = GetProject(`${SERVER_DOMAIN}/user/project?token=${token}`, reload);
  
  return (
    <HomeContext.Provider value={{ token,SERVER_DOMAIN, page, setPage, user, reload, setReload,
     project, error, isLoading, profile, setProfile, reloadUser, setReloadUser}}>
      {children}
    </HomeContext.Provider>
  );
};
