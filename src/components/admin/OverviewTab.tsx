
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, MessageSquareText, ShieldAlert, CheckSquare, 
  Clock, User, RefreshCw, AudioLines, Database, 
  HardDrive, Server, Activity, Cpu
} from "lucide-react";
import MetricsCard from "./MetricsCard";
import RecentActivity from "./RecentActivity";
import SystemStatus from "./SystemStatus";
import RecentOverviewCards from "./RecentOverviewCards";
import { Ticket, UserSession, SystemMetrics } from "@/types/admin";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// Mock data for charts
const performanceData = [
  { name: "00:00", cpu: 45, memory: 30, disk: 20 },
  { name: "04:00", cpu: 38, memory: 32, disk: 22 },
  { name: "08:00", cpu: 65, memory: 48, disk: 25 },
  { name: "12:00", cpu: 78, memory: 56, disk: 28 },
  { name: "16:00", cpu: 85, memory: 61, disk: 30 },
  { name: "20:00", cpu: 72, memory: 52, disk: 27 },
  { name: "24:00", cpu: 55, memory: 40, disk: 23 },
];

interface OverviewTabProps {
  activeUsers: number;
  totalUsers: number;
  openTickets: number;
  criticalTickets: number;
  resolvedToday: number;
  systemMetrics: SystemMetrics;
  userSessions: UserSession[];
  tickets: Ticket[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  activeUsers, totalUsers, openTickets, criticalTickets, 
  resolvedToday, systemMetrics, userSessions, tickets 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Active Users"
          value={activeUsers}
          icon={<Users className="h-8 w-8 text-primary opacity-80" />}
          progressValue={activeUsers > 0 ? (activeUsers / totalUsers) * 100 : 0}
          description={`${activeUsers} of ${totalUsers} registered users`}
          color="primary"
        />
        
        <MetricsCard 
          title="Open Tickets"
          value={openTickets}
          icon={<MessageSquareText className="h-8 w-8 text-orange-500 opacity-80" />}
          progressValue={openTickets > 0 ? 100 : 0}
          description={`${criticalTickets} critical issues pending`}
          color="orange-500"
          progressColorClass="progress-gradient-warning"
        />
        
        <MetricsCard 
          title="Critical Issues"
          value={criticalTickets}
          icon={<ShieldAlert className="h-8 w-8 text-destructive opacity-80" />}
          progressValue={criticalTickets > 0 ? 100 : 0}
          description={criticalTickets > 0 ? "Attention required" : "No critical issues"}
          color="destructive"
          progressColorClass="progress-gradient-error"
        />
        
        <MetricsCard 
          title="Resolved Today"
          value={resolvedToday}
          icon={<CheckSquare className="h-8 w-8 text-green-500 opacity-80" />}
          progressValue={resolvedToday > 0 ? (resolvedToday / (resolvedToday + openTickets)) * 100 : 0}
          description={`${(resolvedToday / (resolvedToday + openTickets || 1) * 100).toFixed(0)}% resolution rate`}
          color="green-500"
          progressColorClass="progress-gradient-success"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading flex items-center">
              <Activity className="mr-2 h-4 w-4 text-primary" />
              System Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    tickLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickLine={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
                    unit="%" 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)', 
                      border: '1px solid rgba(107, 114, 128, 0.2)' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cpu" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                    name="CPU Usage"
                    unit="%"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                    name="Memory Usage"
                    unit="%"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="disk" 
                    stroke="#F59E0B" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                    name="Disk I/O"
                    unit="%"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <SystemStatus systemMetrics={systemMetrics} />
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full group">
              <RefreshCw className="h-3.5 w-3.5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Metrics
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-heading">Recent Activity</CardTitle>
            <Badge variant="outline" className="ml-2">Last 24 hours</Badge>
          </CardHeader>
          <CardContent>
            <RecentActivity tickets={tickets} userSessions={userSessions} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-heading">Server Status</CardTitle>
              <Badge className="bg-green-600">Online</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Cpu className="h-4 w-4 mr-1" /> CPU
                </span>
                <span className="font-medium">{systemMetrics.cpuUsage}%</span>
              </div>
              <Progress value={systemMetrics.cpuUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Server className="h-4 w-4 mr-1" /> Memory
                </span>
                <span className="font-medium">{systemMetrics.memoryUsage}%</span>
              </div>
              <Progress value={systemMetrics.memoryUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <HardDrive className="h-4 w-4 mr-1" /> Disk
                </span>
                <span className="font-medium">{systemMetrics.diskUsage}%</span>
              </div>
              <Progress value={systemMetrics.diskUsage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <AudioLines className="h-4 w-4 mr-1" /> Audio Processing
                </span>
                <span className="font-medium">{systemMetrics.audioProcessingLoad}%</span>
              </div>
              <Progress value={systemMetrics.audioProcessingLoad} className="h-2" />
            </div>
            
            <Separator />
            
            <div className="pt-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-medium">5d 12h 43m</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-8 border-primary/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">{systemMetrics.diskUsage}%</div>
                  <div className="text-xs text-muted-foreground">Used</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Space</span>
                <span className="font-medium">2.0 TB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used Space</span>
                <span className="font-medium">
                  {(2.0 * (systemMetrics.diskUsage / 100)).toFixed(1)} TB
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Free Space</span>
                <span className="font-medium">
                  {(2.0 * (1 - systemMetrics.diskUsage / 100)).toFixed(1)} TB
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-sm flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="outline" className="border-green-500 text-green-500">Healthy</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Database Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Main Database</div>
                  <div className="text-xs text-muted-foreground">PostgreSQL 14.8</div>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="border-green-500 text-green-500">Connected</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Connection Pool</div>
                  <div className="text-sm">Active: 8 / 50</div>
                  <Progress value={16} className="h-1" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Query Performance</div>
                  <div className="text-sm">Avg: 45ms</div>
                  <Progress value={45} max={200} className="h-1" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Cache Hit Ratio</div>
                  <div className="text-sm">98.5%</div>
                  <Progress value={98.5} className="h-1" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Total Size</div>
                  <div className="text-sm">425 MB</div>
                  <Progress value={42.5} max={1000} className="h-1" />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="font-medium">Today, 04:30 AM</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Scheduled Backup</span>
                <span className="font-medium">Tomorrow, 04:30 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RecentOverviewCards tickets={tickets} userSessions={userSessions} />
    </div>
  );
};

export default OverviewTab;
