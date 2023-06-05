import { useParams } from "react-router-dom";
import GetProject from "../../FetchData/GetProject";
import { HomeContext } from "../../Context/HomeContext";
import { useContext, useState } from "react";
import ModalNewTicket from "../notify/ModalNewTicket";
import Empty from "./Empty";
import Pagination from "../button/Pagination";
import IsLoading from "../notify/IsLoading";
import { ProjectContext } from "../../Context/ProjectContext";

function ProjectTicket(props) {
const { id } = useParams();

  const { member } = useContext(ProjectContext);
  const { SERVER_DOMAIN, token } = useContext(HomeContext);
  const {
    data: ticket, 
    count,
    isLoading,
  } = GetProject(
    `${SERVER_DOMAIN}/user/ticket/project?token=${token}&id=${id}`,
    props.reload
  );
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const total = count;
  const totalPage = Math.ceil(total / limit);
  let page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }

  const [isOpenTicketModal, setIsOpenTicketModal] = useState(false);
  const toggleTicketModal = () => {
    setIsOpenTicketModal(!isOpenTicketModal);
  };
  const chooseTicket = (id) => {
    props.ticketChoose !== id
      ? props.setTicketChoose(id)
      : props.setTicketChoose("");
    props.setThisTicket(ticket.filter((item) => item._id === id));
  };

  const handleMemberName = (id) => {
    let person = member && member.filter((item) => item._id === id);
    if (person) {
      return person[0].firstname;
    }
  };

  const handleMemberAssignee = (idList) => {
    let assigneeList = member && idList.split(",");
    if (assigneeList) {
      return assigneeList.map((item, index) => {
        if (index !== assigneeList.length - 1) {
          return handleMemberName(item) + ", ";
        } else {
          return handleMemberName(item);
        }
      });
    }
  };

  return (
    <div className="tickets col-span-2 shadow-md">
      <div className="mx-4 my-2">
        <h2 className="inline text-lg text-text-color font-bold">Ticket</h2>
        <div className="inline float-right">
          <button
            className="bg-blue-600 text-white opacity-80 text-[14px] rounded-md 
            font-bold mx-2 mb-4 px-2 py-1 hover:opacity-100 transition duration-300 ease-in-out"
            onClick={toggleTicketModal}
          >
            New Ticket
          </button>
        </div>
        <ModalNewTicket
          idProject={id}
          isOpenTicketModal={isOpenTicketModal}
          toggleModal={toggleTicketModal}
          reload={props.reload}
          setReload={props.setReload}
        />
        {isLoading && <IsLoading />}
        {ticket && ticket.length === 0 && <Empty />}
        {ticket && ticket.length > 0 && (
          <table className="table-fixed w-full min-h-[250px] py-2 font-light border-b border-gray-200">
            <thead>
              <tr>
                <th className="w-2/12 text-start">Name</th>
                <th className="w-6/12 text-start">Description</th>
                <th className="w-3/12 text-start">Assignee</th>
                <th className="text-start"></th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((item) => (
                <tr
                  className={`border-t border-gray-200 h-11 hover:bg-slate-200 cursor-pointer
                  ${props.ticketChoose === item._id ? "bg-slate-200" : ""}`}
                  key={item._id}
                  onClick={() => {
                    chooseTicket(item._id);
                  }}
                >
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis font-normal">
                    {item.summary}
                  </td>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis ">
                    {item.description}
                  </td>
                  <td className="whitespace-nowrap overflow-hidden text-ellipsis font-light italic">
                    {handleMemberAssignee(item.asignee)}
                  </td>
                  <td className="relative"></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          page={page}
          offset={offset}
          setOffset={setOffset}
          limit={limit}
          total={total}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default ProjectTicket;
