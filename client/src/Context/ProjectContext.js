import { createContext, useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../utils/Constaint";
import GetUser from "../FetchData/GetUser";

export const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const idParam = useParams();
  const projectId = idParam.id;
  const { token } = useContext(AppContext);
  const [reload, setReload] = useState(false);
  const { data: member } = GetUser(
    `${SERVER_DOMAIN}/user/project/member?token=${token}&id=${projectId}`,
    reload
  );
  return (
    <ProjectContext.Provider value={{ projectId, member, reload, setReload }}>
      {children}
    </ProjectContext.Provider>
  );
};
