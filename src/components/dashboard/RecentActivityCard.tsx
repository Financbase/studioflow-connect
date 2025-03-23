
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/language";
import { Button } from "@/components/ui/button";

interface RecentActivityCardProps {
  onViewActivity?: () => void;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ onViewActivity }) => {
  const { t, isInitialized } = useLanguage();
  
  // Example recent activities
  const activities = [
    { 
      id: 1, 
      user: "Alex", 
      avatar: "/avatars/alex.png", 
      action: isInitialized ? t("dashboard.activity.created") : "created", 
      project: "Ambient Synth", 
      time: "2 hours ago" 
    },
    { 
      id: 2, 
      user: "Maya", 
      avatar: "/avatars/maya.png", 
      action: isInitialized ? t("dashboard.activity.commented") : "commented on", 
      project: "Drum Sequence", 
      time: "3 hours ago" 
    },
    { 
      id: 3, 
      user: "Jamie", 
      avatar: "/avatars/jamie.png", 
      action: isInitialized ? t("dashboard.activity.shared") : "shared", 
      project: "Bass Riff", 
      time: "5 hours ago" 
    },
    { 
      id: 4, 
      user: "Sam", 
      avatar: "/avatars/sam.png", 
      action: isInitialized ? t("dashboard.activity.uploaded") : "uploaded", 
      project: "Vocal Sample", 
      time: "7 hours ago" 
    },
    { 
      id: 5, 
      user: "Taylor", 
      avatar: "/avatars/taylor.png", 
      action: isInitialized ? t("dashboard.activity.edited") : "edited", 
      project: "Guitar Loop", 
      time: "yesterday" 
    }
  ];

  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {isInitialized ? t("dashboard.recentActivity") : "Recent Activity"}
          </CardTitle>
          {onViewActivity && (
            <Button variant="ghost" size="sm" onClick={onViewActivity}>
              {isInitialized ? t("dashboard.viewAll") : "View All"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4 mt-2">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 space-y-0.5">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.project}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
