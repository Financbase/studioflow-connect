
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Plus, 
  PlayCircle, 
  StopCircle, 
  RefreshCw, 
  Settings,
  Disc,
  Layers,
  Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface VM {
  id: number;
  name: string;
  type: "qemu" | "carla" | "standard";
  status: "running" | "stopped" | "paused";
  cpu: number;
  memory: number;
  uptime: string;
  latency?: string;
  plugin?: string;
}

const VMController = () => {
  const [vms, setVms] = useState<VM[]>([
    {
      id: 1,
      name: "Roland JV-1080",
      type: "carla",
      status: "running",
      cpu: 25,
      memory: 40,
      uptime: "3h 15m",
      latency: "0.8ms",
      plugin: "32-bit Legacy"
    },
    {
      id: 2,
      name: "Komplete Kontrol",
      type: "qemu",
      status: "running",
      cpu: 35,
      memory: 55,
      uptime: "1h 45m",
      latency: "0.5ms",
      plugin: "Hardware Emulation"
    },
    {
      id: 3,
      name: "Deep Learning VM",
      type: "standard",
      status: "stopped",
      cpu: 0,
      memory: 0,
      uptime: "-",
    },
  ]);

  const handleCreateVM = (type: "qemu" | "carla" | "standard") => {
    let newVM: VM = {
      id: vms.length + 1,
      name: `VM-${vms.length + 1}`,
      type,
      status: "stopped",
      cpu: 0,
      memory: 0,
      uptime: "-",
    };
    
    if (type === "carla") {
      newVM.plugin = "32-bit Plugin";
      newVM.latency = "0.9ms";
    } else if (type === "qemu") {
      newVM.plugin = "Hardware Emu";
      newVM.latency = "0.7ms";
    }
    
    setVms([...vms, newVM]);
    
    toast({
      title: `New ${type.toUpperCase()} VM Created`,
      description: `${newVM.name} has been added to your virtual machines.`,
      duration: 3000,
    });
  };

  const toggleVMStatus = (id: number) => {
    setVms(
      vms.map((vm) => {
        if (vm.id === id) {
          const newStatus = vm.status === "running" ? "stopped" : "running";
          return {
            ...vm,
            status: newStatus,
            cpu: newStatus === "running" ? Math.floor(Math.random() * 40) + 20 : 0,
            memory: newStatus === "running" ? Math.floor(Math.random() * 40) + 30 : 0,
            uptime: newStatus === "running" ? "0m" : "-",
          };
        }
        return vm;
      })
    );
  };

  return (
    <section id="vm-controller" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Legacy System Integration</h2>
      
      <Tabs defaultValue="vms">
        <TabsList className="mb-4">
          <TabsTrigger value="vms">Virtual Machines</TabsTrigger>
          <TabsTrigger value="plugins">Legacy Plugins</TabsTrigger>
          <TabsTrigger value="hardware">Hardware Emulation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vms" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">VM Management</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {vms.map((vm) => (
                  <Card key={vm.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            vm.status === "running" ? "bg-green-500" : "bg-gray-300"
                          }`} />
                          <h4 className="font-medium">{vm.name}</h4>
                          {vm.type !== "standard" && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              vm.type === "qemu" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                            }`}>
                              {vm.type.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">CPU</span>
                            <span>{vm.cpu}%</span>
                          </div>
                          <Progress value={vm.cpu} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Memory</span>
                            <span>{vm.memory}%</span>
                          </div>
                          <Progress value={vm.memory} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground mb-3 gap-2">
                        <div>Status: <span className="font-medium capitalize">{vm.status}</span></div>
                        <div>Uptime: <span className="font-medium">{vm.uptime}</span></div>
                        {vm.latency && (
                          <div>Latency: <span className="font-medium text-green-500">{vm.latency}</span></div>
                        )}
                        {vm.plugin && (
                          <div>Type: <span className="font-medium">{vm.plugin}</span></div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant={vm.status === "running" ? "destructive" : "default"}
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleVMStatus(vm.id)}
                        >
                          {vm.status === "running" ? (
                            <>
                              <StopCircle className="h-4 w-4 mr-1" /> Stop
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-1" /> Start
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Restart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleCreateVM("standard")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Standard VM
                </Button>
                <Button onClick={() => handleCreateVM("carla")} variant="outline">
                  <Layers className="h-4 w-4 mr-2" />
                  Create Carla+ Bridge
                </Button>
                <Button onClick={() => handleCreateVM("qemu")} variant="secondary">
                  <Disc className="h-4 w-4 mr-2" />
                  Create QEMU+ Emulator
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plugins" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">32-bit Plugin Bridge (Carla+)</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Run vintage plugins on modern systems with near-zero latency.</p>
              
              <div className="border rounded-md p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Average Latency: 0.8ms</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Carla+ bridges provide compatibility for Roland, Yamaha, and other vintage 32-bit plugins with
                  modern 64-bit DAWs using advanced sandboxing techniques.
                </p>
              </div>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Legacy Plugin
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hardware" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Disc className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-medium">Hardware Emulation (QEMU+)</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Virtualize synthesizers and hardware with ultra-low latency.</p>
              
              <div className="border rounded-md p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Average Latency: 0.5ms</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  QEMU+ provides hardware virtualization for Native Instruments Maschine controllers,
                  Komplete Kontrol keyboards, and other USB/MIDI hardware.
                </p>
              </div>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Hardware Emulation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VMController;
