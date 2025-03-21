
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  Plus, 
  Laptop, 
  Server, 
  Database,
  Clock,
  Shuffle,
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

interface DriveManagerProps {
  drives: Drive[];
  setDrives: React.Dispatch<React.SetStateAction<Drive[]>>;
  versioningEnabled: boolean;
}

const DriveManager: React.FC<DriveManagerProps> = ({ drives, setDrives, versioningEnabled }) => {
  const connectNewDrive = () => {
    toast({
      title: "Drive Scanner Started",
      description: "Detecting available drives for universal connection...",
      duration: 3000,
    });
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
  );
};

export default DriveManager;
