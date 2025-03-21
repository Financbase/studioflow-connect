
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Activity, Eye, MessageSquareText } from "lucide-react";
import { UserSession } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

interface SessionsTabProps {
  userSessions: UserSession[];
}

const SessionsTab: React.FC<SessionsTabProps> = ({ userSessions }) => {
  const handleRemoteAssistance = (sessionId: string) => {
    toast({
      title: "Remote Assistance Initiated",
      description: `Connecting to session #${sessionId}...`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active User Sessions</CardTitle>
        <CardDescription>Monitor current user activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userSessions.map(session => (
            <Card key={session.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{session.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {session.username}
                        <Badge variant={
                          session.plan === 'free' ? 'outline' :
                          session.plan === 'standard' ? 'secondary' :
                          session.plan === 'pro' ? 'default' : 'destructive'
                        } className="text-xs">
                          {session.plan.charAt(0).toUpperCase() + session.plan.slice(1)}
                        </Badge>
                      </h3>
                      <p className="text-xs text-muted-foreground">IP: {session.ip_address}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                        {session.user_agent}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Started: {new Date(session.started_at).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Last active: {new Date(session.last_active_at).toLocaleString()}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="h-8" onClick={() => handleRemoteAssistance(session.id)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        <MessageSquareText className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionsTab;
