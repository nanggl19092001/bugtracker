import Sort from "../icon/Sort";
import { Link } from "react-router-dom";
import Empty from "./Empty";
import { useState } from "react";

function Project({ project }) {
  const limit = 5;
  const totalPage = Math.ceil(project.length / limit);
  let page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }
  const [offset, setOffset] = useState(0);
  project = project.slice(offset, offset + limit);

  return (
    <div>
      {project && (
        <>
          {project.length === 0 ? (
            <Empty />
          ) : (
            <>
              <table className="table-fixed w-full min-h-[250px] mx-4 py-2 font-light border-b border-gray-200">
                <thead>
                  <tr>
                    <th className="w-1/6 text-start">
                      Name
                      <Sort />
                    </th>
                    <th className="w-3/6 text-start">Description</th>
                    <th className="w-1/6 text-start">Contributor</th>
                    <th className="text-start"></th>
                  </tr>
                </thead>
                <tbody>
                  {project.map((item) => {
                    return (
                      <tr
                        className="border-t border-gray-200 h-11"
                        key={item._id}
                      >
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                          <Link to={`/project/${item._id}`}>{item.name}</Link>
                        </td>
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.description}
                        </td>
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.creator}
                        </td>
                        <td>
                          <button className="float-right mr-5">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              ></path>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-center py-4 z-10">
                <nav aria-label="Page navigation">
                  <ul className="flex list-style-none">
                    <li className="page-item">
                      <Link
                       className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full
                       hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                         offset  <= 0 
                           ? "bg-gray-200 text-gray-800"
                           : "text-gray-800 bg-transparent"
                       }`}
                        to={`#`}
                        onClick={() => {
                          if (offset > 0) {
                            setOffset(offset - 5);
                          }
                        }}
                      >
                        Previous
                      </Link>
                    </li>
                    {project &&
                      page.map((item) => {
                        return (
                          <li className="page-item" key={item}>
                            <Link
                              className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full 
                              hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                                offset === (item - 1) * limit
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-800 bg-transparent"
                              }`}
                              to={`#${item}`}
                              onClick={() => setOffset((item - 1) * limit)}
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    <li className="page-item">
                      <Link
                        className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full
                              hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                                offset + limit >= totalPage * limit 
                                  ? "bg-gray-200 text-gray-800"
                                  : "text-gray-800 bg-transparent"
                              }`}
                        to={`#`}
                        disabled={offset === 0}
                        onClick={() => {
                          if (offset + limit < totalPage * limit) {
                            setOffset(offset + 5);
                          }
                        }}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Project;
