import Empty from "./Empty";
import IsLoading from "../notify/IsLoading";
import GetProject from "../../FetchData/GetProject";
import { useContext, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import TicketTable from "./Ticket/TicketTable";
import DetailTicket from "./Ticket/Detail";
import { ProjectProvider } from "../../Context/ProjectContext";

function Ticket() {
  const { token, SERVER_DOMAIN } = useContext(HomeContext);
  const {
    data: ticket,
    count,
    error,
    isLoading,
  } = GetProject(`${SERVER_DOMAIN}/user/ticket/personel?token=${token}`);
  const [ticketChoose, setTicketChoose] = useState("");
  let thisTicket = ticket && ticket.filter((item) => item._id === ticketChoose);
  return (
    <div className="px-8 py-8">
      <h2 className="text-xl font-bold">Ticket</h2>
      <div className="my-4 px-4 py-2 w-full h-fit min-h-[250px] bg-white rounded">
        <h2 className="text-lg text-text-color font-bold">Your Tickets</h2>
        {!isLoading && count === 0 && <Empty />}
        {error && <div className="text-center">{error}</div>}
        {isLoading ? (
          <IsLoading />
        ) : (
          <TicketTable
            ticket={ticket}
            count={count}
            ticketChoose={ticketChoose}
            setTicketChoose={setTicketChoose}
          />
        )}
      </div>
      <ProjectProvider>
        <div
          className={`my-4 px-4 py-2 w-full h-fit min-h-[250px] bg-white rounded ${
            ticketChoose === "" ? "hidden" : ""
          }`}
        >
          <DetailTicket
            ticketChoose={ticketChoose}
            setTicketChoose={setTicketChoose}
            thisTicket={thisTicket}
          />
        </div>
      </ProjectProvider>
    </div>
  );
}

export default Ticket;
