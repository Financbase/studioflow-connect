
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import RemoteAssistanceTab from "@/components/admin/RemoteAssistanceTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";

const AdminRemote: React.FC = () => {
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">Remote Assistance</h1>
      <Separator className="mb-6" />
      
      <RemoteAssistanceTab />
    </AdminLayout>
  );
};

export default AdminRemote;
