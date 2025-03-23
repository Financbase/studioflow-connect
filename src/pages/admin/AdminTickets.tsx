
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import TicketsTab from "@/components/admin/TicketsTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { useSystemMetrics } from "@/hooks/use-system-metrics";

const AdminTickets: React.FC = () => {
  const { tickets } = useSystemMetrics();
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
      <Separator className="mb-6" />
      
      <TicketsTab tickets={tickets} />
    </AdminLayout>
  );
};

export default AdminTickets;
