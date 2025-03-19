
import React, { useState, useEffect } from "react";
import { Cpu, Database, HardDrive, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchSystemMetrics } from "@/lib/systemMetrics";

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
  });

  useEffect(() => {
    const updateMetrics = async () => {
      try {
        const data = await fetchSystemMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch system metrics:", error);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="system" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">System Monitor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="CPU Usage" 
          icon={<Cpu className="h-5 w-5 text-blue-500" />} 
          value={metrics.cpu} 
          color="bg-blue-500" 
        />
        <MetricCard 
          title="Memory" 
          icon={<Database className="h-5 w-5 text-green-500" />} 
          value={metrics.memory} 
          color="bg-green-500" 
        />
        <MetricCard 
          title="Storage" 
          icon={<HardDrive className="h-5 w-5 text-amber-500" />} 
          value={metrics.storage} 
          color="bg-amber-500" 
        />
        <MetricCard 
          title="Network" 
          icon={<Wifi className="h-5 w-5 text-purple-500" />} 
          value={metrics.network} 
          color="bg-purple-500" 
        />
      </div>
    </section>
  );
};

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  color: string;
}

const MetricCard = ({ title, icon, value, color }: MetricCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <span className="text-sm font-semibold">{value}%</span>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className={`h-2 w-full bg-secondary rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${color} transition-all`} 
            style={{ width: `${value}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
