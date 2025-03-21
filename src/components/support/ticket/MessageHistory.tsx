
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ticket } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessageHistoryProps {
  ticket: Ticket;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ ticket }) => {
  const isMobile = useIsMobile();
  
  return (
    <ScrollArea className={`${isMobile ? 'h-[150px]' : 'h-[200px]'} rounded-md border p-3 md:p-4`}>
      <div className="space-y-4">
        <div className="bg-muted p-2 md:p-3 rounded-md">
          <div className="flex justify-between">
            <p className="text-xs font-semibold">You</p>
            <p className="text-xs text-muted-foreground">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
          <p className="text-sm mt-2">{ticket.description}</p>
        </div>
        
        {ticket.response && (
          <div className="bg-primary/10 p-2 md:p-3 rounded-md">
            <div className="flex justify-between">
              <p className="text-xs font-semibold">Support Agent</p>
              <p className="text-xs text-muted-foreground">
                {new Date(ticket.updated_at).toLocaleString()}
              </p>
            </div>
            <p className="text-sm mt-2">{ticket.response}</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageHistory;
