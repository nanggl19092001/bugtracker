import { useContext, useState } from "react";
import Pagination from "../../button/Pagination";
import { HomeContext } from "../../../Context/HomeContext";

function TicketTable(props) {
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const total = props.count;
  const totalPage = Math.ceil(total / limit);
  let page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }

  const {project} = useContext(HomeContext);
  const showNameProject = (id) => {
     return project && project.filter((project) => project.project._id === id)
     .map((item) => item.project.name)
  }
  return (
    <>
      <table className="table-fixed w-full min-h-[250px] mt-5 py-2 font-light border-b border-gray-200">
        <thead>
          <tr>
            <th className="w-2/12 text-start">Name</th>
            <th className="w-6/12 text-start">Description</th>
            <th className="w-3/12 text-start">Project</th>
            <th className="text-start"></th>
          </tr>
        </thead>
        <tbody>
          {props.ticket.map((item) => (
            <tr
              className={`border-t border-gray-200 h-11 hover:bg-slate-200 cursor-pointer
                  ${props.ticketChoose === item._id ? "bg-slate-200" : ""}`}
              key={item._id}
              onClick={() => {
                  props.setTicketChoose(item._id)
              }}
            >
              <td className="whitespace-nowrap overflow-hidden text-ellipsis font-normal">
                {item.summary}
              </td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.description}
              </td>
              <td className="whitespace-nowrap overflow-hidden text-ellipsis font-light italic">
                {item.project && showNameProject(item.project)}
              </td>
              <td className="relative"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        offset={offset}
        setOffset={setOffset}
        limit={limit}
        total={total}
        totalPage={totalPage}
      />
    </>
  );
}

export default TicketTable;
