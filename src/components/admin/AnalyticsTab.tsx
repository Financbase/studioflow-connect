
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemMetrics } from "@/types/admin";

interface AnalyticsTabProps {
  systemMetrics: SystemMetrics;
  openTickets: number;
  resolvedToday: number;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ systemMetrics, openTickets, resolvedToday }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Analytics</CardTitle>
        <CardDescription>Performance metrics and system statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Resource Usage</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-muted-foreground">{systemMetrics.cpuUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      systemMetrics.cpuUsage > 90 ? 'bg-red-500' : 
                      systemMetrics.cpuUsage > 70 ? 'bg-orange-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${systemMetrics.cpuUsage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {systemMetrics.cpuUsage > 90 ? 'Critical - High CPU load detected' : 
                   systemMetrics.cpuUsage > 70 ? 'Warning - Elevated CPU usage' : 'Normal operation'}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-muted-foreground">{systemMetrics.memoryUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      systemMetrics.memoryUsage > 90 ? 'bg-red-500' : 
                      systemMetrics.memoryUsage > 70 ? 'bg-orange-500' : 'bg-green-500'
                    }`} 
                    style={{ width: `${systemMetrics.memoryUsage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {systemMetrics.memoryUsage > 90 ? 'Critical - Memory resources depleted' : 
                   systemMetrics.memoryUsage > 70 ? 'Warning - Memory usage high' : 'Normal memory allocation'}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm text-muted-foreground">{systemMetrics.diskUsage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      systemMetrics.diskUsage > 90 ? 'bg-red-500' : 
                      systemMetrics.diskUsage > 70 ? 'bg-orange-500' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${systemMetrics.diskUsage}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Audio Processing</span>
                  <span className="text-sm text-muted-foreground">{systemMetrics.audioProcessingLoad.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      systemMetrics.audioProcessingLoad > 90 ? 'bg-red-500' : 
                      systemMetrics.audioProcessingLoad > 70 ? 'bg-orange-500' : 'bg-purple-500'
                    }`} 
                    style={{ width: `${systemMetrics.audioProcessingLoad}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">User Statistics</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{systemMetrics.totalUsers}</p>
                    <p className="text-sm text-muted-foreground text-center">Total Users</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                    <p className="text-sm text-muted-foreground text-center">Active Now</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{openTickets}</p>
                    <p className="text-sm text-muted-foreground text-center">Open Tickets</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{resolvedToday}</p>
                    <p className="text-sm text-muted-foreground text-center">Resolved Today</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Plan Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Free</span>
                        <span className="text-xs text-muted-foreground">32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Standard</span>
                        <span className="text-xs text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Pro</span>
                        <span className="text-xs text-muted-foreground">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Enterprise</span>
                        <span className="text-xs text-muted-foreground">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
