
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Plus, PlayCircle, StopCircle, RefreshCw, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VM {
  id: number;
  name: string;
  status: "running" | "stopped" | "paused";
  cpu: number;
  memory: number;
  uptime: string;
}

const VMController = () => {
  const [vms, setVms] = useState<VM[]>([
    {
      id: 1,
      name: "Audio Processing VM",
      status: "running",
      cpu: 45,
      memory: 60,
      uptime: "3h 15m",
    },
    {
      id: 2,
      name: "Deep Learning VM",
      status: "stopped",
      cpu: 0,
      memory: 0,
      uptime: "-",
    },
  ]);

  const handleCreateVM = () => {
    const newVM: VM = {
      id: vms.length + 1,
      name: `VM-${vms.length + 1}`,
      status: "stopped",
      cpu: 0,
      memory: 0,
      uptime: "-",
    };
    setVms([...vms, newVM]);
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
      <h2 className="text-2xl font-semibold mb-4">Virtual Machine Controller</h2>
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
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div>Status: <span className="font-medium capitalize">{vm.status}</span></div>
                    <div>Uptime: <span className="font-medium">{vm.uptime}</span></div>
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
          
          <Button onClick={handleCreateVM}>
            <Plus className="h-4 w-4 mr-2" />
            Create New VM
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default VMController;
