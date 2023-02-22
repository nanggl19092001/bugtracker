import Sort from "../icon/Sort";
import { Link } from "react-router-dom";
import Empty from "./Empty";
import { useState, useContext, useRef } from "react";
import { HomeContext } from "../../Context/HomeContext";

function Project({ project }) {
  const { token, SERVER_DOMAIN, reload, setReload } = useContext(HomeContext);
  const [sort, setSort] = useState("");
  const handleSort = (value) => {
    setSort(value);
  };
  if (sort === "desc") {
    project.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }
  if (sort === "asc") {
    project.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  const limit = 5;
  const total = project.length || 0;
  const totalPage = Math.ceil(total / limit);
  let page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }
  const [offset, setOffset] = useState(0);
  project = project.slice(offset, offset + limit);
  //show delete button
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  let idIsOpen = id;
  const handleShowDelete = (id) => {
    setId(id);
    id === idIsOpen ? setIsOpen(!isOpen) : setIsOpen(true);
  };
  //show modal
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    setIsOpen(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${SERVER_DOMAIN}/user/project?token=${token}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idIsOpen,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        setIsOpen(false);
        setReload(!reload);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };
  //handle edit project
  const [message, setMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const name = useRef("");
  const description = useRef("");
  const time = useRef("");
  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(itemEdit._id);
    try {
      let res = await fetch(`${SERVER_DOMAIN}/user/project?token=${token}`, {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: itemEdit._id,
          name: name.current.value.charAt(0).toUpperCase() + name.current.value.slice(1),
          description: description.current.value,
          end: time.current.value,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        setReload(!reload)
        setShowEditModal(false);
      } else {
        setMessage(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  let itemEdit = project.find((item) => item._id === idIsOpen);
  const toggleModalEdit = () => {
    setShowEditModal(true);
    setIsOpen(false);
  }
  const convertTime = (time) => {
    const date = new Date(time);
    const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return utcDate.toISOString().slice(0, 16);
  }
  return (
    <div>
      {project && (
        <>
          {total === 0 ? (
            <Empty />
          ) : (
            <>
              {showEditModal && (
                <div className="fixed z-20 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                  <div
                    className="fixed inset-0 transition-opacity"
                    onClick={() => {setShowEditModal(false)
                    setMessage("")}}
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <form>
                      <h2 className="text-xl font-bold pb-4 text-center">
                        Edit Project
                      </h2>
                      <div className="mb-4">
                        <label
                          className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={itemEdit.name}
                          ref={name}
                          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm font-medium mb-2"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          id="description"
                          defaultValue={itemEdit.description}
                          ref={description}
                          rows="5"
                          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                          htmlFor="time"
                        >
                          DeadLine
                        </label>
                        <input
                          type="datetime-local"
                          id="time"
                          defaultValue={convertTime(itemEdit.end)}
                          ref={time}
                          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                        />
                      </div>
                      <div className="mb-4">
                        {message ? (
                          <div
                            className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base red-yellow-700"
                            role="alert"
                          >
                            {message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex items-center w-full justify-end mt-4">
                        <button
                          onClick={handleEdit}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <table className="table-fixed w-full min-h-[250px] mx-4 py-2 font-light border-b border-gray-200">
                <thead>
                  <tr>
                    <th className="w-1/6 text-start">
                      Name
                      <Sort handleSort={handleSort} />
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
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis font-normal">
                          <Link to={`/project/${item._id}`}>{item.name}</Link>
                        </td>
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis ">
                          {item.description}
                        </td>
                        <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.creator}
                        </td>
                        <td className="relative">
                          <button
                            className="mt-1 ml-8 focus:outline-none"
                            onClick={() => handleShowDelete(item._id)}
                          >
                            <svg
                              className="w-5 h-5 text-gray-400 hover:text-gray-600"
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
                          {item._id === id && isOpen && (
                            <div
                              className={`absolute z-10 top-2 left-14 w-fit
                              bg-white shadow-2xl rounded border border-gray-200`}
                            >
                              <button
                                className="flex w-full hover:bg-slate-200 p-1 text-md text-blue-500 font-medium"
                                onClick={toggleModalEdit}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                className="flex hover:bg-slate-200 p-1 text-md text-red-500 font-medium"
                                onClick={toggleModal}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {showModal && (
                <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" />
                  </div>
                  <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div>
                      <div className="mb-4 text-lg">
                        Are you sure you want to delete this item?
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={(e) => handleDelete(e)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center pt-4 z-10">
                <nav aria-label="Page navigation">
                  <ul className="flex list-style-none">
                    <li className="page-item">
                      <Link
                        className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full
                       hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                         offset <= 0
                           ? "bg-transparent text-gray-400 cursor-not-allowed"
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
                               ${
                                 offset === (item - 1) * limit
                                   ? "bg-blue-600 text-white"
                                   : "text-gray-800 bg-transparent"
                               }`}
                              to={`#`}
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
                                  ? "bg-transparent text-gray-400 cursor-not-allowed"
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
              <div className="flex justify-end px-4 pb-2">
                <span className="text-gray-400">
                  Showing {offset + 1} to{" "}
                  {offset + limit > total ? total : offset + limit} of {total}{" "}
                  entries
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Project;
