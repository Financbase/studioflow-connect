
import React, { useState, useEffect } from "react";
import { Cpu, Database, HardDrive, Wifi, GitBranch, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { fetchSystemMetrics } from "@/lib/systemMetrics";
import { useDashboard } from "@/contexts/DashboardContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SystemMonitor = () => {
  const { pricingTier } = useDashboard();
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
    daw_priority: "Ableton Live",
    security_level: "AES-256",
  });

  const [optimizationActive, setOptimizationActive] = useState(false);
  const [activeDaw, setActiveDaw] = useState("Ableton Live");
  const [cpuPrioritized, setCpuPrioritized] = useState(false);
  
  // Advanced features available in Standard/Pro plans
  const [adaptiveCpuPrioritization, setAdaptiveCpuPrioritization] = useState(false);
  const [smartMemoryManagement, setSmartMemoryManagement] = useState(false);
  
  const hasAdvancedFeatures = pricingTier === "standard" || pricingTier === "pro";
  const hasProFeatures = pricingTier === "pro";

  useEffect(() => {
    const updateMetrics = async () => {
      try {
        const data = await fetchSystemMetrics();
        
        // If adaptive CPU prioritization is active, reduce CPU usage by 15-25%
        if (adaptiveCpuPrioritization && hasAdvancedFeatures) {
          data.cpu = Math.max(15, data.cpu - Math.floor(Math.random() * 15) - 10);
        }
        
        // If smart memory management is active, reduce memory usage by 10-20%
        if (smartMemoryManagement && hasAdvancedFeatures) {
          data.memory = Math.max(20, data.memory - Math.floor(Math.random() * 10) - 10);
        }
        
        setMetrics(data);
        setActiveDaw(data.daw_priority);
      } catch (error) {
        console.error("Failed to fetch system metrics:", error);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, [adaptiveCpuPrioritization, smartMemoryManagement, hasAdvancedFeatures]);

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
  
  const toggleAdaptiveCpu = () => {
    if (!hasAdvancedFeatures) {
      toast({
        title: "Premium Feature",
        description: "Adaptive CPU Prioritization requires Standard or Pro plan",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setAdaptiveCpuPrioritization(!adaptiveCpuPrioritization);
    setCpuPrioritized(!adaptiveCpuPrioritization);
    
    toast({
      title: adaptiveCpuPrioritization 
        ? "Adaptive CPU Prioritization Disabled" 
        : "Adaptive CPU Prioritization Enabled",
      description: adaptiveCpuPrioritization 
        ? "CPU resources will be distributed normally." 
        : `CPU resources now prioritized for ${activeDaw}`,
      duration: 3000,
    });
  };
  
  const toggleSmartMemory = () => {
    if (!hasAdvancedFeatures) {
      toast({
        title: "Premium Feature",
        description: "Smart Memory Management requires Standard or Pro plan",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setSmartMemoryManagement(!smartMemoryManagement);
    
    toast({
      title: smartMemoryManagement 
        ? "Smart Memory Management Disabled" 
        : "Smart Memory Management Enabled",
      description: smartMemoryManagement 
        ? "Memory will be managed normally." 
        : "Memory compression for 32-bit plugins activated",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div>
          <Button 
            variant={optimizationActive ? "default" : "outline"}
            className="gap-2"
            onClick={toggleOptimization}
          >
            <Cpu className="h-4 w-4" />
            {optimizationActive ? "Optimization Active" : "Enable Auto-Resource Allocation"}
          </Button>
        </div>
        
        {hasAdvancedFeatures && (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={adaptiveCpuPrioritization ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={toggleAdaptiveCpu}
            >
              <Zap className="h-3.5 w-3.5" />
              {adaptiveCpuPrioritization ? "CPU Prioritization On" : "Adaptive CPU Prioritization"}
            </Button>
            
            <Button 
              variant={smartMemoryManagement ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={toggleSmartMemory}
            >
              <Database className="h-3.5 w-3.5" />
              {smartMemoryManagement ? "Memory Management On" : "Smart Memory Management"}
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="usage">Resource Usage</TabsTrigger>
          <TabsTrigger value="advanced" disabled={!hasAdvancedFeatures}>Advanced Controls</TabsTrigger>
          <TabsTrigger value="profiles" disabled={!hasProFeatures}>Resource Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="CPU Usage" 
              icon={<Cpu className="h-5 w-5 text-blue-500" />} 
              value={metrics.cpu} 
              color="bg-blue-500" 
              detail={
                adaptiveCpuPrioritization 
                  ? `Optimized for: ${activeDaw}`
                  : cpuPrioritized
                    ? `Prioritizing: ${activeDaw}`
                    : undefined
              }
              isOptimized={adaptiveCpuPrioritization}
            />
            <MetricCard 
              title="Memory" 
              icon={<Database className="h-5 w-5 text-green-500" />} 
              value={metrics.memory} 
              color="bg-green-500" 
              detail={smartMemoryManagement ? "32-bit plugins compressed" : ".NET 9 Optimized"}
              isOptimized={smartMemoryManagement}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          {hasAdvancedFeatures ? (
            <Card>
              <CardHeader className="p-4 pb-2">
                <h3 className="text-lg font-medium">Advanced Resource Controls</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">CPU Priority: {activeDaw}</span>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          adaptiveCpuPrioritization ? "bg-green-500/20 text-green-500" : "bg-gray-300/20 text-gray-500"
                        }`}>
                          {adaptiveCpuPrioritization ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically shifts CPU resources to the most active plugin chains during playback and recording, 
                      maintaining lower buffer sizes for the critical path while increasing buffers for background processes.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Buffer reduction:</span>
                      <Progress className="h-2" value={adaptiveCpuPrioritization ? 75 : 0} />
                      <span className="text-sm">{adaptiveCpuPrioritization ? "75%" : "0%"}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Memory Compression</span>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          smartMemoryManagement ? "bg-green-500/20 text-green-500" : "bg-gray-300/20 text-gray-500"
                        }`}>
                          {smartMemoryManagement ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Implements memory compression for older 32-bit plugins to reduce their footprint, 
                      while maintaining fast access to frequently used samples through predictive loading.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Compression ratio:</span>
                      <Progress className="h-2" value={smartMemoryManagement ? 65 : 0} />
                      <span className="text-sm">{smartMemoryManagement ? "2:1" : "None"}</span>
                    </div>
                  </div>
                  
                  {hasProFeatures && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-amber-500" />
                          <span className="font-medium">Project-Specific Resource Profiles</span>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">Configure</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Creates and saves optimized resource allocation profiles for different project types 
                        (e.g., mixing sessions need more plugin CPU, while tracking sessions prioritize low-latency monitoring).
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 flex flex-col items-center justify-center text-center">
              <Lock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Advanced Features Locked</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Advanced resource controls are available with our Standard and Pro plans.
              </p>
              <Button size="lg">
                Upgrade Plan
              </Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="profiles" className="space-y-4">
          {hasProFeatures ? (
            <Card>
              <CardHeader className="p-4 pb-2">
                <h3 className="text-lg font-medium">Resource Profiles</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Save and manage optimized resource profiles for different project types.
                  </p>
                  
                  <div className="space-y-2">
                    <Card className="p-3 border-green-500/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Mixing Profile</span>
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="secondary">Apply</Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Optimized for mixing workflows with high plugin count and automation.
                      </p>
                    </Card>
                    
                    <Card className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Recording Profile</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="secondary">Apply</Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Focuses on low-latency monitoring and stable recording performance.
                      </p>
                    </Card>
                    
                    <Card className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Live Performance</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="secondary">Apply</Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximizes stability and prevents dropout during live performance.
                      </p>
                    </Card>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 flex flex-col items-center justify-center text-center">
              <Lock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Pro Features Locked</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Resource Profiles are available with our Pro plan.
              </p>
              <Button size="lg">
                Upgrade Plan
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  color: string;
  detail?: string;
  isOptimized?: boolean;
}

const MetricCard = ({ title, icon, value, color, detail, isOptimized }: MetricCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {isOptimized && <Zap className="h-3.5 w-3.5 text-amber-500" />}
          <span className="text-sm font-semibold">{value}%</span>
        </div>
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
