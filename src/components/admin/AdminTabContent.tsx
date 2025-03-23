
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Panel } from "@/components/ui/panel";
import OverviewTab from "@/components/admin/OverviewTab";
import TicketsTab from "@/components/admin/TicketsTab";
import SessionsTab from "@/components/admin/SessionsTab";
import RemoteAssistanceTab from "@/components/admin/RemoteAssistanceTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import UsersTab from "@/components/admin/UsersTab";
import { Ticket, UserSession, SystemMetrics } from "@/types/admin";

interface AdminTabContentProps {
  activeUsers: number;
  totalUsers: number;
  openTickets: number;
  criticalTickets: number;
  resolvedToday: number;
  systemMetrics: SystemMetrics;
  userSessions: UserSession[];
  tickets: Ticket[];
}

const AdminTabContent: React.FC<AdminTabContentProps> = ({
  activeUsers,
  totalUsers,
  openTickets,
  criticalTickets,
  resolvedToday,
  systemMetrics,
  userSessions,
  tickets
}) => {
  return (
    <Panel className="mt-6">
      <TabsContent value="overview" className="space-y-4 mt-0">
        <OverviewTab 
          activeUsers={activeUsers} 
          totalUsers={totalUsers}
          openTickets={openTickets} 
          criticalTickets={criticalTickets}
          resolvedToday={resolvedToday}
          systemMetrics={systemMetrics}
          userSessions={userSessions}
          tickets={tickets}
        />
      </TabsContent>
      
      <TabsContent value="tickets" className="space-y-4 mt-0">
        <TicketsTab tickets={tickets} />
      </TabsContent>
      
      <TabsContent value="sessions" className="space-y-4 mt-0">
        <SessionsTab userSessions={userSessions} />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4 mt-0">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="remote" className="space-y-4 mt-0">
        <RemoteAssistanceTab />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4 mt-0">
        <AnalyticsTab systemMetrics={systemMetrics} openTickets={openTickets} resolvedToday={resolvedToday} />
      </TabsContent>
    </Panel>
  );
};

export default AdminTabContent;
