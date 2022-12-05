import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId, isError, message]);

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  const onCloseTicket = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed successfully");
    navigate("/tickets");
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onCloseTicket}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
