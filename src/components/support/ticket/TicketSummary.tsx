
import React from "react";
import { Ticket } from "./types";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface TicketSummaryProps {
  ticket: Ticket;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ ticket }) => {
  // Helper function to get appropriate badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "open": return "default";
      case "in_progress": return "secondary";
      case "resolved": return "success";
      case "closed": return "outline";
      default: return "default";
    }
  };

  // Helper function to get appropriate badge variant based on priority
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "low": return "outline";
      case "medium": return "secondary";
      case "high": return "destructive";
      case "critical": return "destructive";
      default: return "outline";
    }
  };

  // Format date for display
  const formattedDate = new Date(ticket.created_at).toLocaleDateString();

  return (
    <div className="space-y-2">
      <h3 className="text-base md:text-lg font-medium">{ticket.title}</h3>
      <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{ticket.description}</p>
      
      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={getStatusVariant(ticket.status) as any} 
            className="capitalize text-xs"
          >
            {ticket.status.replace('_', ' ')}
          </Badge>
          
          <Badge 
            variant={getPriorityVariant(ticket.priority) as any} 
            className="capitalize text-xs"
          >
            {ticket.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
