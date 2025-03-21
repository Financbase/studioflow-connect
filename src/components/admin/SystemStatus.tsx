
import React from "react";
import { Progress } from "@/components/ui/progress";
import { SystemMetrics } from "@/types/admin";

interface SystemStatusProps {
  systemMetrics: SystemMetrics;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ systemMetrics }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">CPU Usage</span>
          <span className="text-sm text-muted-foreground">{systemMetrics.cpuUsage.toFixed(1)}%</span>
        </div>
        <Progress value={systemMetrics.cpuUsage} className="h-2" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Memory Usage</span>
          <span className="text-sm text-muted-foreground">{systemMetrics.memoryUsage.toFixed(1)}%</span>
        </div>
        <Progress value={systemMetrics.memoryUsage} className="h-2" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Disk Usage</span>
          <span className="text-sm text-muted-foreground">{systemMetrics.diskUsage.toFixed(1)}%</span>
        </div>
        <Progress value={systemMetrics.diskUsage} className="h-2" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Network Latency</span>
          <span className="text-sm text-muted-foreground">{systemMetrics.networkLatency.toFixed(1)} ms</span>
        </div>
        <Progress value={systemMetrics.networkLatency} className="h-2" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Audio Processing</span>
          <span className="text-sm text-muted-foreground">{systemMetrics.audioProcessingLoad.toFixed(1)}%</span>
        </div>
        <Progress value={systemMetrics.audioProcessingLoad} className="h-2" />
      </div>
    </div>
  );
};

export default SystemStatus;
