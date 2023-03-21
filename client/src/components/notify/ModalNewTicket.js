import { useRef, useContext, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { ProjectContext } from "../../Context/ProjectContext";

function ModalNewTicket(props) {
  const title = useRef("");
  const severity = useRef("");
  const version = useRef("");
  const [assignee, setAssignee] = useState([]);
  const description = useRef("");
  const deadline = useRef("");
  
  const { SERVER_DOMAIN, token } = useContext(HomeContext);
  const {member} = useContext(ProjectContext);
  const [message, setMessage] = useState("");

  const handleValueSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setAssignee(selectedOptions);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${SERVER_DOMAIN}/user/ticket?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json" 
          },
          body: JSON.stringify({
            project: props.idProject,
            summary: title.current.value,
            severity: severity.current.value,
            version: version.current.value,
            asignee: assignee.toString(),
            description: description.current.value,
            deadline: deadline.current.value
          })
        }
      );
      let resJson = await res.json();
      if (resJson.status === 200) {
        props.toggleModal();
        props.setReload(!props.reload);
      }else{
        setMessage(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {props.isOpenTicketModal && (
        <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-4 
        sm:inset-0 sm:flex sm:items-center sm:justify-center overflow-scroll">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={props.toggleModal}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <form>
              <h2 className="text-xl font-bold pb-4 text-center">New Ticket</h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  ref={title}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                />
              </div>
              <div className="mb-1 grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="severity"
                  >
                    Severity
                  </label>

                  <select
                    id="severity"
                    ref={severity}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2 "
                  >
                    <option value="1" className="text-blue-500">
                      Low
                    </option>
                    <option value="2" className="text-green-500">
                      Minor
                    </option>
                    <option value="3" className="text-yellow-500">
                      Major
                    </option>
                    <option value="4" className="text-red-500">
                      Critical
                    </option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="version"
                  >
                    Version
                  </label>
                  <input
                    type="text"
                    id="version"
                    ref={version}
                    defaultValue={"1"}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-2 after:content-['*'] after:text-red-500"
                    htmlFor="assignee"
                  >
                    Assignee
                  </label>
                  <select
                    multiple
                    id="assignee"
                    value={assignee} onChange={handleValueSelect}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2 "
                  >
                    {member &&
                      member.map((item, index) => (
                        <option key={index} value={item._id}>{item.firstname}</option>
                      ))}
                  </select>
                  <p className="text-sm text-slate-300">
                    Press Ctrl to multiple select
                  </p>
                </div>
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
                  rows="5"
                  ref={description}
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
                  ref={deadline}
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
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalNewTicket;
