
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSystemMetrics } from "@/hooks/use-system-metrics";
import { toast } from "@/hooks/use-toast";
import { 
  RefreshCw, BarChart2, TicketPlus, Activity, 
  Share2, LineChart, ChevronLeft, HelpCircle, Users
} from "lucide-react";

// UI components
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Panel } from "@/components/ui/panel";

// Admin components
import AdminHeader from "@/components/admin/AdminHeader";
import OverviewTab from "@/components/admin/OverviewTab";
import TicketsTab from "@/components/admin/TicketsTab";
import SessionsTab from "@/components/admin/SessionsTab";
import RemoteAssistanceTab from "@/components/admin/RemoteAssistanceTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import UsersTab from "@/components/admin/UsersTab";

const AdminDashboard = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { systemMetrics, tickets, userSessions, refreshMetrics } = useSystemMetrics();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Authentication and admin permission check
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
  
  // Calculate metrics for dashboard
  const openTickets = tickets.filter(t => t.status === "open").length;
  const activeUsers = userSessions.length;
  const criticalTickets = tickets.filter(t => t.priority === "critical").length;
  const resolvedToday = tickets.filter(t => 
    t.status === "resolved" && 
    new Date(t.updated_at).toDateString() === new Date().toDateString()
  ).length;
  
  // Handle dashboard refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refreshMetrics();
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Dashboard data has been updated",
      });
    }, 1000);
  }, [refreshMetrics]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <PageContainer isMain className="py-8">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="gap-1 text-muted-foreground hover:text-foreground"
              >
                <Link to="/">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Link>
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => {
                  toast({
                    title: "Settings",
                    description: "Admin settings will be available soon"
                  });
                }}
              >
                Settings
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                asChild
              >
                <Link to="/support">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Help</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <AdminHeader activeUsers={activeUsers} />
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
                    <TabsTrigger value="overview" className="text-sm h-10">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.overview")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="tickets" className="text-sm h-10">
                      <TicketPlus className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.support_tickets")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="sessions" className="text-sm h-10">
                      <Activity className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.user_sessions")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="users" className="text-sm h-10">
                      <Users className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.manage_users")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="remote" className="text-sm h-10">
                      <Share2 className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.remote_assistance")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="text-sm h-10">
                      <LineChart className="mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">{t("admin.system_analytics")}</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 flex gap-1 items-center" 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                  </Button>
                </div>
                
                <Panel className="mt-6">
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
                  
                  <TabsContent value="users" className="space-y-4 mt-0">
                    <UsersTab />
                  </TabsContent>
                  
                  <TabsContent value="remote" className="space-y-4 mt-0">
                    <RemoteAssistanceTab />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-4 mt-0">
                    <AnalyticsTab systemMetrics={systemMetrics} openTickets={openTickets} resolvedToday={resolvedToday} />
                  </TabsContent>
                </Panel>
              </Tabs>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default AdminDashboard;
