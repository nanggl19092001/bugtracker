import { useState } from "react";
import InfoTicket from "../InfoTicket";
import CommentTicket from "../CommentTicket";

function DetailTicket(props) {
  console.log(props.thisTicket);
  const [reload, setReload] = useState(false);
  return (
    <div
      className={`grid grid-cols-3 gap-4 2xl:grid-cols-2 ${
        props.ticketChoose === "" ? "hidden" : ""
      }`}
    >
      <InfoTicket
        ticket={props.thisTicket}
        reload={reload}
        setReload={setReload}
        setTicketChoose={props.setTicketChoose}
      />
      <CommentTicket idTicket={props.thisTicket}/>
    </div>
  );
}

export default DetailTicket;
