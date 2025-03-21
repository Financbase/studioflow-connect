
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TicketDetailsDialog from "./TicketDetailsDialog";

interface TicketItemProps {
  ticket: {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: "open" | "in_progress" | "resolved" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    created_at: string;
    updated_at: string;
    response?: string;
  };
  setSelectedTicket: (ticket: TicketItemProps["ticket"]) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, setSelectedTicket }) => {
  const getStatusBadge = (status: TicketItemProps["ticket"]["status"]) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "in_progress":
        return <Badge variant="default" className="bg-yellow-500">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: TicketItemProps["ticket"]["priority"]) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge variant="default" className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-blue-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div key={ticket.id} className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="font-semibold">{ticket.title}</h3>
        <div className="flex items-center gap-2">
          {getStatusBadge(ticket.status)}
          {getPriorityBadge(ticket.priority)}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">{ticket.description}</p>
      
      {ticket.response && (
        <div className="bg-muted p-3 rounded-md mt-2">
          <p className="text-xs font-semibold mb-1">Support Response:</p>
          <p className="text-sm">{ticket.response}</p>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(ticket.created_at).toLocaleDateString()}
        </div>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-1"
                onClick={() => setSelectedTicket(ticket)}
              >
                <Eye className="h-3 w-3" />
                View Details
              </Button>
            </DialogTrigger>
            <TicketDetailsDialog />
          </Dialog>
          
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <MessageSquare className="h-3 w-3" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
