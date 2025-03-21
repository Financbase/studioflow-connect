
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, MessageSquareText, ShieldAlert, CheckSquare, 
  Clock, User, RefreshCw, AudioLines, Database 
} from "lucide-react";
import MetricsCard from "./MetricsCard";
import RecentActivity from "./RecentActivity";
import SystemStatus from "./SystemStatus";
import RecentOverviewCards from "./RecentOverviewCards";
import { Ticket, UserSession, SystemMetrics } from "@/types/admin";

interface OverviewTabProps {
  activeUsers: number;
  totalUsers: number;
  openTickets: number;
  criticalTickets: number;
  resolvedToday: number;
  systemMetrics: SystemMetrics;
  userSessions: UserSession[];
  tickets: Ticket[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  activeUsers, totalUsers, openTickets, criticalTickets, 
  resolvedToday, systemMetrics, userSessions, tickets 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Active Users"
          value={activeUsers}
          icon={<Users className="h-8 w-8 text-primary opacity-80" />}
          progressValue={activeUsers > 0 ? (activeUsers / totalUsers) * 100 : 0}
          description={`${activeUsers} of ${totalUsers} registered users`}
          color="primary"
        />
        
        <MetricsCard 
          title="Open Tickets"
          value={openTickets}
          icon={<MessageSquareText className="h-8 w-8 text-orange-500 opacity-80" />}
          progressValue={openTickets > 0 ? 100 : 0}
          description={`${criticalTickets} critical issues pending`}
          color="orange-500"
          progressColorClass="progress-gradient-warning"
        />
        
        <MetricsCard 
          title="Critical Issues"
          value={criticalTickets}
          icon={<ShieldAlert className="h-8 w-8 text-destructive opacity-80" />}
          progressValue={criticalTickets > 0 ? 100 : 0}
          description={criticalTickets > 0 ? "Attention required" : "No critical issues"}
          color="destructive"
          progressColorClass="progress-gradient-error"
        />
        
        <MetricsCard 
          title="Resolved Today"
          value={resolvedToday}
          icon={<CheckSquare className="h-8 w-8 text-green-500 opacity-80" />}
          progressValue={resolvedToday > 0 ? (resolvedToday / (resolvedToday + openTickets)) * 100 : 0}
          description={`${(resolvedToday / (resolvedToday + openTickets || 1) * 100).toFixed(0)}% resolution rate`}
          color="green-500"
          progressColorClass="progress-gradient-success"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <SystemStatus systemMetrics={systemMetrics} />
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full group">
              <RefreshCw className="h-3.5 w-3.5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Metrics
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity tickets={tickets} userSessions={userSessions} />
          </CardContent>
        </Card>
      </div>
      
      <RecentOverviewCards tickets={tickets} userSessions={userSessions} />
    </div>
  );
};

export default OverviewTab;
