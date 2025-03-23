
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { useSystemMetrics } from "@/hooks/use-system-metrics";

const AdminAnalytics: React.FC = () => {
  const { systemMetrics } = useSystemMetrics();
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">System Analytics</h1>
      <Separator className="mb-6" />
      
      <AnalyticsTab metrics={systemMetrics} />
    </AdminLayout>
  );
};

export default AdminAnalytics;
