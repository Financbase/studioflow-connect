import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  TicketPlus,
  MessageSquareText,
  Activity,
  Clock,
  CheckSquare,
  XSquare,
  User,
  ShieldAlert,
  BarChart2,
  Headphones,
  Settings,
  Share2,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  assigned_to?: string;
}

interface UserSession {
  id: string;
  user_id: string;
  username: string;
  ip_address: string;
  user_agent: string;
  started_at: string;
  last_active_at: string;
  plan: string;
}

const AdminDashboard = () => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      toast({
        title: "Access Denied",
        description: "You must be logged in to access the admin dashboard",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: "ticket-001",
        user_id: "user-001",
        title: "Unable to access VM Controller",
        description: "I'm on the Pro plan but can't access the VM Controller feature after login.",
        status: "open",
        priority: "high",
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "ticket-002",
        user_id: "user-002",
        title: "DAW integration issue with Pro Tools",
        description: "The DAW Workflow isn't detecting my Pro Tools installation.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 43200000).toISOString(),
        assigned_to: "agent-001"
      },
      {
        id: "ticket-003",
        user_id: "user-003",
        title: "Billing question about Standard plan",
        description: "I want to know if there's a discounted annual payment option for the Standard plan.",
        status: "resolved",
        priority: "low",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        assigned_to: "agent-002"
      }
    ];
    
    const mockSessions: UserSession[] = [
      {
        id: "session-001",
        user_id: "user-001",
        username: "johnsmith",
        ip_address: "192.168.1.1",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        started_at: new Date(Date.now() - 1800000).toISOString(),
        last_active_at: new Date().toISOString(),
        plan: "pro"
      },
      {
        id: "session-002",
        user_id: "user-002",
        username: "sarahconnor",
        ip_address: "10.0.0.1",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        started_at: new Date(Date.now() - 3600000).toISOString(),
        last_active_at: new Date(Date.now() - 600000).toISOString(),
        plan: "standard"
      },
      {
        id: "session-003",
        user_id: "user-003",
        username: "alexrodriguez",
        ip_address: "172.16.254.1",
        user_agent: "Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1",
        started_at: new Date(Date.now() - 7200000).toISOString(),
        last_active_at: new Date(Date.now() - 1200000).toISOString(),
        plan: "free"
      }
    ];
    
    setTickets(mockTickets);
    setUserSessions(mockSessions);
  }, []);
  
  const handleTicketStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus, updated_at: new Date().toISOString() } : ticket
    ));
    
    toast({
      title: "Ticket Updated",
      description: `Ticket #${ticketId} status changed to ${newStatus}`,
    });
  };
  
  const handleRemoteAssistance = (sessionId: string) => {
    toast({
      title: "Remote Assistance Initiated",
      description: `Connecting to session #${sessionId}...`,
    });
  };
  
  const openTickets = tickets.filter(t => t.status === "open").length;
  const activeUsers = userSessions.length;
  const criticalTickets = tickets.filter(t => t.priority === "critical").length;
  const resolvedToday = tickets.filter(t => 
    t.status === "resolved" && 
    new Date(t.updated_at).toDateString() === new Date().toDateString()
  ).length;
  
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Monitor user activity, manage support tickets and provide remote assistance
            </p>
          </section>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-1 sm:grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="text-sm h-10">
                <BarChart2 className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tickets" className="text-sm h-10">
                <TicketPlus className="mr-2 h-4 w-4" />
                Support Tickets
              </TabsTrigger>
              <TabsTrigger value="sessions" className="text-sm h-10">
                <Activity className="mr-2 h-4 w-4" />
                User Sessions
              </TabsTrigger>
              <TabsTrigger value="remote" className="text-sm h-10">
                <Share2 className="mr-2 h-4 w-4" />
                Remote Assistance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                        <h3 className="text-2xl font-bold">{activeUsers}</h3>
                      </div>
                      <Users className="h-8 w-8 text-primary opacity-80" />
                    </div>
                    <Progress value={75} className="h-1 mt-4" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                        <h3 className="text-2xl font-bold">{openTickets}</h3>
                      </div>
                      <MessageSquareText className="h-8 w-8 text-orange-500 opacity-80" />
                    </div>
                    <Progress value={openTickets > 0 ? 100 : 0} className="h-1 mt-4 bg-orange-100" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                        <h3 className="text-2xl font-bold">{criticalTickets}</h3>
                      </div>
                      <ShieldAlert className="h-8 w-8 text-destructive opacity-80" />
                    </div>
                    <Progress value={criticalTickets > 0 ? 100 : 0} className="h-1 mt-4 bg-red-100" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                        <h3 className="text-2xl font-bold">{resolvedToday}</h3>
                      </div>
                      <CheckSquare className="h-8 w-8 text-green-500 opacity-80" />
                    </div>
                    <Progress value={resolvedToday > 0 ? (resolvedToday / (resolvedToday + openTickets)) * 100 : 0} className="h-1 mt-4 bg-green-100" />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Tickets</CardTitle>
                    <CardDescription>Latest support requests from users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tickets.slice(0, 3).map(ticket => (
                        <div key={ticket.id} className="flex items-start space-x-4 border-b pb-3">
                          <div className="flex-shrink-0">
                            {ticket.status === 'open' && <Badge variant="destructive">Open</Badge>}
                            {ticket.status === 'in_progress' && <Badge variant="default" className="bg-yellow-500">In Progress</Badge>}
                            {ticket.status === 'resolved' && <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>}
                            {ticket.status === 'closed' && <Badge variant="outline">Closed</Badge>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{ticket.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{ticket.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <Clock className="inline-block h-3 w-3 mr-1" />
                              {new Date(ticket.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Active User Sessions</CardTitle>
                    <CardDescription>Currently online users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userSessions.map(session => (
                        <div key={session.id} className="flex items-center space-x-4 border-b pb-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{session.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{session.username}</p>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2 text-xs">
                                {session.plan.charAt(0).toUpperCase() + session.plan.slice(1)}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                <Clock className="inline-block h-3 w-3 mr-1" />
                                {new Date(session.last_active_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoteAssistance(session.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tickets" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="sessions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active User Sessions</CardTitle>
                  <CardDescription>Monitor current user activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSessions.map(session => (
                      <Card key={session.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{session.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  {session.username}
                                  <Badge variant="outline" className="text-xs">
                                    {session.plan.charAt(0).toUpperCase() + session.plan.slice(1)}
                                  </Badge>
                                </h3>
                                <p className="text-xs text-muted-foreground">IP: {session.ip_address}</p>
                                <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                                  {session.user_agent}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Started: {new Date(session.started_at).toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3" />
                                Last active: {new Date(session.last_active_at).toLocaleString()}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline" className="h-8" onClick={() => handleRemoteAssistance(session.id)}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Monitor
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  <MessageSquareText className="h-3 w-3 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="remote" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Remote Assistance</CardTitle>
                  <CardDescription>Provide support by connecting to user sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-5 text-center">
                        <Eye className="h-10 w-10 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold">View Session</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monitor user activity without interaction
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-5 text-center">
                        <Share2 className="h-10 w-10 mx-auto mb-3 text-blue-500" />
                        <h3 className="font-semibold">Remote Control</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Take control of user's session with permission
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-5 text-center">
                        <Headphones className="h-10 w-10 mx-auto mb-3 text-green-500" />
                        <h3 className="font-semibold">Audio Support</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Voice chat with user while troubleshooting
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Start Remote Session</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username or Email</Label>
                          <Input id="username" placeholder="Enter username or email" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="session-type">Session Type</Label>
                          <select 
                            id="session-type"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="view">View Only</option>
                            <option value="control">Remote Control</option>
                            <option value="audio">Audio Support</option>
                            <option value="full">Full Support</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="session-notes">Session Notes</Label>
                        <Textarea id="session-notes" placeholder="Enter session details or reason for connection" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="record-session" />
                        <Label htmlFor="record-session">Record session for quality and training purposes</Label>
                      </div>
                      
                      <Button className="w-full sm:w-auto">
                        Start Remote Assistance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
