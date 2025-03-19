
import React, { useState, useEffect } from "react";
import { Cpu, Database, HardDrive, Wifi, GitBranch, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { fetchSystemMetrics } from "@/lib/systemMetrics";

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
    daw_priority: "Ableton Live",
    security_level: "AES-256",
  });

  const [optimizationActive, setOptimizationActive] = useState(false);

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

  const toggleOptimization = () => {
    setOptimizationActive(!optimizationActive);
    toast({
      title: optimizationActive 
        ? "Auto-Resource Allocation Disabled" 
        : "Auto-Resource Allocation Enabled",
      description: optimizationActive 
        ? "System resources will be distributed equally." 
        : "Resources are now prioritized for active DAWs.",
      duration: 3000,
    });
  };

  return (
    <section id="system" className="py-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">StudioFlow System Monitor</h2>
        <Button 
          variant={optimizationActive ? "default" : "outline"}
          className="gap-2"
          onClick={toggleOptimization}
        >
          <Cpu className="h-4 w-4" />
          {optimizationActive ? "Optimization Active" : "Enable Auto-Resource Allocation"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="CPU Usage" 
          icon={<Cpu className="h-5 w-5 text-blue-500" />} 
          value={metrics.cpu} 
          color="bg-blue-500" 
          detail={optimizationActive ? `Prioritizing: ${metrics.daw_priority}` : undefined}
        />
        <MetricCard 
          title="Memory" 
          icon={<Database className="h-5 w-5 text-green-500" />} 
          value={metrics.memory} 
          color="bg-green-500" 
          detail=".NET 9 Optimized"
        />
        <MetricCard 
          title="Storage" 
          icon={<HardDrive className="h-5 w-5 text-amber-500" />} 
          value={metrics.storage} 
          color="bg-amber-500" 
          detail="SAP HANA Optimized"
        />
        <MetricCard 
          title="Network" 
          icon={<Wifi className="h-5 w-5 text-purple-500" />} 
          value={metrics.network} 
          color="bg-purple-500" 
          detail="WebRTC + OSC 2.0"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-indigo-500" />
              <h3 className="font-medium text-sm">Version Control</h3>
            </div>
            <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-full">Blockchain-Based</span>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-sm text-muted-foreground">
              Git-like version control with immutable blockchain tracking of all changes.
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-rose-500" />
              <h3 className="font-medium text-sm">Security Status</h3>
            </div>
            <span className="text-xs bg-rose-500/10 text-rose-500 px-2 py-1 rounded-full">{metrics.security_level}</span>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-sm text-muted-foreground">
              Military-grade encryption for all files with TLS 1.3 and GDPR compliance.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  color: string;
  detail?: string;
}

const MetricCard = ({ title, icon, value, color, detail }: MetricCardProps) => {
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
        {detail && (
          <div className="mt-2 text-xs text-muted-foreground">{detail}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
