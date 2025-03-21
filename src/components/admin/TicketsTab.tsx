
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Clock, MessageSquareText, TicketPlus } from "lucide-react";
import { Ticket } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

interface TicketsTabProps {
  tickets: Ticket[];
}

const TicketsTab: React.FC<TicketsTabProps> = ({ tickets }) => {
  const handleTicketStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    // This would be connected to a real state update function
    toast({
      title: "Ticket Updated",
      description: `Ticket #${ticketId} status changed to ${newStatus}`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Manage user support requests</CardDescription>
        </div>
        <Button className="gap-2">
          <TicketPlus className="h-4 w-4" />
          Create Ticket
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map(ticket => (
            <Card key={ticket.id} className="overflow-hidden">
              <div className={`h-1 w-full ${
                ticket.priority === 'critical' ? 'bg-red-500' : 
                ticket.priority === 'high' ? 'bg-orange-500' : 
                ticket.priority === 'medium' ? 'bg-yellow-500' : 
                'bg-blue-500'
              }`} />
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        <Clock className="inline-block h-3 w-3 mr-1" />
                        {new Date(ticket.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`status-${ticket.id}`} className="text-sm">Status:</Label>
                      <select 
                        id={`status-${ticket.id}`}
                        className="text-sm rounded-md border border-input bg-background px-3 py-1"
                        value={ticket.status}
                        onChange={(e) => handleTicketStatusChange(ticket.id, e.target.value as Ticket["status"])}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquareText className="h-3 w-3" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketsTab;
