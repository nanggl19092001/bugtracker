import { useState, useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";
import ModalDelete from "../notify/ModalDelete";
function InfoTicket(props) {
  const { token, SERVER_DOMAIN } = useContext(HomeContext);
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `${SERVER_DOMAIN}/user/ticket?token=${token}&id=${props.ticket[0]._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resJson = await res.json();
      if (resJson.status === 200) {
        props.setReload(!props.reload);
        props.setTicketChoose("");
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };
  return (
    <div className="info col-span-1 shadow-md">
      {props.ticket &&
        props.ticket.map((item) => (
          <div key={item._id} className="mx-4 my-2 flex flex-col">
            {showModal && (
              <ModalDelete
                setShowModal={setShowModal}
                handleDelete={handleDelete}
              />
            )}
            <div className="flex flex-row gap-2">
              <h2 className="inline w-fit text-lg text-text-color font-bold">{`Ticket Info - ${item.summary}`}</h2>
              <button
                className="w-fit hover:bg-slate-200 p-1 
              text-md text-red-500 font-medium"
                onClick={() => setShowModal(true)}
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
              </button>
            </div>
            <div className="grid gird-cols-1 2xl:grid-cols-4 gap-2 my-1">
              <div className="col-span-1">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Deadline
                </h2>
                <p className="text-sm text-red-500 font-semibold">
                  {convertTimeToDMY(item.deadline)}
                </p>
                <p className="text-sm text-red-500 italic">
                  {countTimeAgo(item.deadline)}
                </p>
              </div>
              <div className="2xl:col-span-3 flex flex-col">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Description
                </h2>
                <q className="text-sm text-gray-500 italic">
                  {item.description}
                </q>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="col-span-1">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Severity
                </h2>
                {item.severity === 1 && (
                  <p className="text-sm font-semibold text-gray-500">Low</p>
                )}
                {item.severity === 2 && (
                  <p className="text-sm font-semibold text-green-500">Minor</p>
                )}
                {item.severity === 3 && (
                  <p className="text-sm font-semibold text-blue-500">Major</p>
                )}
                {item.severity === 4 && (
                  <p className="text-sm font-semibold text-red-500">Critical</p>
                )}
              </div>
              <div className="col-span-1">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Status
                </h2>
                <p className="text-sm font-semibold text-gray-500">New</p>
              </div>
              <div className="col-span-1">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Version
                </h2>
                <p className="text-sm text-gray-500 font-semibold">
                  {item.version}
                </p>
              </div>
            </div>
            <div className="grid gird-cols-1 2xl:grid-cols-4 gap-2 my-1">
              <div className="2xl:col-span-2">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Creator
                </h2>
                <p className="text-sm text-gray-500 font-semibold">
                  {item.creator}
                </p>
              </div>
              <div className="2xl:col-span-2">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Assignee
                </h2>
                <q className="text-sm text-gray-500 italic">{item.asignee}</q>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InfoTicket;
