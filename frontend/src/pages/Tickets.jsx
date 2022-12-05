import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getTickets, reset } from "../features/tickets/ticketSlice";

import TicketItem from "../components/TicketItem";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Tickets = () => {
  const { tickets, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError, message]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BackButton url="/" />
          <h1>Tickets</h1>
          <div className="tickets">
            <div className="ticket-headings">
              <div>Date</div>
              <div>Product</div>
              <div>Status</div>
              <div></div>
            </div>
            {tickets.length > 0 &&
              tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Tickets;
