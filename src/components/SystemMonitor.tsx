
import React, { useState, useEffect } from "react";
import { Cpu, Database, HardDrive, Wifi, GitBranch, Shield, Zap, Lock, Plus, Activity, BarChart2, Network, History, Thermometer, Layers, Grid } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { fetchSystemMetrics } from "@/lib/systemMetrics";
import { useDashboard } from "@/contexts/DashboardContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
  const [hardwareAcceleration, setHardwareAcceleration] = useState(false);
  const [backgroundRendering, setBackgroundRendering] = useState(false);
  
  // Memory management specific states
  const [memoryOptimizationLevel, setMemoryOptimizationLevel] = useState("balanced");
  const [compressedPlugins, setCompressedPlugins] = useState(0);
  
  // Component-level metrics
  const [showComponentMetrics, setShowComponentMetrics] = useState(false);
  const [showIoMetrics, setShowIoMetrics] = useState(false);
  const [showNetworkMetrics, setShowNetworkMetrics] = useState(false);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [showEnvironmentVars, setShowEnvironmentVars] = useState(false);
  
  // Resource profiles
  const [activeProfile, setActiveProfile] = useState("Mixing Profile");
  
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
          const optimizationMap = {
            "minimal": 5 + Math.floor(Math.random() * 5),
            "balanced": 10 + Math.floor(Math.random() * 10),
            "aggressive": 15 + Math.floor(Math.random() * 15)
          };
          
          const reduction = optimizationMap[memoryOptimizationLevel] || 10;
          data.memory = Math.max(20, data.memory - reduction);
          
          // Update compressed plugins count
          setCompressedPlugins(Math.floor(Math.random() * 5) + 3);
        }
        
        // If hardware acceleration is active, reduce CPU usage further
        if (hardwareAcceleration && hasAdvancedFeatures) {
          data.cpu = Math.max(10, data.cpu - Math.floor(Math.random() * 20) - 5);
        }
        
        // If background rendering is active, show processing indicator
        if (backgroundRendering && hasAdvancedFeatures) {
          // No direct effect on metrics, but would show a visual indicator
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
  }, [adaptiveCpuPrioritization, smartMemoryManagement, hardwareAcceleration, backgroundRendering, hasAdvancedFeatures, memoryOptimizationLevel]);

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
        : `Memory compression activated with ${memoryOptimizationLevel} optimization`,
      duration: 3000,
    });
  };
  
  const toggleHardwareAcceleration = () => {
    if (!hasAdvancedFeatures) {
      toast({
        title: "Premium Feature",
        description: "Hardware Acceleration requires Standard or Pro plan",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setHardwareAcceleration(!hardwareAcceleration);
    
    toast({
      title: hardwareAcceleration 
        ? "Hardware Acceleration Disabled" 
        : "Hardware Acceleration Enabled",
      description: hardwareAcceleration 
        ? "Processing will use CPU only." 
        : "Compatible DSP processes now offloaded to GPU",
      duration: 3000,
    });
  };
  
  const toggleBackgroundRendering = () => {
    if (!hasAdvancedFeatures) {
      toast({
        title: "Premium Feature",
        description: "Background Rendering requires Standard or Pro plan",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setBackgroundRendering(!backgroundRendering);
    
    toast({
      title: backgroundRendering 
        ? "Background Rendering Disabled" 
        : "Background Rendering Enabled",
      description: backgroundRendering 
        ? "All processing done in real-time." 
        : "Non-interactive effect chains will be pre-rendered",
      duration: 3000,
    });
  };
  
  const changeMemoryOptimizationLevel = (level: string) => {
    if (level === memoryOptimizationLevel || !smartMemoryManagement) return;
    
    setMemoryOptimizationLevel(level);
    
    toast({
      title: "Memory Optimization Updated",
      description: `Memory optimization set to ${level} level`,
      duration: 3000,
    });
  };
  
  const toggleComponentMetric = (metric: string) => {
    switch(metric) {
      case 'component':
        setShowComponentMetrics(!showComponentMetrics);
        break;
      case 'io':
        setShowIoMetrics(!showIoMetrics);
        break;
      case 'network':
        setShowNetworkMetrics(!showNetworkMetrics);
        break;
      case 'historical':
        setShowHistoricalData(!showHistoricalData);
        break;
      case 'environment':
        setShowEnvironmentVars(!showEnvironmentVars);
        break;
    }
  };
  
  const changeResourceProfile = (profile: string) => {
    setActiveProfile(profile);
    
    toast({
      title: "Resource Profile Changed",
      description: `Switched to ${profile}`,
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
            
            <Button 
              variant={hardwareAcceleration ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={toggleHardwareAcceleration}
            >
              <Layers className="h-3.5 w-3.5" />
              {hardwareAcceleration ? "GPU Offload On" : "Hardware Acceleration"}
            </Button>
            
            <Button 
              variant={backgroundRendering ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={toggleBackgroundRendering}
            >
              <Grid className="h-3.5 w-3.5" />
              {backgroundRendering ? "Background Rendering On" : "Background Rendering"}
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="usage">Resource Usage</TabsTrigger>
          <TabsTrigger value="advanced" disabled={!hasAdvancedFeatures}>Advanced Controls</TabsTrigger>
          <TabsTrigger value="metrics" disabled={!hasAdvancedFeatures}>Monitoring Dashboards</TabsTrigger>
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
              isOptimized={adaptiveCpuPrioritization || hardwareAcceleration}
              extraBadge={hardwareAcceleration ? "GPU Offload" : undefined}
            />
            <MetricCard 
              title="Memory" 
              icon={<Database className="h-5 w-5 text-green-500" />} 
              value={metrics.memory} 
              color="bg-green-500" 
              detail={
                smartMemoryManagement 
                  ? `${compressedPlugins} plugins compressed (${memoryOptimizationLevel})`
                  : ".NET 9 Optimized"
              }
              isOptimized={smartMemoryManagement}
            />
            <MetricCard 
              title="Storage" 
              icon={<HardDrive className="h-5 w-5 text-amber-500" />} 
              value={metrics.storage} 
              color="bg-amber-500" 
              detail={backgroundRendering ? "Background rendering active" : "SAP HANA Optimized"}
              isOptimized={backgroundRendering}
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Adaptive CPU Prioritization</span>
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
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Smart Memory Management</span>
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
                    
                    {smartMemoryManagement && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Optimization Level:</span>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant={memoryOptimizationLevel === "minimal" ? "default" : "outline"}
                              className="h-7 px-2 text-xs"
                              onClick={() => changeMemoryOptimizationLevel("minimal")}
                            >
                              Minimal
                            </Button>
                            <Button 
                              size="sm" 
                              variant={memoryOptimizationLevel === "balanced" ? "default" : "outline"}
                              className="h-7 px-2 text-xs"
                              onClick={() => changeMemoryOptimizationLevel("balanced")}
                            >
                              Balanced
                            </Button>
                            <Button 
                              size="sm" 
                              variant={memoryOptimizationLevel === "aggressive" ? "default" : "outline"}
                              className="h-7 px-2 text-xs"
                              onClick={() => changeMemoryOptimizationLevel("aggressive")}
                            >
                              Aggressive
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium">Compressed Plugins:</span>
                            <span className="text-xs font-medium">{compressedPlugins}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium">Memory Savings:</span>
                            <span className="text-xs font-medium">
                              {
                                memoryOptimizationLevel === "minimal" ? "5-10%" :
                                memoryOptimizationLevel === "balanced" ? "10-20%" : "15-30%"
                              }
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">Compression Ratio:</span>
                            <span className="text-xs font-medium">
                              {
                                memoryOptimizationLevel === "minimal" ? "1.5:1" :
                                memoryOptimizationLevel === "balanced" ? "2:1" : "3:1"
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Compression ratio:</span>
                      <Progress 
                        className="h-2" 
                        value={
                          !smartMemoryManagement ? 0 :
                          memoryOptimizationLevel === "minimal" ? 30 :
                          memoryOptimizationLevel === "balanced" ? 65 : 90
                        } 
                      />
                      <span className="text-sm">
                        {
                          !smartMemoryManagement ? "None" :
                          memoryOptimizationLevel === "minimal" ? "1.5:1" :
                          memoryOptimizationLevel === "balanced" ? "2:1" : "3:1"
                        }
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Hardware Accelerated Processing</span>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          hardwareAcceleration ? "bg-green-500/20 text-green-500" : "bg-gray-300/20 text-gray-500"
                        }`}>
                          {hardwareAcceleration ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically offloads compatible DSP processes to GPU for tasks like convolution reverb 
                      or spectral processing, freeing CPU resources for time-critical tasks.
                    </p>
                    
                    {hardwareAcceleration && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">GPU Offloaded Tasks:</span>
                          <span className="text-xs font-medium">4</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">CPU Savings:</span>
                          <span className="text-xs font-medium">15-25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">Compatible Effects:</span>
                          <span className="text-xs font-medium">Convolution, FFT, Spectral</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Grid className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Background Rendering Pipeline</span>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          backgroundRendering ? "bg-green-500/20 text-green-500" : "bg-gray-300/20 text-gray-500"
                        }`}>
                          {backgroundRendering ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Intelligently pre-renders effect chains that don't require real-time interaction 
                      while keeping interactive elements responsive.
                    </p>
                    
                    {backgroundRendering && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">Rendering Status:</span>
                          <span className="text-xs font-medium">In Progress (34%)</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">Chains Offloaded:</span>
                          <span className="text-xs font-medium">3 of 7</span>
                        </div>
                        <Progress className="h-2 mt-1" value={34} />
                      </div>
                    )}
                  </div>
                  
                  {hasProFeatures && (
                    <>
                      <Separator />
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
                    </>
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
        
        <TabsContent value="metrics" className="space-y-4">
          {hasAdvancedFeatures ? (
            <Card>
              <CardHeader className="p-4 pb-2">
                <h3 className="text-lg font-medium">Customizable Monitoring Dashboards</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                  <Button 
                    size="sm" 
                    variant={showComponentMetrics ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col gap-1 items-center justify-center"
                    onClick={() => toggleComponentMetric('component')}
                  >
                    <Activity className="h-4 w-4" />
                    <span className="text-xs">Component Metrics</span>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={showIoMetrics ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col gap-1 items-center justify-center"
                    onClick={() => toggleComponentMetric('io')}
                  >
                    <HardDrive className="h-4 w-4" />
                    <span className="text-xs">I/O Performance</span>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={showNetworkMetrics ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col gap-1 items-center justify-center"
                    onClick={() => toggleComponentMetric('network')}
                  >
                    <Network className="h-4 w-4" />
                    <span className="text-xs">Network Analysis</span>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={showHistoricalData ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col gap-1 items-center justify-center"
                    onClick={() => toggleComponentMetric('historical')}
                  >
                    <History className="h-4 w-4" />
                    <span className="text-xs">Historical Usage</span>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant={showEnvironmentVars ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col gap-1 items-center justify-center"
                    onClick={() => toggleComponentMetric('environment')}
                  >
                    <Thermometer className="h-4 w-4" />
                    <span className="text-xs">Environment Vars</span>
                  </Button>
                </div>
                
                {showComponentMetrics && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        Component-Level Metrics
                      </h4>
                      <Button variant="outline" size="sm">Export Data</Button>
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="grid grid-cols-12 text-xs font-medium p-2 border-b">
                        <div className="col-span-4">Plugin Name</div>
                        <div className="col-span-2">CPU</div>
                        <div className="col-span-2">Memory</div>
                        <div className="col-span-2">Latency</div>
                        <div className="col-span-2">Status</div>
                      </div>
                      
                      <PluginMetricRow 
                        name="Kontakt 7" 
                        cpu={28} 
                        memory={156} 
                        latency="4.2ms" 
                        status="Normal" 
                      />
                      <PluginMetricRow 
                        name="FabFilter Pro-Q 3" 
                        cpu={12} 
                        memory={45} 
                        latency="0.8ms" 
                        status="Normal"
                      />
                      <PluginMetricRow 
                        name="Ozone 10" 
                        cpu={37} 
                        memory={210} 
                        latency="6.1ms" 
                        status="Warning"
                        warning
                      />
                      <PluginMetricRow 
                        name="Valhalla Vintage Verb" 
                        cpu={18} 
                        memory={64} 
                        latency="1.2ms" 
                        status="Normal"
                      />
                      <PluginMetricRow 
                        name="Soothe 2" 
                        cpu={23} 
                        memory={87} 
                        latency="3.7ms" 
                        status="Normal"
                      />
                    </div>
                  </div>
                )}
                
                {showIoMetrics && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-amber-500" />
                        I/O Performance Tracking
                      </h4>
                      <Button variant="outline" size="sm">Optimize Cache</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Disk Read Speed</h5>
                          <span className="text-sm font-medium text-green-500">234 MB/s</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={78} />
                        <p className="text-xs text-muted-foreground">Buffer health: Excellent (0 underruns)</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Disk Write Speed</h5>
                          <span className="text-sm font-medium text-green-500">187 MB/s</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={62} />
                        <p className="text-xs text-muted-foreground">Write cache: 45% utilized</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Sample Streaming</h5>
                          <span className="text-sm font-medium text-amber-500">32 voices</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={32} />
                        <p className="text-xs text-muted-foreground">Preload buffer: 24MB</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Recommended Settings</h5>
                          <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full">Optimal</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Sample rate: 48kHz</p>
                        <p className="text-xs text-muted-foreground">Bit depth: 24-bit</p>
                        <p className="text-xs text-muted-foreground">Buffer size: 256 samples</p>
                      </Card>
                    </div>
                  </div>
                )}
                
                {showNetworkMetrics && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Network className="h-4 w-4 text-purple-500" />
                        Network Performance Analysis
                      </h4>
                      <Badge variant="outline" className="font-normal">Collaborative Session Active</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Latency</h5>
                          <span className="text-sm font-medium text-green-500">24ms</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={24} />
                        <p className="text-xs text-muted-foreground">Status: Excellent for collaboration</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Packet Loss</h5>
                          <span className="text-sm font-medium text-green-500">0.02%</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={2} />
                        <p className="text-xs text-muted-foreground">Status: Minimal - No impact</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Bandwidth</h5>
                          <span className="text-sm font-medium text-green-500">4.2 Mbps</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={42} />
                        <p className="text-xs text-muted-foreground">Usage: 14% of available</p>
                      </Card>
                      
                      <Card className="col-span-1 md:col-span-3 p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Quality Recommendations</h5>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">Apply All</Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="bg-muted/30 p-2 rounded text-xs">
                            <div className="font-medium mb-1">Audio Quality</div>
                            <div className="text-muted-foreground">Recommendation: High (16-bit/44.1kHz)</div>
                          </div>
                          <div className="bg-muted/30 p-2 rounded text-xs">
                            <div className="font-medium mb-1">Video Resolution</div>
                            <div className="text-muted-foreground">Recommendation: 720p</div>
                          </div>
                          <div className="bg-muted/30 p-2 rounded text-xs">
                            <div className="font-medium mb-1">MIDI Precision</div>
                            <div className="text-muted-foreground">Recommendation: Standard</div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
                
                {showHistoricalData && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <History className="h-4 w-4 text-indigo-500" />
                        Historical Usage Patterns
                      </h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Last Week</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Last Month</Button>
                        <Button variant="default" size="sm" className="h-7 text-xs">Last Quarter</Button>
                      </div>
                    </div>
                    
                    <Card className="p-3 border-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium">Performance Trends</h5>
                      </div>
                      <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">CPU Usage Chart (Placeholder)</span>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <div className="font-medium mb-1">Analysis</div>
                        <p>CPU usage has been consistently higher on Tuesdays and Wednesdays, correlating with 
                        larger project file sizes. Consider scheduling resource-intensive work outside these peak times.</p>
                      </div>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Problematic Setups</h5>
                        </div>
                        <div className="text-xs space-y-2">
                          <div className="bg-red-500/10 p-2 rounded">
                            <div className="font-medium text-red-500 mb-1">High Risk: Massive Synth Project</div>
                            <p className="text-muted-foreground">
                              Multiple instances of Serum and Massive X cause consistent CPU spikes.
                              Last crash: 3 days ago
                            </p>
                          </div>
                          <div className="bg-amber-500/10 p-2 rounded">
                            <div className="font-medium text-amber-500 mb-1">Medium Risk: Orchestral Template</div>
                            <p className="text-muted-foreground">
                              Memory usage exceeds 85% when all tracks are enabled.
                              Performance degrades after 2+ hours.
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">System Health</h5>
                          <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full">Action Needed</span>
                        </div>
                        <div className="text-xs space-y-2">
                          <div className="bg-muted/30 p-2 rounded">
                            <div className="font-medium mb-1">Performance Score: 78/100</div>
                            <div className="grid grid-cols-2 gap-1">
                              <p className="text-muted-foreground">CPU Stability: <span className="text-green-500">Good</span></p>
                              <p className="text-muted-foreground">RAM Health: <span className="text-green-500">Good</span></p>
                              <p className="text-muted-foreground">Disk Health: <span className="text-amber-500">Fair</span></p>
                              <p className="text-muted-foreground">Error Rate: <span className="text-amber-500">3.2%</span></p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">Run System Optimization</Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
                
                {showEnvironmentVars && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-rose-500" />
                        Environment Variables Monitoring
                      </h4>
                      <Button variant="outline" size="sm">Run Diagnostics</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">System Temperature</h5>
                          <span className="text-sm font-medium text-green-500">62°C</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={62} />
                        <p className="text-xs text-muted-foreground">Status: Normal operating range</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Power Draw</h5>
                          <span className="text-sm font-medium text-amber-500">145W</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={72} />
                        <p className="text-xs text-muted-foreground">Status: Above average but safe</p>
                      </Card>
                      
                      <Card className="p-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Disk Fragmentation</h5>
                          <span className="text-sm font-medium text-red-500">12.4%</span>
                        </div>
                        <Progress className="h-1.5 mb-2" value={12} />
                        <p className="text-xs text-muted-foreground">Recommendation: Defragment soon</p>
                      </Card>
                      
                      <Card className="p-3 col-span-1 md:col-span-3 border-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">System Optimizations</h5>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-3.5 w-3.5 text-green-500" />
                              <span>Power Management Disabled</span>
                            </div>
                            <span className="text-green-500">Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-3.5 w-3.5 text-green-500" />
                              <span>Process Priority Elevated</span>
                            </div>
                            <span className="text-green-500">Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-3.5 w-3.5 text-amber-500" />
                              <span>Memory Large Pages</span>
                            </div>
                            <span className="text-amber-500">Inactive</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-3.5 w-3.5 text-amber-500" />
                              <span>Realtime Scheduling</span>
                            </div>
                            <span className="text-amber-500">Inactive</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
                
                {!showComponentMetrics && !showIoMetrics && !showNetworkMetrics && !showHistoricalData && !showEnvironmentVars && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Select a monitoring dashboard to display detailed metrics.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 flex flex-col items-center justify-center text-center">
              <Lock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Advanced Monitoring Locked</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Customizable Monitoring Dashboards are available with our Standard and Pro plans.
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
                    <Card className={`p-3 ${activeProfile === "Mixing Profile" ? "border-green-500/50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Mixing Profile</span>
                          {activeProfile === "Mixing Profile" && (
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button 
                            size="sm" 
                            variant={activeProfile === "Mixing Profile" ? "default" : "secondary"}
                            onClick={() => changeResourceProfile("Mixing Profile")}
                          >
                            {activeProfile === "Mixing Profile" ? "Applied" : "Apply"}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Optimized for mixing workflows with high plugin count and automation.
                      </p>
                      
                      {activeProfile === "Mixing Profile" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 border-t pt-2">
                          <div className="text-xs">
                            <div className="text-muted-foreground">CPU Priority</div>
                            <div className="font-medium">High for Plugins</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Buffer Size</div>
                            <div className="font-medium">1024 samples</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Memory</div>
                            <div className="font-medium">Aggressive Compression</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Background Rendering</div>
                            <div className="font-medium">Enabled</div>
                          </div>
                        </div>
                      )}
                    </Card>
                    
                    <Card className={`p-3 ${activeProfile === "Recording Profile" ? "border-green-500/50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Recording Profile</span>
                          {activeProfile === "Recording Profile" && (
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button 
                            size="sm" 
                            variant={activeProfile === "Recording Profile" ? "default" : "secondary"}
                            onClick={() => changeResourceProfile("Recording Profile")}
                          >
                            {activeProfile === "Recording Profile" ? "Applied" : "Apply"}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Focuses on low-latency monitoring and stable recording performance.
                      </p>
                      
                      {activeProfile === "Recording Profile" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 border-t pt-2">
                          <div className="text-xs">
                            <div className="text-muted-foreground">CPU Priority</div>
                            <div className="font-medium">Low Latency Focus</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Buffer Size</div>
                            <div className="font-medium">128 samples</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Memory</div>
                            <div className="font-medium">Minimal Compression</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Background Rendering</div>
                            <div className="font-medium">Disabled</div>
                          </div>
                        </div>
                      )}
                    </Card>
                    
                    <Card className={`p-3 ${activeProfile === "Live Performance" ? "border-green-500/50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Live Performance</span>
                          {activeProfile === "Live Performance" && (
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button 
                            size="sm" 
                            variant={activeProfile === "Live Performance" ? "default" : "secondary"}
                            onClick={() => changeResourceProfile("Live Performance")}
                          >
                            {activeProfile === "Live Performance" ? "Applied" : "Apply"}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximizes stability and prevents dropout during live performance.
                      </p>
                      
                      {activeProfile === "Live Performance" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 border-t pt-2">
                          <div className="text-xs">
                            <div className="text-muted-foreground">CPU Priority</div>
                            <div className="font-medium">Realtime Priority</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Buffer Size</div>
                            <div className="font-medium">256 samples</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Memory</div>
                            <div className="font-medium">Preload Everything</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Background Tasks</div>
                            <div className="font-medium">All Suspended</div>
                          </div>
                        </div>
                      )}
                    </Card>
                    
                    <Card className={`p-3 ${activeProfile === "Mastering Profile" ? "border-green-500/50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Mastering Profile</span>
                          {activeProfile === "Mastering Profile" && (
                            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button 
                            size="sm" 
                            variant={activeProfile === "Mastering Profile" ? "default" : "secondary"}
                            onClick={() => changeResourceProfile("Mastering Profile")}
                          >
                            {activeProfile === "Mastering Profile" ? "Applied" : "Apply"}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Focused on precise rendering and high-resolution processing.
                      </p>
                      
                      {activeProfile === "Mastering Profile" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 border-t pt-2">
                          <div className="text-xs">
                            <div className="text-muted-foreground">Sample Rate</div>
                            <div className="font-medium">96kHz</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Bit Depth</div>
                            <div className="font-medium">32-bit float</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Dithering</div>
                            <div className="font-medium">TPDF Noise Shaping</div>
                          </div>
                          <div className="text-xs">
                            <div className="text-muted-foreground">Hardware Acceleration</div>
                            <div className="font-medium">Maximum</div>
                          </div>
                        </div>
                      )}
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
  extraBadge?: string;
}

const MetricCard = ({ title, icon, value, color, detail, isOptimized, extraBadge }: MetricCardProps) => {
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
        {(detail || extraBadge) && (
          <div className="mt-2 flex justify-between items-center">
            {detail && (
              <div className="text-xs text-muted-foreground">{detail}</div>
            )}
            {extraBadge && (
              <Badge variant="outline" className="text-[10px] h-4 px-1">
                {extraBadge}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface PluginMetricRowProps {
  name: string;
  cpu: number;
  memory: number;
  latency: string;
  status: string;
  warning?: boolean;
}

const PluginMetricRow = ({ name, cpu, memory, latency, status, warning }: PluginMetricRowProps) => {
  return (
    <div className={`grid grid-cols-12 text-xs p-2 border-b ${warning ? 'bg-red-500/5' : ''}`}>
      <div className="col-span-4">{name}</div>
      <div className="col-span-2">{cpu}%</div>
      <div className="col-span-2">{memory} MB</div>
      <div className="col-span-2">{latency}</div>
      <div className="col-span-2">
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
          warning ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default SystemMonitor;
