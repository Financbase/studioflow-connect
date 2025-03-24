
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Share2, 
  GitMerge, 
  Headphones, 
  Compass,
  Upload,
  BarChart4,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DAWConnection {
  id: number;
  name: string;
  status: "connected" | "disconnected";
  syncMethod: string;
  isSharing: boolean;
}

const DAWWorkflow = () => {
  const [connections, setConnections] = useState<DAWConnection[]>([
    {
      id: 1,
      name: "Ableton Live",
      status: "connected",
      syncMethod: "Live Link 3.0",
      isSharing: true
    },
    {
      id: 2,
      name: "Logic Pro",
      status: "connected",
      syncMethod: "OSC 2.0",
      isSharing: true
    },
    {
      id: 3,
      name: "FL Studio",
      status: "disconnected",
      syncMethod: "JACK",
      isSharing: false
    },
  ]);

  const toggleConnection = (id: number) => {
    setConnections(
      connections.map((conn) => {
        if (conn.id === id) {
          const newStatus = conn.status === "connected" ? "disconnected" : "connected";
          const newSharing = newStatus === "connected" ? true : false;
          
          toast({
            title: `${conn.name} ${newStatus === "connected" ? "Connected" : "Disconnected"}`,
            description: `DAW ${newStatus === "connected" ? "successfully connected via" : "disconnected from"} ${conn.syncMethod}`
          });
          
          return {
            ...conn,
            status: newStatus,
            isSharing: newSharing
          };
        }
        return conn;
      })
    );
  };

  const startVRSession = () => {
    toast({
      title: "VR Mixing Session Started",
      description: "Launching immersive environment. Connect your VR headset."
    });
  };

  return (
    <section id="daw-workflow" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Multi-DAW Workflows</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Universal DAW Router</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect and synchronize multiple DAWs with OSC 2.0 and JACK integration.
            </p>
            
            <div className="space-y-3 mb-4">
              {connections.map((conn) => (
                <div 
                  key={conn.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      conn.status === "connected" ? "bg-green-500" : "bg-gray-300"
                    }`} />
                    <div>
                      <div className="font-medium">{conn.name}</div>
                      <div className="text-xs text-muted-foreground">{conn.syncMethod}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {conn.status === "connected" && (
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                        {conn.isSharing ? "Live Share Active" : "Connected"}
                      </span>
                    )}
                    <Button 
                      variant={conn.status === "connected" ? "outline" : "default"} 
                      size="sm"
                      onClick={() => toggleConnection(conn.id)}
                    >
                      {conn.status === "connected" ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Add DAW
              </Button>
              
              <Button variant="default" className="gap-2">
                <Zap className="h-4 w-4" />
                Sync All
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium">Creative Tools</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer" onClick={startVRSession}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="h-5 w-5 text-purple-500" />
                    <h4 className="font-medium text-sm">VR/AR Mixing</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Immersive 3D mixing environments for Oculus Rift and HTC Vive.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <GitMerge className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium text-sm">Visual Scripting</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Drag-and-drop automation for file conversion and audio tagging.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart4 className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium text-sm">Live Share</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Real-time co-editing session with WebRTC and low latency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium text-sm">Power Automate</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Microsoft workflow templates for audio batch processing.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Button className="w-full">
              Launch Creative Studio
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DAWWorkflow;
