
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, PieChart, BarChart } from "lucide-react";

const AnalyticsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Your audio production activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity">
          <TabsList className="mb-4">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <div className="flex items-center justify-center h-[200px] border rounded-md">
              {/* Placeholder for activity chart */}
              <div className="text-center">
                <Activity className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Activity data visualization</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="storage" className="space-y-4">
            <div className="flex items-center justify-center h-[200px] border rounded-md">
              {/* Placeholder for storage chart */}
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Storage usage breakdown</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="flex items-center justify-center h-[200px] border rounded-md">
              {/* Placeholder for performance chart */}
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">System performance metrics</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
