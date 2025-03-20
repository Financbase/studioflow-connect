
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  Plus, 
  Laptop, 
  Server, 
  Plug,
  Link as LinkIcon, 
  Layers,
  Check,
  ArrowUpDown,
  Shield,
  Database,
  Clock,
  Shuffle,
  Github,
  Share2,
  Users,
  Zap,
  BookOpen
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("drives");

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
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Open Source</Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Contribute</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mb-6 border border-muted">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="font-medium">StudioFlow Connect: The Foundation of the VR Mixing Project</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          StudioFlow Connect is our free, open-source foundation that solves the most critical challenge in audio production: 
          seamless cross-platform storage access. Experience the power of our universal drive technology and join our community 
          of developers building the future of audio production.
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button size="sm" variant="default">
            <Share2 className="h-4 w-4 mr-2" />
            Support the VR Mixing Project
          </Button>
          <Button size="sm" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Join Community
          </Button>
          <Button size="sm" variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Documentation
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="drives" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="drives">Drive Manager</TabsTrigger>
          <TabsTrigger value="features">Core Features</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="premium">Premium Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drives" className="animate-in slide-in-from-left-1">
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
                    <LinkIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Core Features</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-blue-500" />
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
        </TabsContent>
        
        <TabsContent value="features" className="animate-in slide-in-from-right-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Cross-Platform Compatibility</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Work seamlessly across macOS, Windows, and Linux without file system barriers.
                  Access the same projects on any system without conversion or compatibility issues.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Automatic Version Control</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Never lose work with our real-time versioning system that automatically saves
                  incremental changes to your projects without manual intervention.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Accelerated I/O</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Experience faster file operations with our GPU-accelerated I/O system,
                  optimized specifically for audio production workflows.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Legacy Plugin Support</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use older plugins across modern systems with our universal plugin bridge,
                  maintaining compatibility with your favorite tools.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Collaborative Workflow</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share projects with team members regardless of their operating system,
                  ensuring smooth collaboration without technical barriers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Drive Conversion</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert existing drives to our Universal format while preserving all data,
                  enabling cross-platform access to your entire library.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="animate-in slide-in-from-right-1">
          <div className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg border border-muted">
              <h3 className="text-xl font-semibold mb-4">Join the StudioFlow Connect Community</h3>
              <p className="mb-4">
                StudioFlow Connect is an open-source project driving innovation in audio production.
                Join our growing community of developers, audio engineers, and music producers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-background/70">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Github className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium mb-1">GitHub</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Contribute code, report issues, and help build the future
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      View Repository
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-background/70">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Users className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium mb-1">Forum</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Discuss ideas, share workflows, and get community support
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Join Discussion
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-background/70">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Share2 className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium mb-1">Support</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Back the VR Mixing Project and StudioFlow Connect development
                    </p>
                    <Button size="sm" variant="default" className="w-full">
                      Support the Project
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Open Source Roadmap</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h4 className="font-medium">Universal Drive Format</h4>
                    <Badge className="ml-auto">Released</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Cross-platform file system access with unified format
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <h4 className="font-medium">Auto-Versioning System</h4>
                    <Badge className="ml-auto">Released</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Automatic version control for audio projects
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <h4 className="font-medium">Collaborative Editing</h4>
                    <Badge variant="outline" className="ml-auto">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Real-time multi-user project editing across platforms
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h4 className="font-medium">Cloud Integration</h4>
                    <Badge variant="outline" className="ml-auto">Planned</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Seamless connection with cloud storage providers
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h4 className="font-medium">VR Integration</h4>
                    <Badge variant="outline" className="ml-auto">Planned</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Foundation for the VR Mixing environment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="premium" className="animate-in slide-in-from-right-1">
          <div className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg border border-muted">
              <h3 className="text-xl font-semibold mb-2">Upgrade to Unlock Premium Features</h3>
              <p className="text-muted-foreground mb-4">
                StudioFlow Connect is just the beginning. Discover our complete suite of audio production tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200">
                  <CardHeader className="pb-2">
                    <h4 className="font-semibold">Free</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">Open Source</Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-3xl font-bold mb-4">$0</p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Universal Drive Format
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Basic Auto-Versioning
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Legacy Plugin Bridge
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Audio Analyzer (Basic)
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">Current Plan</Button>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardHeader className="pb-2">
                    <h4 className="font-semibold">Standard</h4>
                    <Badge variant="secondary">Most Popular</Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Everything in Free
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        System Monitor
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        AI Tools (Basic)
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        DAW Workflow
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Marketplace Access
                      </li>
                    </ul>
                    <Button variant="default" className="w-full">Upgrade</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-900/5 to-purple-900/10 border-purple-200">
                  <CardHeader className="pb-2">
                    <h4 className="font-semibold">Pro</h4>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Advanced</Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-3xl font-bold mb-4">$24.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Everything in Standard
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        VM Controller
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Advanced AI Composition
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Advanced Audio Analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Cloud Collaboration
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Upgrade</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-900/5 to-red-900/10 border-red-200">
                  <CardHeader className="pb-2">
                    <h4 className="font-semibold">Enterprise</h4>
                    <Badge className="bg-gradient-to-r from-purple-500 to-red-500 text-white">Premium</Badge>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-3xl font-bold mb-4">$89.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Everything in Pro
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        VR Mixing Environment
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Multi-User Studio
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Enterprise Support
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Custom Integrations
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-red-500">Contact Sales</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Feature Comparison</h3>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Feature</th>
                        <th className="text-center py-2 px-4 font-medium">Free</th>
                        <th className="text-center py-2 px-4 font-medium">Standard</th>
                        <th className="text-center py-2 px-4 font-medium">Pro</th>
                        <th className="text-center py-2 px-4 font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">Universal Drive Format</td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Auto-Versioning</td>
                        <td className="text-center py-2 px-4">Basic</td>
                        <td className="text-center py-2 px-4">Advanced</td>
                        <td className="text-center py-2 px-4">Advanced</td>
                        <td className="text-center py-2 px-4">Enterprise</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">System Monitoring</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">VM Support</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-4"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">AI Tools</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4">Basic</td>
                        <td className="text-center py-2 px-4">Advanced</td>
                        <td className="text-center py-2 px-4">Premium</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">VR Support</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4">-</td>
                        <td className="text-center py-2 px-4">Limited</td>
                        <td className="text-center py-2 px-4">Full</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default StudioFlowConnect;
