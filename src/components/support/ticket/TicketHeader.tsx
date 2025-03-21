
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Ticket } from "./types";

interface TicketHeaderProps {
  ticket: Ticket;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        Ticket #{ticket.id.split('-').pop()}
      </DialogTitle>
      <DialogDescription className="text-xs md:text-sm">
        Created on {new Date(ticket.created_at).toLocaleString()}
      </DialogDescription>
    </DialogHeader>
  );
};

export default TicketHeader;
