
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/language";

const RecentActivityCard: React.FC = () => {
  const { t, isInitialized } = useLanguage();
  
  if (!isInitialized) {
    return null;
  }
  
  const activities = [
    {
      id: 1,
      user: { name: "Alex Morgan", avatar: "/avatars/01.png", initials: "AM" },
      action: "Updated the project settings",
      time: "2 hours ago",
      type: "settings"
    },
    {
      id: 2,
      user: { name: "Jamie Todd", avatar: "/avatars/02.png", initials: "JT" },
      action: "Uploaded a new audio track",
      time: "5 hours ago",
      type: "upload"
    },
    {
      id: 3,
      user: { name: "Sandra Miller", avatar: "/avatars/03.png", initials: "SM" },
      action: "Created a new session",
      time: "Yesterday",
      type: "create"
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground/80">{activity.time}</p>
              </div>
              <div className="text-xs text-muted-foreground/70">
                {activity.type === "create" && t("dashboard.activity.created")}
                {activity.type === "upload" && t("dashboard.activity.lastModified")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
