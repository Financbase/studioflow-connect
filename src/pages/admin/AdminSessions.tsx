
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SessionsTab from "@/components/admin/SessionsTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { useSystemMetrics } from "@/hooks/use-system-metrics";

const AdminSessions: React.FC = () => {
  const { userSessions } = useSystemMetrics();
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">User Sessions</h1>
      <Separator className="mb-6" />
      
      <SessionsTab userSessions={userSessions} />
    </AdminLayout>
  );
};

export default AdminSessions;
