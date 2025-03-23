
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
import { useLanguage } from "@/contexts/LanguageContext";
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
import { motion } from "framer-motion";
import { LineChart as LineChartIcon } from "lucide-react";

const AdminStats: React.FC = () => {
  const { systemMetrics } = useSystemMetrics();
  const { t } = useLanguage();
  
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
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
          <LineChartIcon className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">{t("admin.system_stats")}</h1>
      </motion.div>
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 border-border/60 hover:border-border">
            <CardHeader className="pb-2">
              <CardTitle>{t("dashboard.system_performance")}</CardTitle>
              <CardDescription>
                {t("dashboard.performance_metrics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)", 
                        color: "var(--card-foreground)" 
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#ffc658" strokeWidth={2} name="Network %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 border-border/60 hover:border-border">
            <CardHeader className="pb-2">
              <CardTitle>{t("dashboard.weekly_activity")}</CardTitle>
              <CardDescription>
                {t("dashboard.active_idle_sessions")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)", 
                        color: "var(--card-foreground)" 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Active Sessions" />
                    <Bar dataKey="idle" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Idle Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
