import Header from "./Header";
import Dashboard from "./content/Dashboard";
import Ticket from "./content/Ticket";
import ProjectDetail from "./content/ProjectDetail";
import { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import Profile from "./content/Profile";
import GetUser from "../FetchData/GetUser";

function Content({ id, pages }) {
  const { profile, setProfile, SERVER_DOMAIN, token, reloadUser, setReloadUser } = useContext(HomeContext);
  const { data: user } = GetUser(
    `${SERVER_DOMAIN}/user/profile?token=${token}`, reloadUser
  );
  return (
    <div className="col-span-4 bg-gray-200 min-h-screen xl:col-span-7">
      <Header />
      {pages === "dashboard" && <Dashboard />}
      {pages === "ticket" && <Ticket />}
      {id && <ProjectDetail id={id} />}
      {profile && (
        <Profile profile={profile} setProfile={setProfile} user={user} reload = {reloadUser} setReload = {setReloadUser}/>
      )}
    </div>
  );
}

export default Content;
