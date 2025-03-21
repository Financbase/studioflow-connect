
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TicketProvider } from "./ticket/TicketContext";
import TicketListHeader from "./ticket/TicketListHeader";
import TicketItem from "./ticket/TicketItem";
import EmptyTicketState from "./ticket/EmptyTicketState";
import { useTicketFilters } from "./ticket/useTicketFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Ticket } from "./ticket/types";

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
  const isMobile = useIsMobile();

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
          <CardHeader className={`${isMobile ? 'p-3 pb-0' : 'p-4 pb-0'}`}>
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
            <CardContent className={isMobile ? "p-3" : "p-4"}>
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
