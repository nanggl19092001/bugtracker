import React, { useContext, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";

function ProjectDetail({ id }) {
  const { project } = useContext(HomeContext);
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let thisProject = [];
  project && (thisProject = project.filter((project) => project._id === id));
  const handleAddMember = (e) => {
    console.log(e.target.value);
  };

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
          className="w-1/4 p-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:border-2"
          type="text"
          placeholder="Add member"
          onChange={(e) => {
            handleAddMember(e);
          }}
          onFocus={() => {
            setIsOpen(true);
          }}
          // onBlur={() => {
          //   setIsOpen(false);
          // }}
        />
        <button className="bg-blue-500 text-white rounded-md p-2 ml-2">
          Add
        </button>
        {isOpen && (
          <div
            className="w-1/4 bg-white rounded-md mt-2 border-2 border-blue-500 shadow-lg
          overflow-y-scroll max-h-[100px]"
          >
            <ul>
              <li className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-slate-300 "></div>
                <div className="ml-2">
                  <p>Member 1</p>
                  <p>Mail</p>
                </div>
              </li>
              <li className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-slate-300 "></div>
                <div className="ml-2">
                  <p>Member 1</p>
                  <p>Mail</p>
                </div>
              </li>
              <li className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer flex flex-row items-center">
                <div className="w-8 h-8 rounded-full bg-slate-300 "></div>
                <div className="ml-2">
                  <p>Member 1</p>
                  <p>Mail</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button className="btn btn-secondary" onClick={() => history("/")}>
        Back
      </button>
    </div>
  );
}

export default ProjectDetail;
