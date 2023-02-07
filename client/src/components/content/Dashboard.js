import { useContext} from "react";
import { HomeContext } from "../../Context/HomeContext";

function Dashboard() {
    const {user} = useContext(HomeContext)
    return ( 
        <div className="px-8 py-8">
            <h2>This is DashBoard</h2>
            <h2 className="text-blue">{`Hello ${user.firstname} ${user.lastname}`}</h2>
        </div>
     );
}

export default Dashboard;