
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  Eye,
  LineChart,
  Database,
  Cpu,
  AudioLines,
  FileAudio,
  FileText,
  RefreshCw
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
  
  // System metrics for admin overview
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 42,
    memoryUsage: 68,
    diskUsage: 54,
    networkLatency: 23,
    activeUsers: 37,
    totalUsers: 412,
    pendingTickets: 8,
    resolvedToday: 12,
    audioProcessingLoad: 61
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      toast({
        title: "Access Denied",
        description: "You must be logged in to access the admin dashboard",
        variant: "destructive"
      });
      return;
    }
    
    // Check admin status
    if (profile && !profile.username?.includes("admin") && !user?.email?.includes("admin")) {
      navigate("/");
      toast({
        title: "Permission Denied",
        description: "You need administrator privileges to access this page",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, navigate, profile, user]);
  
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
      },
      {
        id: "ticket-004",
        user_id: "user-004",
        title: "Audio Analysis feature crashes on large files",
        description: "When I try to analyze audio files larger than 50MB, the analysis tool crashes.",
        status: "open",
        priority: "critical",
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: "ticket-005",
        user_id: "user-005",
        title: "Custom layout not saving properly",
        description: "When I save my custom dashboard layout, it reverts back after I log out and log back in.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
        assigned_to: "agent-003"
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
      },
      {
        id: "session-004",
        user_id: "user-006",
        username: "mikeproducer",
        ip_address: "45.67.89.101",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
        started_at: new Date(Date.now() - 900000).toISOString(),
        last_active_at: new Date(Date.now() - 120000).toISOString(),
        plan: "enterprise"
      },
      {
        id: "session-005",
        user_id: "user-007",
        username: "jennystudio",
        ip_address: "203.0.113.42",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",
        started_at: new Date(Date.now() - 1500000).toISOString(),
        last_active_at: new Date(Date.now() - 300000).toISOString(),
        plan: "pro"
      }
    ];
    
    setTickets(mockTickets);
    setUserSessions(mockSessions);
  }, []);
  
  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.min(100, Math.max(20, prev.cpuUsage + (Math.random() * 10 - 5))),
        memoryUsage: Math.min(100, Math.max(30, prev.memoryUsage + (Math.random() * 8 - 4))),
        diskUsage: Math.min(100, Math.max(40, prev.diskUsage + (Math.random() * 2 - 1))),
        networkLatency: Math.min(100, Math.max(5, prev.networkLatency + (Math.random() * 6 - 3))),
        activeUsers: Math.max(1, Math.floor(prev.activeUsers + (Math.random() * 4 - 2))),
        audioProcessingLoad: Math.min(100, Math.max(10, prev.audioProcessingLoad + (Math.random() * 12 - 6)))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
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
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <section className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor system activity and manage support tickets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="py-1 font-medium">
                Admin Console
              </Badge>
              <Badge variant="secondary" className="py-1">
                {activeUsers} Active Users
              </Badge>
            </div>
          </section>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                <TabsTrigger value="overview" className="text-sm h-10">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="tickets" className="text-sm h-10">
                  <TicketPlus className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Support Tickets</span>
                </TabsTrigger>
                <TabsTrigger value="sessions" className="text-sm h-10">
                  <Activity className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">User Sessions</span>
                </TabsTrigger>
                <TabsTrigger value="remote" className="text-sm h-10">
                  <Share2 className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Remote Assistance</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm h-10">
                  <LineChart className="mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">System Analytics</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="sm" className="ml-2 flex gap-1 items-center">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
          
          <TabsContent value="overview" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                      <h3 className="text-2xl font-bold">{activeUsers}</h3>
                    </div>
                    <Users className="h-8 w-8 text-primary opacity-80" />
                  </div>
                  <Progress value={activeUsers > 0 ? (activeUsers / systemMetrics.totalUsers) * 100 : 0} className="h-1 mt-4" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {activeUsers} of {systemMetrics.totalUsers} registered users
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-orange-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                      <h3 className="text-2xl font-bold">{openTickets}</h3>
                    </div>
                    <MessageSquareText className="h-8 w-8 text-orange-500 opacity-80" />
                  </div>
                  <Progress value={openTickets > 0 ? 100 : 0} className="h-1 mt-4 bg-orange-100" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {criticalTickets} critical issues pending
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                      <h3 className="text-2xl font-bold">{criticalTickets}</h3>
                    </div>
                    <ShieldAlert className="h-8 w-8 text-destructive opacity-80" />
                  </div>
                  <Progress value={criticalTickets > 0 ? 100 : 0} className="h-1 mt-4 bg-red-100" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {criticalTickets > 0 ? "Attention required" : "No critical issues"}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                      <h3 className="text-2xl font-bold">{resolvedToday}</h3>
                    </div>
                    <CheckSquare className="h-8 w-8 text-green-500 opacity-80" />
                  </div>
                  <Progress 
                    value={resolvedToday > 0 ? (resolvedToday / (resolvedToday + openTickets)) * 100 : 0} 
                    className="h-1 mt-4 bg-green-100" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(resolvedToday / (resolvedToday + openTickets) * 100).toFixed(0)}% resolution rate
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm text-muted-foreground">{systemMetrics.cpuUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemMetrics.cpuUsage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm text-muted-foreground">{systemMetrics.memoryUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemMetrics.memoryUsage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Disk Usage</span>
                        <span className="text-sm text-muted-foreground">{systemMetrics.diskUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemMetrics.diskUsage} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Network Latency</span>
                        <span className="text-sm text-muted-foreground">{systemMetrics.networkLatency.toFixed(1)} ms</span>
                      </div>
                      <Progress value={systemMetrics.networkLatency} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Audio Processing</span>
                        <span className="text-sm text-muted-foreground">{systemMetrics.audioProcessingLoad.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemMetrics.audioProcessingLoad} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <RefreshCw className="h-3.5 w-3.5 mr-2" />
                    Refresh Metrics
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center border-b pb-2">
                      <div className="rounded-full bg-orange-100 p-2 mr-3">
                        <TicketPlus className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">New support ticket <span className="font-medium">#{tickets[0]?.id}</span> created</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tickets[0]?.created_at || new Date()).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">Ticket</Badge>
                    </div>
                    
                    <div className="flex items-center border-b pb-2">
                      <div className="rounded-full bg-blue-100 p-2 mr-3">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">New user <span className="font-medium">{userSessions[0]?.username}</span> registered</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - 7200000).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">User</Badge>
                    </div>
                    
                    <div className="flex items-center border-b pb-2">
                      <div className="rounded-full bg-green-100 p-2 mr-3">
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Ticket <span className="font-medium">#{tickets[2]?.id}</span> marked as resolved</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tickets[2]?.updated_at || new Date()).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">Ticket</Badge>
                    </div>
                    
                    <div className="flex items-center border-b pb-2">
                      <div className="rounded-full bg-purple-100 p-2 mr-3">
                        <AudioLines className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Audio processing service <span className="font-medium">restarted</span></p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - 5400000).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">System</Badge>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="rounded-full bg-yellow-100 p-2 mr-3">
                        <Database className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Database <span className="font-medium">backup completed</span></p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - 14400000).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">System</Badge>
                    </div>
                  </div>
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
                    {userSessions.slice(0, 3).map(session => (
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
          
          <TabsContent value="tickets" className="space-y-4 mt-0">
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
          
          <TabsContent value="sessions" className="space-y-4 mt-0">
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
                                <Badge variant={
                                  session.plan === 'free' ? 'outline' :
                                  session.plan === 'standard' ? 'secondary' :
                                  session.plan === 'pro' ? 'default' : 'destructive'
                                } className="text-xs">
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
          
          <TabsContent value="remote" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Remote Assistance</CardTitle>
                <CardDescription>Provide support by connecting to user sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <TabsContent value="analytics" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Performance metrics and system statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Resource Usage</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm text-muted-foreground">{systemMetrics.cpuUsage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              systemMetrics.cpuUsage > 90 ? 'bg-red-500' : 
                              systemMetrics.cpuUsage > 70 ? 'bg-orange-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${systemMetrics.cpuUsage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {systemMetrics.cpuUsage > 90 ? 'Critical - High CPU load detected' : 
                           systemMetrics.cpuUsage > 70 ? 'Warning - Elevated CPU usage' : 'Normal operation'}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm text-muted-foreground">{systemMetrics.memoryUsage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              systemMetrics.memoryUsage > 90 ? 'bg-red-500' : 
                              systemMetrics.memoryUsage > 70 ? 'bg-orange-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${systemMetrics.memoryUsage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {systemMetrics.memoryUsage > 90 ? 'Critical - Memory resources depleted' : 
                           systemMetrics.memoryUsage > 70 ? 'Warning - Memory usage high' : 'Normal memory allocation'}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Disk Usage</span>
                          <span className="text-sm text-muted-foreground">{systemMetrics.diskUsage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              systemMetrics.diskUsage > 90 ? 'bg-red-500' : 
                              systemMetrics.diskUsage > 70 ? 'bg-orange-500' : 'bg-blue-500'
                            }`} 
                            style={{ width: `${systemMetrics.diskUsage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Audio Processing</span>
                          <span className="text-sm text-muted-foreground">{systemMetrics.audioProcessingLoad.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              systemMetrics.audioProcessingLoad > 90 ? 'bg-red-500' : 
                              systemMetrics.audioProcessingLoad > 70 ? 'bg-orange-500' : 'bg-purple-500'
                            }`} 
                            style={{ width: `${systemMetrics.audioProcessingLoad}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">User Statistics</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">{systemMetrics.totalUsers}</p>
                            <p className="text-sm text-muted-foreground text-center">Total Users</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                            <p className="text-sm text-muted-foreground text-center">Active Now</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">{openTickets}</p>
                            <p className="text-sm text-muted-foreground text-center">Open Tickets</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">{resolvedToday}</p>
                            <p className="text-sm text-muted-foreground text-center">Resolved Today</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Plan Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs">Free</span>
                                <span className="text-xs text-muted-foreground">32%</span>
                              </div>
                              <Progress value={32} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs">Standard</span>
                                <span className="text-xs text-muted-foreground">45%</span>
                              </div>
                              <Progress value={45} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs">Pro</span>
                                <span className="text-xs text-muted-foreground">18%</span>
                              </div>
                              <Progress value={18} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-xs">Enterprise</span>
                                <span className="text-xs text-muted-foreground">5%</span>
                              </div>
                              <Progress value={5} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
