
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSystemMetrics } from "@/hooks/use-system-metrics";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";

// Admin components
import AdminLayout from "@/components/admin/AdminLayout";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabs from "@/components/admin/AdminTabs";
import AdminTabContent from "@/components/admin/AdminTabContent";
import AdminActionsBar from "@/components/admin/AdminActionsBar";

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
    <AdminLayout>
      <AdminToolbar />
      <AdminHeader activeUsers={activeUsers} />
      <Separator />
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <AdminTabs activeTab={activeTab} />
              <AdminActionsBar isRefreshing={isRefreshing} onRefresh={handleRefresh} />
            </div>
            
            <AdminTabContent
              activeUsers={activeUsers}
              totalUsers={systemMetrics.totalUsers}
              openTickets={openTickets}
              criticalTickets={criticalTickets}
              resolvedToday={resolvedToday}
              systemMetrics={systemMetrics}
              userSessions={userSessions}
              tickets={tickets}
            />
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
