
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TicketListHeaderProps {
  onNewTicket?: () => void;
  onFilterStatus: (status: string) => void;
  onFilterPriority: (priority: string) => void;
  onSort: (field: "created_at" | "priority" | "status") => void;
  sortField: "created_at" | "priority" | "status";
  sortDirection: "asc" | "desc";
}

const TicketListHeader: React.FC<TicketListHeaderProps> = ({ 
  onNewTicket, 
  onFilterStatus,
  onFilterPriority,
  onSort,
  sortField,
  sortDirection
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <CardTitle className="text-lg">Your Support Tickets</CardTitle>
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3 w-3" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFilterStatus("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterStatus("open")}>
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterStatus("in_progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterStatus("resolved")}>
              Resolved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterStatus("closed")}>
              Closed
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFilterPriority("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterPriority("critical")}>
              Critical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterPriority("high")}>
              High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterPriority("medium")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterPriority("low")}>
              Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ArrowUpDown className="h-3 w-3" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSort("created_at")}>
              Date {sortField === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("priority")}>
              Priority {sortField === "priority" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("status")}>
              Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {onNewTicket && (
          <Button size="sm" className="h-8" onClick={onNewTicket}>
            New Ticket
          </Button>
        )}
      </div>
    </div>
  );
};

export default TicketListHeader;
