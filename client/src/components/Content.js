import React, { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";
import Content1 from "./content/Content1";
import Content2 from "./content/Content2";

function Content() {
    const {page} = useContext(HomeContext)
    return ( 
        <div className="col-span-4 bg-gray-200 min-h-screen">
            <h2 className="px-8">This is Content</h2>
            {page === '1' ? <Content1 /> : <Content2 />}
        </div>
    );
}

export default Content;