
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, User, CheckSquare, AudioLines, Database, TicketPlus } from "lucide-react";
import { Ticket, UserSession } from "@/types/admin";

interface RecentActivityProps {
  tickets: Ticket[];
  userSessions: UserSession[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ tickets, userSessions }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center border-b pb-2">
        <div className="rounded-full bg-orange-100 p-2 mr-3">
          <TicketPlus className="h-4 w-4 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm">New support ticket <span className="font-medium">#{tickets[0]?.id}</span> created</p>
          <p className="text-xs text-muted-foreground">
            {new Date(tickets[0]?.created_at || new Date()).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="outline" className="ml-2">Ticket</Badge>
      </div>
      
      <div className="flex items-center border-b pb-2">
        <div className="rounded-full bg-blue-100 p-2 mr-3">
          <User className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm">New user <span className="font-medium">{userSessions[0]?.username}</span> registered</p>
          <p className="text-xs text-muted-foreground">
            {new Date(Date.now() - 7200000).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="outline" className="ml-2">User</Badge>
      </div>
      
      <div className="flex items-center border-b pb-2">
        <div className="rounded-full bg-green-100 p-2 mr-3">
          <CheckSquare className="h-4 w-4 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm">Ticket <span className="font-medium">#{tickets[2]?.id}</span> marked as resolved</p>
          <p className="text-xs text-muted-foreground">
            {new Date(tickets[2]?.updated_at || new Date()).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="outline" className="ml-2">Ticket</Badge>
      </div>
      
      <div className="flex items-center border-b pb-2">
        <div className="rounded-full bg-purple-100 p-2 mr-3">
          <AudioLines className="h-4 w-4 text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm">Audio processing service <span className="font-medium">restarted</span></p>
          <p className="text-xs text-muted-foreground">
            {new Date(Date.now() - 5400000).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="outline" className="ml-2">System</Badge>
      </div>
      
      <div className="flex items-center">
        <div className="rounded-full bg-yellow-100 p-2 mr-3">
          <Database className="h-4 w-4 text-yellow-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm">Database <span className="font-medium">backup completed</span></p>
          <p className="text-xs text-muted-foreground">
            {new Date(Date.now() - 14400000).toLocaleTimeString()}
          </p>
        </div>
        <Badge variant="outline" className="ml-2">System</Badge>
      </div>
    </div>
  );
};

export default RecentActivity;
