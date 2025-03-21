
import React from "react";
import { Progress } from "@/components/ui/progress";
import { SystemMetrics } from "@/types/admin";

interface SystemStatusProps {
  systemMetrics: SystemMetrics;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ systemMetrics }) => {
  // Helper function to determine progress color class based on value
  const getProgressClass = (value: number) => {
    if (value > 90) return "progress-gradient-error";
    if (value > 70) return "progress-gradient-warning";
    return "progress-gradient-success";
  };
  
  const getLabelClass = (value: number) => {
    if (value > 90) return "text-rose-500 dark:text-rose-400";
    if (value > 70) return "text-amber-500 dark:text-amber-400";
    return "text-emerald-500 dark:text-emerald-400";
  };
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">CPU Usage</span>
          <span className={`text-sm font-medium ${getLabelClass(systemMetrics.cpuUsage)}`}>
            {systemMetrics.cpuUsage.toFixed(1)}%
          </span>
        </div>
        <Progress value={systemMetrics.cpuUsage} className={`h-2 ${getProgressClass(systemMetrics.cpuUsage)}`} />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Memory Usage</span>
          <span className={`text-sm font-medium ${getLabelClass(systemMetrics.memoryUsage)}`}>
            {systemMetrics.memoryUsage.toFixed(1)}%
          </span>
        </div>
        <Progress value={systemMetrics.memoryUsage} className={`h-2 ${getProgressClass(systemMetrics.memoryUsage)}`} />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Disk Usage</span>
          <span className={`text-sm font-medium ${getLabelClass(systemMetrics.diskUsage)}`}>
            {systemMetrics.diskUsage.toFixed(1)}%
          </span>
        </div>
        <Progress value={systemMetrics.diskUsage} className={`h-2 ${getProgressClass(systemMetrics.diskUsage)}`} />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Network Latency</span>
          <span className={`text-sm font-medium ${
            systemMetrics.networkLatency > 100 ? "text-rose-500 dark:text-rose-400" : 
            systemMetrics.networkLatency > 50 ? "text-amber-500 dark:text-amber-400" : 
            "text-emerald-500 dark:text-emerald-400"}`}>
            {systemMetrics.networkLatency.toFixed(1)} ms
          </span>
        </div>
        <Progress 
          value={Math.min(100, (systemMetrics.networkLatency / 2))} 
          className={`h-2 ${systemMetrics.networkLatency > 100 ? "progress-gradient-error" : 
                            systemMetrics.networkLatency > 50 ? "progress-gradient-warning" : 
                            "progress-gradient-success"}`} 
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Audio Processing</span>
          <span className={`text-sm font-medium ${getLabelClass(systemMetrics.audioProcessingLoad)}`}>
            {systemMetrics.audioProcessingLoad.toFixed(1)}%
          </span>
        </div>
        <Progress 
          value={systemMetrics.audioProcessingLoad} 
          className={`h-2 ${getProgressClass(systemMetrics.audioProcessingLoad)}`} 
        />
      </div>
    </div>
  );
};

export default SystemStatus;
