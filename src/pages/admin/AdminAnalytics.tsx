
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { useSystemMetrics } from "@/hooks/use-system-metrics";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminAnalytics: React.FC = () => {
  const { systemMetrics } = useSystemMetrics();
  const { t } = useLanguage();
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">{t("admin.system_analytics")}</h1>
      <Separator className="mb-6" />
      
      <AnalyticsTab 
        systemMetrics={systemMetrics} 
        openTickets={systemMetrics.openTickets} 
        resolvedToday={systemMetrics.resolvedToday} 
      />
    </AdminLayout>
  );
};

export default AdminAnalytics;
