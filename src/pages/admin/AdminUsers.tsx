
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UsersTab from "@/components/admin/UsersTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";

const AdminUsers: React.FC = () => {
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <Separator className="mb-6" />
      
      <UsersTab />
    </AdminLayout>
  );
};

export default AdminUsers;
