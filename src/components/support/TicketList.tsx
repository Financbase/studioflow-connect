
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, MailOpen, CheckCircle } from "lucide-react";

interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  response?: string;
}

interface TicketListProps {
  tickets: Ticket[];
  emptyMessage: React.ReactNode;
  onNewTicket?: () => void;
}

const TicketList = ({ tickets, emptyMessage, onNewTicket }: TicketListProps) => {
  const getStatusBadge = (status: Ticket["status"]) => {
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
  
  const getPriorityBadge = (priority: Ticket["priority"]) => {
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

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-10">
          {emptyMessage}
          {onNewTicket && (
            <Button className="mt-4" onClick={onNewTicket}>Create New Ticket</Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map(ticket => (
        <Card key={ticket.id} className="overflow-hidden">
          <div className={`h-1 w-full ${
            ticket.priority === 'critical' ? 'bg-red-500' : 
            ticket.priority === 'high' ? 'bg-orange-500' : 
            ticket.priority === 'medium' ? 'bg-blue-500' : 
            'bg-slate-300'
          }`} />
          <CardContent className="p-4">
            <div className="space-y-3">
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
                
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketList;
