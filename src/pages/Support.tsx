
import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { TicketPlus, MessageSquare, Clock, MailOpen, CheckCircle } from "lucide-react";

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

const Support = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState<"low" | "medium" | "high">("medium");
  
  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API/database
    const mockTickets: Ticket[] = [
      {
        id: "ticket-001",
        user_id: user?.id || "",
        title: "Cannot access audio analysis feature",
        description: "When I try to analyze my uploaded audio files, the frequency visualizer remains blank.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        response: "We're looking into this issue. Our team has identified that it might be related to the audio format. We'll update you soon."
      },
      {
        id: "ticket-002",
        user_id: user?.id || "",
        title: "Feature request: MIDI integration",
        description: "Would it be possible to add MIDI file support for the DAW workflow integration?",
        status: "open",
        priority: "low",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: "ticket-003",
        user_id: user?.id || "",
        title: "Billing question",
        description: "I was charged twice for my Pro subscription. Could you please check this and refund the extra payment?",
        status: "resolved",
        priority: "high",
        created_at: new Date(Date.now() - 604800000).toISOString(),
        updated_at: new Date(Date.now() - 345600000).toISOString(),
        response: "We've verified the double charge and have processed a refund. It should appear in your account within 3-5 business days. We apologize for the inconvenience."
      }
    ];
    
    setTickets(mockTickets);
  }, [user?.id]);
  
  const handleCreateTicket = () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      toast.destructive({
        title: "Validation Error",
        description: "Please provide both a title and description for your support ticket."
      });
      return;
    }
    
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      user_id: user?.id || "",
      title: newTicketTitle,
      description: newTicketDescription,
      status: "open",
      priority: newTicketPriority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTickets([newTicket, ...tickets]);
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketPriority("medium");
    
    toast.default({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully."
    });
  };
  
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
  
  const activeTickets = tickets.filter(t => ["open", "in_progress"].includes(t.status));
  const resolvedTickets = tickets.filter(t => ["resolved", "closed"].includes(t.status));
  
  return (
    <SidebarLayout>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
              <p className="text-muted-foreground">
                Get help with your StudioFlow issues and track your support requests
              </p>
            </div>
            <Button className="gap-2 self-start" onClick={() => setActiveTab("new")}>
              <TicketPlus className="h-4 w-4" />
              New Support Ticket
            </Button>
          </section>
          
          <Separator />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 h-auto">
              <TabsTrigger value="active" className="text-sm h-10">
                <MailOpen className="mr-2 h-4 w-4" />
                Active Tickets
                {activeTickets.length > 0 && (
                  <Badge variant="default" className="ml-2">{activeTickets.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="resolved" className="text-sm h-10">
                <CheckCircle className="mr-2 h-4 w-4" />
                Resolved
                {resolvedTickets.length > 0 && (
                  <Badge variant="outline" className="ml-2">{resolvedTickets.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="new" className="text-sm h-10">
                <TicketPlus className="mr-2 h-4 w-4" />
                New Ticket
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              {activeTickets.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-10">
                    <MailOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">You don't have any active support tickets</p>
                    <Button className="mt-4" onClick={() => setActiveTab("new")}>Create New Ticket</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeTickets.map(ticket => (
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
              )}
            </TabsContent>
            
            <TabsContent value="resolved" className="space-y-4">
              {resolvedTickets.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-10">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">You don't have any resolved support tickets</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {resolvedTickets.map(ticket => (
                    <Card key={ticket.id} className="overflow-hidden opacity-80">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3 className="font-semibold">{ticket.title}</h3>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(ticket.status)}
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
                              Resolved on {new Date(ticket.updated_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Support Ticket</CardTitle>
                  <CardDescription>
                    Please provide details about your issue so our support team can help you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="ticket-title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="ticket-title"
                      placeholder="Brief description of your issue"
                      value={newTicketTitle}
                      onChange={(e) => setNewTicketTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="ticket-description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="ticket-description"
                      placeholder="Please provide as much detail as possible"
                      rows={5}
                      value={newTicketDescription}
                      onChange={(e) => setNewTicketDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="ticket-priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select
                      value={newTicketPriority}
                      onValueChange={(value) => setNewTicketPriority(value as "low" | "medium" | "high")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General question or non-urgent issue</SelectItem>
                        <SelectItem value="medium">Medium - Feature not working as expected</SelectItem>
                        <SelectItem value="high">High - Critical feature not working</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={handleCreateTicket}>
                    Submit Support Ticket
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Support;
