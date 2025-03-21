
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TicketProvider } from "./ticket/TicketContext";
import TicketListHeader from "./ticket/TicketListHeader";
import TicketItem from "./ticket/TicketItem";
import EmptyTicketState from "./ticket/EmptyTicketState";
import { useTicketFilters } from "./ticket/useTicketFilters";

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
  const {
    sortField,
    sortDirection,
    setFilterStatus,
    setFilterPriority,
    handleSort,
    sortedAndFilteredTickets
  } = useTicketFilters(tickets);
  
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent>
          <EmptyTicketState emptyMessage={emptyMessage} onNewTicket={onNewTicket} />
        </CardContent>
      </Card>
    );
  }

  return (
    <TicketProvider>
      <div className="space-y-4">
        <Card className="overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <TicketListHeader 
              onNewTicket={onNewTicket}
              onFilterStatus={(status) => setFilterStatus(status as any)}
              onFilterPriority={(priority) => setFilterPriority(priority as any)}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </CardHeader>
        </Card>
        
        {sortedAndFilteredTickets.map(ticket => (
          <Card key={ticket.id} className="overflow-hidden">
            <div className={`h-1 w-full ${
              ticket.priority === 'critical' ? 'bg-red-500' : 
              ticket.priority === 'high' ? 'bg-orange-500' : 
              ticket.priority === 'medium' ? 'bg-blue-500' : 
              'bg-slate-300'
            }`} />
            <CardContent className="p-4">
              <TicketItem 
                ticket={ticket} 
                setSelectedTicket={setSelectedTicket} 
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </TicketProvider>
  );
};

export default TicketList;
