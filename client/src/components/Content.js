import Header from "./Header";
import Dashboard from "./content/Dashboard";
import Ticket from "./content/Ticket";
import ProjectDetail from "./content/ProjectDetail";

function Content({id, pages}) {
    return ( 
        <div className="col-span-4 bg-gray-200 min-h-screen xl:col-span-7">
            <Header />
            {pages === 'dashboard' && <Dashboard/>}
            {pages === 'ticket' && <Ticket/>}
            {id && <ProjectDetail id = {id}/>}
        </div>
    );
}

export default Content;