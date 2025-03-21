
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const FilterContent = () => (
    <>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Filter by Status</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" onClick={() => onFilterStatus("all")}>All</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterStatus("open")}>Open</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterStatus("in_progress")}>In Progress</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterStatus("resolved")}>Resolved</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterStatus("closed")}>Closed</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Filter by Priority</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" onClick={() => onFilterPriority("all")}>All</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterPriority("critical")}>Critical</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterPriority("high")}>High</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterPriority("medium")}>Medium</Button>
          <Button size="sm" variant="outline" onClick={() => onFilterPriority("low")}>Low</Button>
        </div>
      </div>
    </>
  );
  
  const SortContent = () => (
    <div className="space-y-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => onSort("created_at")}
      >
        Date {sortField === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => onSort("priority")}
      >
        Priority {sortField === "priority" && (sortDirection === "asc" ? "↑" : "↓")}
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => onSort("status")}
      >
        Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
      </Button>
    </div>
  );

  // Mobile version with sheets
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <CardTitle className="text-lg mb-2">Your Support Tickets</CardTitle>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 h-8 gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh]">
              <SheetHeader>
                <SheetTitle>Filter Tickets</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 h-8 gap-1">
                <ArrowUpDown className="h-3 w-3" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[40vh]">
              <SheetHeader>
                <SheetTitle>Sort Tickets</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <SortContent />
              </div>
            </SheetContent>
          </Sheet>
          
          {onNewTicket && (
            <Button size="sm" className="flex-1 h-8 gap-1" onClick={onNewTicket}>
              <Plus className="h-3 w-3" />
              New
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Desktop version with dropdowns
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
