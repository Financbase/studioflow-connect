
import React from "react";
import { Ticket } from "./types";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/language";

interface TicketSummaryProps {
  ticket: Ticket;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ ticket }) => {
  const { t, translateDynamic } = useLanguage();
  
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
  
  // Calculate time since last updated
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffDay > 0) return `${diffDay}d ago`;
    if (diffHour > 0) return `${diffHour}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return "Just now";
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base md:text-lg font-medium">{translateDynamic(ticket.title)}</h3>
      <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{translateDynamic(ticket.description)}</p>
      
      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        
        {ticket.updated_at !== ticket.created_at && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updated {getTimeAgo(ticket.updated_at)}</span>
          </div>
        )}
        
        {ticket.response && (
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>Has response</span>
          </div>
        )}
        
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
