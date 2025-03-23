
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useSystemMetrics } from "@/hooks/use-system-metrics";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const AdminStats: React.FC = () => {
  const { systemMetrics } = useSystemMetrics();
  
  // Sample data for charts
  const performanceData = [
    { name: "Jan", cpu: 40, memory: 65, network: 35 },
    { name: "Feb", cpu: 55, memory: 59, network: 42 },
    { name: "Mar", cpu: 45, memory: 80, network: 40 },
    { name: "Apr", cpu: 65, memory: 70, network: 55 },
    { name: "May", cpu: 75, memory: 60, network: 50 },
    { name: "Jun", cpu: 60, memory: 75, network: 60 },
  ];
  
  const usageData = [
    { name: "Mon", active: 20, idle: 10 },
    { name: "Tue", active: 30, idle: 15 },
    { name: "Wed", active: 45, idle: 20 },
    { name: "Thu", active: 35, idle: 25 },
    { name: "Fri", active: 40, idle: 15 },
    { name: "Sat", active: 20, idle: 30 },
    { name: "Sun", active: 15, idle: 40 },
  ];
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <h1 className="text-2xl font-bold mb-4">System Statistics</h1>
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>
              CPU, Memory and Network usage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                  <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weekly User Activity</CardTitle>
            <CardDescription>
              Active vs. idle sessions per day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={usageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#8884d8" name="Active Sessions" />
                  <Bar dataKey="idle" fill="#82ca9d" name="Idle Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
