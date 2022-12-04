import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ createdAt, product, status, _id }) => {
  return (
    <div className="ticket">
      <div>{new Date(createdAt).toLocaleString("en-US")}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link to={`/tickets/${_id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default TicketItem;
