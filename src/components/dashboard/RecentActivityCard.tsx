
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileMusic, Upload, Bluetooth, Share2 } from "lucide-react";

interface ActivityItem {
  id: number;
  action: string;
  name: string;
  time: string;
  icon: React.ReactNode;
}

const RecentActivityCard = () => {
  // Recent activity for timeline with icons
  const recentActivity: ActivityItem[] = [
    { 
      id: 1, 
      action: "Project Created", 
      name: "Ambient Soundscape", 
      time: "2 hours ago",
      icon: <FileMusic className="h-4 w-4 text-blue-500" />
    },
    { 
      id: 2, 
      action: "File Uploaded", 
      name: "vocal_take_final.wav", 
      time: "Yesterday",
      icon: <Upload className="h-4 w-4 text-green-500" />
    },
    { 
      id: 3, 
      action: "Device Connected", 
      name: "Focusrite Scarlett 2i2", 
      time: "3 days ago",
      icon: <Bluetooth className="h-4 w-4 text-purple-500" />
    },
    { 
      id: 4, 
      action: "Project Shared", 
      name: "Summer Beats EP", 
      time: "1 week ago",
      icon: <Share2 className="h-4 w-4 text-amber-500" />
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </div>
        <Button variant="ghost" size="sm">View all</Button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-muted" />
          <ul className="space-y-4 relative">
            {recentActivity.map((item) => (
              <li key={item.id} className="pl-7 relative">
                <div className="absolute left-0 rounded-full p-1 bg-card border flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex items-start justify-between pb-1 mb-1 border-b">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
