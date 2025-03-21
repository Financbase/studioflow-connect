
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const UsageStatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Stats</CardTitle>
        <CardDescription>This month's activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CPU Usage</span>
            <span className="font-medium">65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage</span>
            <span className="font-medium">45%</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Projects</span>
            <span className="font-medium">12/20</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>AI Credits</span>
            <span className="font-medium">38%</span>
          </div>
          <Progress value={38} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageStatsCard;
