import React, { useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";

function ProjectDetail({ id }) {
  const { project } = useContext(HomeContext);
  const history = useNavigate();
  let thisProject = [];
  project && (thisProject = project.filter((project) => project._id === id));
  return (
    <div className="bg-white rounded-md p-4 m-4">
      {thisProject &&
        thisProject.map((project) => (
          <div key={project._id}>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
            <p className="text-sm text-gray-500">{project.deadline}</p>
          </div>
        ))}
      <div>
        <input
          className="w-1/4 p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
          type="text"
          placeholder="Add member"
        />
        <button>Search</button>
      </div>
      <button className="btn btn-secondary" onClick={() => history("/")}>
        Back
      </button>
    </div>
  );
}

export default ProjectDetail;
