
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { ProfileStats } from "./types";

interface ActivityStatsProps {
  stats: ProfileStats;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Activity Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{stats.projectsCreated}</p>
            <p className="text-xs text-muted-foreground">Projects Created</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{stats.tracksUploaded}</p>
            <p className="text-xs text-muted-foreground">Tracks Uploaded</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{stats.connectionsCount}</p>
            <p className="text-xs text-muted-foreground">Connected DAWs</p>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Active Sessions</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full gap-2">
          <BarChart className="h-4 w-4" />
          View Detailed Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityStats;
