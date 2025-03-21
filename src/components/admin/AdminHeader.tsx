
import React from "react";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  activeUsers: number;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeUsers }) => {
  return (
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
  );
};

export default AdminHeader;
