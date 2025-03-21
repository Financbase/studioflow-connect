
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, MailOpen, CheckCircle, Filter, ArrowUpDown, Eye } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

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
  const [sortField, setSortField] = useState<"created_at" | "priority" | "status">("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<Ticket["status"] | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Ticket["priority"] | "all">("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState("");
  
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

  const handleSort = (field: "created_at" | "priority" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedAndFilteredTickets = React.useMemo(() => {
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

  const handleReplySubmit = () => {
    if (!replyText.trim() || !selectedTicket) return;
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent to the support team."
    });
    
    setReplyText("");
    // In a real app, you would update the ticket in the database
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
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
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
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("open")}>
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("in_progress")}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("resolved")}>
                    Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("closed")}>
                    Closed
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterPriority("all")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("critical")}>
                    Critical
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("high")}>
                    High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("medium")}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPriority("low")}>
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
                  <DropdownMenuItem onClick={() => handleSort("created_at")}>
                    Date {sortField === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("priority")}>
                    Priority {sortField === "priority" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("status")}>
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
                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          Ticket #{ticket.id.split('-').pop()}
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </DialogTitle>
                        <DialogDescription>
                          Created on {new Date(ticket.created_at).toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">{ticket.title}</h3>
                          <p className="text-muted-foreground mt-1">{ticket.description}</p>
                        </div>
                        
                        <Separator />
                        
                        <ScrollArea className="h-[200px] rounded-md border p-4">
                          <div className="space-y-4">
                            <div className="bg-muted p-3 rounded-md">
                              <div className="flex justify-between">
                                <p className="text-xs font-semibold">You</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(ticket.created_at).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-sm mt-2">{ticket.description}</p>
                            </div>
                            
                            {ticket.response && (
                              <div className="bg-primary/10 p-3 rounded-md">
                                <div className="flex justify-between">
                                  <p className="text-xs font-semibold">Support Agent</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(ticket.updated_at).toLocaleString()}
                                  </p>
                                </div>
                                <p className="text-sm mt-2">{ticket.response}</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                        
                        <div className="space-y-2">
                          <label htmlFor="reply" className="text-sm font-medium">
                            Reply to this ticket
                          </label>
                          <Input
                            id="reply"
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <Button 
                            className="w-full" 
                            onClick={handleReplySubmit}
                            disabled={!replyText.trim()}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketList;
