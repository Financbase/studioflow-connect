
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, BarChart2, TicketPlus, Activity, Share2, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import components
import AdminHeader from "@/components/admin/AdminHeader";
import OverviewTab from "@/components/admin/OverviewTab";
import TicketsTab from "@/components/admin/TicketsTab";
import SessionsTab from "@/components/admin/SessionsTab";
import RemoteAssistanceTab from "@/components/admin/RemoteAssistanceTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import { useSystemMetrics } from "@/hooks/use-system-metrics";

const AdminDashboard = () => {
  const { themeVariant } = useTheme();
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { systemMetrics, tickets, userSessions, refreshMetrics } = useSystemMetrics();
  
  const [activeTab, setActiveTab] = useState("overview");
  
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
          <AdminHeader activeUsers={activeUsers} />
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center">
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
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 flex gap-1 items-center" 
                    onClick={refreshMetrics}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>
                
                <TabsContent value="overview" className="space-y-4 mt-0">
                  <OverviewTab 
                    activeUsers={activeUsers} 
                    totalUsers={systemMetrics.totalUsers}
                    openTickets={openTickets} 
                    criticalTickets={criticalTickets}
                    resolvedToday={resolvedToday}
                    systemMetrics={systemMetrics}
                    userSessions={userSessions}
                    tickets={tickets}
                  />
                </TabsContent>
                
                <TabsContent value="tickets" className="space-y-4 mt-0">
                  <TicketsTab tickets={tickets} />
                </TabsContent>
                
                <TabsContent value="sessions" className="space-y-4 mt-0">
                  <SessionsTab userSessions={userSessions} />
                </TabsContent>
                
                <TabsContent value="remote" className="space-y-4 mt-0">
                  <RemoteAssistanceTab />
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4 mt-0">
                  <AnalyticsTab systemMetrics={systemMetrics} openTickets={openTickets} resolvedToday={resolvedToday} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
