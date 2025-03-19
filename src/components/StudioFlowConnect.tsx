
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  Plus, 
  Laptop, 
  Server, 
  Plug,
  Link, 
  Layers,
  Check,
  ArrowUpDown,
  Shield,
  Database,
  Clock,
  Shuffle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Drive {
  id: number;
  name: string;
  format: "HFS+" | "APFS" | "NTFS" | "exFAT" | "Universal";
  size: string;
  used: number;
  syncStatus: "synced" | "syncing" | "pending" | "error";
  accessLevel: "read/write" | "read-only";
  os: "macos" | "windows" | "linux" | "all";
}

const StudioFlowConnect = () => {
  const [drives, setDrives] = useState<Drive[]>([
    {
      id: 1,
      name: "Project Drive X",
      format: "NTFS", 
      size: "2TB",
      used: 68,
      syncStatus: "synced",
      accessLevel: "read/write",
      os: "windows"
    },
    {
      id: 2,
      name: "Sample Library (Mac)",
      format: "APFS",
      size: "4TB",
      used: 42,
      syncStatus: "synced",
      accessLevel: "read/write",
      os: "macos"
    },
    {
      id: 3,
      name: "Universal Archive",
      format: "Universal",
      size: "8TB",
      used: 35,
      syncStatus: "syncing",
      accessLevel: "read/write",
      os: "all"
    }
  ]);

  const [universalBridgeEnabled, setUniversalBridgeEnabled] = useState(true);
  const [versioningEnabled, setVersioningEnabled] = useState(true);
  const [hardwareAccelerationEnabled, setHardwareAccelerationEnabled] = useState(true);

  const connectNewDrive = () => {
    toast({
      title: "Drive Scanner Started",
      description: "Detecting available drives for universal connection...",
      duration: 3000,
    });
  };

  const toggleFeature = (feature: string) => {
    switch(feature) {
      case 'bridge':
        setUniversalBridgeEnabled(!universalBridgeEnabled);
        toast({
          title: universalBridgeEnabled ? "Universal Bridge Disabled" : "Universal Bridge Enabled",
          description: universalBridgeEnabled ? 
            "OS-specific file system drivers are now in use." : 
            "All drives now accessible across all operating systems.",
          duration: 3000,
        });
        break;
      case 'versioning':
        setVersioningEnabled(!versioningEnabled);
        toast({
          title: versioningEnabled ? "Auto-Versioning Disabled" : "Auto-Versioning Enabled",
          description: versioningEnabled ? 
            "Real-time file versioning has been disabled." : 
            "Real-time versioning now active for all audio projects.",
          duration: 3000,
        });
        break;
      case 'acceleration':
        setHardwareAccelerationEnabled(!hardwareAccelerationEnabled);
        toast({
          title: hardwareAccelerationEnabled ? "Hardware Acceleration Disabled" : "Hardware Acceleration Enabled",
          description: hardwareAccelerationEnabled ? 
            "Standard disk I/O operations in use." : 
            "GPU-accelerated disk access enabled for improved performance.",
          duration: 3000,
        });
        break;
    }
  };

  const convertDriveFormat = (id: number) => {
    setDrives(
      drives.map((drive) => {
        if (drive.id === id) {
          const newDrive = {
            ...drive,
            format: "Universal" as const,
            syncStatus: "syncing" as const,
            os: "all" as const
          };
          
          // Simulate conversion process
          setTimeout(() => {
            setDrives(prev => 
              prev.map(d => 
                d.id === id 
                  ? {...d, syncStatus: "synced" as const} 
                  : d
              )
            );
            
            toast({
              title: "Drive Conversion Complete",
              description: `${drive.name} is now accessible on all operating systems.`,
              duration: 3000,
            });
          }, 3000);
          
          return newDrive;
        }
        return drive;
      })
    );
    
    toast({
      title: "Converting Drive Format",
      description: `Converting ${drives.find(d => d.id === id)?.name} to Universal format...`,
      duration: 3000,
    });
  };

  return (
    <section id="studioflow-connect" className="py-6 w-full animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold">StudioFlow Connect</h2>
          <p className="text-muted-foreground">Open-source cross-platform storage access for audio production</p>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Open Source</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Universal Drive Manager</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drives.map((drive) => (
                  <Card key={drive.id} className="border-muted/70 hover:border-muted/90 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            drive.syncStatus === "synced" ? "bg-green-500" : 
                            drive.syncStatus === "syncing" ? "bg-blue-500 animate-pulse" :
                            drive.syncStatus === "pending" ? "bg-amber-500" : "bg-red-500"
                          }`} />
                          <div>
                            <h4 className="font-medium">{drive.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {drive.os === "windows" && <Laptop className="h-3 w-3" />}
                              {drive.os === "macos" && <Laptop className="h-3 w-3" />}
                              {drive.os === "linux" && <Server className="h-3 w-3" />}
                              {drive.os === "all" && <Database className="h-3 w-3" />}
                              <span>
                                {drive.format} • {drive.size} • {drive.accessLevel}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {drive.format !== "Universal" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => convertDriveFormat(drive.id)}
                            className="text-xs"
                          >
                            <Shuffle className="h-3 w-3 mr-1" />
                            Convert to Universal
                          </Button>
                        ) : (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                            Universal Format
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Storage Usage</span>
                            <span>{drive.used}%</span>
                          </div>
                          <Progress value={drive.used} className="h-1.5" />
                        </div>
                      </div>
                      
                      {drive.syncStatus === "syncing" && (
                        <div className="mt-3 border-t pt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Syncing progress:</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-1.5" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Estimated time remaining:</span>
                            <span>4 minutes</span>
                          </div>
                        </div>
                      )}
                      
                      {drive.format === "Universal" && versioningEnabled && (
                        <div className="mt-3 border-t pt-3 text-xs">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Project versions</span>
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current version:</span>
                              <span>v43 (2 min ago)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total versions:</span>
                              <span>43</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4">
                <Button onClick={connectNewDrive} className="gap-2">
                  <Plus className="h-4 w-4" /> Connect Drive
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Link className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Core Features</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-blue-500" />
                    <h4 className="text-sm font-medium">Universal Bridge</h4>
                  </div>
                  <Button 
                    variant={universalBridgeEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => toggleFeature('bridge')}
                    className="h-7 text-xs"
                  >
                    {universalBridgeEnabled ? "Enabled" : "Enable"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Provides seamless access to any drive format across macOS, Windows, and Linux platforms.
                </p>
              </div>
              
              <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <h4 className="text-sm font-medium">Auto-Versioning</h4>
                  </div>
                  <Button 
                    variant={versioningEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => toggleFeature('versioning')}
                    className="h-7 text-xs"
                  >
                    {versioningEnabled ? "Enabled" : "Enable"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically creates versions of all project files without manual saving.
                </p>
              </div>
              
              <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-amber-500" />
                    <h4 className="text-sm font-medium">Hardware Acceleration</h4>
                  </div>
                  <Button 
                    variant={hardwareAccelerationEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => toggleFeature('acceleration')}
                    className="h-7 text-xs"
                  >
                    {hardwareAccelerationEnabled ? "Enabled" : "Enable"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Utilizes GPU acceleration for faster file transfers and audio streaming.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-indigo-500" />
                <h3 className="text-lg font-medium">Legacy Integration</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Plugin Bridge Connected</span>
                <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  <Check className="h-3 w-3 mr-1" /> Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                StudioFlow Connect provides seamless support for legacy plugins and hardware through our universal plugin bridge.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configure Bridge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StudioFlowConnect;
