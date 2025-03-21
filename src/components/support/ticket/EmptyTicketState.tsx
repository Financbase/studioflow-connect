
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyTicketStateProps {
  emptyMessage: React.ReactNode;
  onNewTicket?: () => void;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ emptyMessage, onNewTicket }) => {
  return (
    <div className="pt-6 text-center py-10">
      {emptyMessage}
      {onNewTicket && (
        <Button className="mt-4" onClick={onNewTicket}>Create New Ticket</Button>
      )}
    </div>
  );
};

export default EmptyTicketState;
