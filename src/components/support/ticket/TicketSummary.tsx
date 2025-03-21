
import React from "react";
import { Ticket } from "./types";

interface TicketSummaryProps {
  ticket: Ticket;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ ticket }) => {
  return (
    <div>
      <h3 className="text-base md:text-lg font-medium">{ticket.title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{ticket.description}</p>
    </div>
  );
};

export default TicketSummary;
