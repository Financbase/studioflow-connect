
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  action: string;
  name: string;
  time: string;
}

const RecentActivityCard = () => {
  // Recent activity for timeline
  const recentActivity = [
    { id: 1, action: "Project Created", name: "Ambient Soundscape", time: "2 hours ago" },
    { id: 2, action: "File Uploaded", name: "vocal_take_final.wav", time: "Yesterday" },
    { id: 3, action: "Device Connected", name: "Focusrite Scarlett 2i2", time: "3 days ago" },
    { id: 4, action: "Project Shared", name: "Summer Beats EP", time: "1 week ago" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivity.map((item) => (
            <li key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
              <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
              <div className="text-sm text-muted-foreground">{item.time}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
