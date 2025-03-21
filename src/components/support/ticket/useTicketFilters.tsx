
import { useState, useMemo } from "react";

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

export const useTicketFilters = (tickets: Ticket[]) => {
  const [sortField, setSortField] = useState<"created_at" | "priority" | "status">("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<Ticket["status"] | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Ticket["priority"] | "all">("all");

  const handleSort = (field: "created_at" | "priority" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedAndFilteredTickets = useMemo(() => {
    let filtered = [...tickets];
    
    // Apply filters
    if (filterStatus !== "all") {
      filtered = filtered.filter(ticket => ticket.status === filterStatus);
    }
    
    if (filterPriority !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === filterPriority);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === "created_at") {
        return sortDirection === "asc" 
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortField === "priority") {
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        const aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        const statusOrder = { open: 3, in_progress: 2, resolved: 1, closed: 0 };
        const aValue = statusOrder[a.status as keyof typeof statusOrder] || 0;
        const bValue = statusOrder[b.status as keyof typeof statusOrder] || 0;
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
    });
    
    return filtered;
  }, [tickets, sortField, sortDirection, filterStatus, filterPriority]);

  return {
    sortField,
    sortDirection,
    filterStatus,
    filterPriority,
    setFilterStatus,
    setFilterPriority,
    handleSort,
    sortedAndFilteredTickets
  };
};
