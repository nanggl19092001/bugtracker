import React, { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import Header from "./Header";
import Dashboard from "./content/Dashboard";
import Content2 from "./content/Content2";

function Content() {
    const {page} = useContext(HomeContext)
    return ( 
        <div className="col-span-4 bg-gray-200 min-h-screen xl:col-span-7">
            <Header />
            {page === '1' ? <Dashboard /> : <Content2 />}
        </div>
    );
}

export default Content;