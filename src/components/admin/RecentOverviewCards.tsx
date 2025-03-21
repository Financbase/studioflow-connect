
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Eye } from "lucide-react";
import { Ticket, UserSession } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

interface RecentOverviewCardsProps {
  tickets: Ticket[];
  userSessions: UserSession[];
}

const RecentOverviewCards: React.FC<RecentOverviewCardsProps> = ({ tickets, userSessions }) => {
  const handleRemoteAssistance = (sessionId: string) => {
    toast({
      title: "Remote Assistance Initiated",
      description: `Connecting to session #${sessionId}...`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>Latest support requests from users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.slice(0, 3).map(ticket => (
              <div key={ticket.id} className="flex items-start space-x-4 border-b pb-3">
                <div className="flex-shrink-0">
                  {ticket.status === 'open' && <Badge variant="destructive">Open</Badge>}
                  {ticket.status === 'in_progress' && <Badge variant="default" className="bg-yellow-500">In Progress</Badge>}
                  {ticket.status === 'resolved' && <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>}
                  {ticket.status === 'closed' && <Badge variant="outline">Closed</Badge>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ticket.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{ticket.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Clock className="inline-block h-3 w-3 mr-1" />
                    {new Date(ticket.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Active User Sessions</CardTitle>
          <CardDescription>Currently online users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userSessions.slice(0, 3).map(session => (
              <div key={session.id} className="flex items-center space-x-4 border-b pb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{session.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{session.username}</p>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 text-xs">
                      {session.plan.charAt(0).toUpperCase() + session.plan.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      {new Date(session.last_active_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoteAssistance(session.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentOverviewCards;
