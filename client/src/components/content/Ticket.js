import Empty from "./Empty";
import IsLoading from "../notify/IsLoading";
import GetProject from "../../FetchData/GetProject";
import { useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";
import TicketTable from "./TicketTable";

function Ticket() {
  const { token, SERVER_DOMAIN } = useContext(HomeContext);
  const {
    data: ticket,
    count,
    error,
    isLoading,
  } = GetProject(`${SERVER_DOMAIN}/user/ticket/personel?token=${token}`);

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
          <TicketTable ticket={ticket} count={count} />
        )}
      </div>
    </div>
  );
}

export default Ticket;
