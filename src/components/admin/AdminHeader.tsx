
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  User,
  ShieldAlert,
  Bell,
  DownloadCloud,
  Settings,
  BarChart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  activeUsers: number;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeUsers }) => {
  const { t } = useLanguage();

  const handleReport = () => {
    toast({
      title: "Report Generation",
      description: "The system report is being generated and will be ready shortly.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("admin.dashboard")}</h1>
          <p className="text-muted-foreground">
            Manage your application, monitor performance, and support users
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleReport}>
            <DownloadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
          
          <Button variant="default" size="sm" className="gap-1">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{activeUsers}</p>
                <Badge variant="outline" className="text-xs border-green-500 text-green-500">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 rounded-full">
              <ClipboardList className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">12</p>
                <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">Today</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-destructive/10 p-3 rounded-full">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">System Alerts</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">3</p>
                <Badge variant="destructive" className="text-xs">Critical</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Bell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notifications</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">24</p>
                <Badge variant="outline" className="text-xs border-blue-500 text-blue-500">New</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />
    </div>
  );
};

export default AdminHeader;
