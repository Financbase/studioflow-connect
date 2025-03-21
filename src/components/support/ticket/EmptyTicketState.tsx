
import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface EmptyTicketStateProps {
  emptyMessage: React.ReactNode;
  onNewTicket?: () => void;
}

const EmptyTicketState: React.FC<EmptyTicketStateProps> = ({ emptyMessage, onNewTicket }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`text-center ${isMobile ? 'py-6' : 'pt-6 py-10'}`}>
      {emptyMessage}
      {onNewTicket && (
        <Button className="mt-4" onClick={onNewTicket}>
          {isMobile ? "New Ticket" : "Create New Ticket"}
        </Button>
      )}
    </div>
  );
};

export default EmptyTicketState;
