
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HardDrive, RefreshCw, Download, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Drive {
  id: number;
  name: string;
  format: string;
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

const DriveManager: React.FC<DriveManagerProps> = ({ 
  drives, 
  setDrives, 
  versioningEnabled 
}) => {
  const [syncingAll, setSyncingAll] = useState(false);

  const syncAllDrives = () => {
    setSyncingAll(true);
    toast({
      title: "Synchronizing All Drives",
      description: "Starting cloud synchronization for all connected drives."
    });
    
    // Simulate sync process
    setTimeout(() => {
      setDrives(drives.map(drive => ({
        ...drive,
        syncStatus: "synced"
      })));
      setSyncingAll(false);
      
      toast({
        title: "Synchronization Complete",
        description: "All drives have been synchronized successfully."
      });
    }, 3000);
  };

  const formatDrive = (id: number) => {
    if (window.confirm("Are you sure you want to format this drive? All data will be lost.")) {
      toast({
        title: "Formatting Drive",
        description: "Drive format operation has been initiated."
      });
      
      // In a real app, we would actually format the drive
      
      // Update the drive state
      setDrives(drives.map(drive => 
        drive.id === id ? {
          ...drive,
          used: 0,
          syncStatus: "synced"
        } : drive
      ));
    }
  };

  const getOSIcon = (os: string) => {
    switch(os) {
      case 'macos':
        return '🍎';
      case 'windows':
        return '🪟';
      case 'linux':
        return '🐧';
      case 'all':
        return '🌐';
      default:
        return '💻';
    }
  };

  return (
    <div className="col-span-3">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Drive Manager</h3>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1 text-xs"
                onClick={syncAllDrives}
                disabled={syncingAll}
              >
                {syncingAll ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Sync All
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1 text-xs"
              >
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
            </div>
          </div>
          <CardDescription>
            Connected drives and network storage devices
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {drives.map((drive) => (
              <div key={drive.id} className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getOSIcon(drive.os)}</span>
                    <div>
                      <h4 className="font-medium">{drive.name}</h4>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{drive.format}</span>
                        <span>•</span>
                        <span>{drive.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={drive.syncStatus === "synced" ? "outline" : "default"}>
                      {drive.syncStatus === "syncing" && (
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      )}
                      {drive.syncStatus.charAt(0).toUpperCase() + drive.syncStatus.slice(1)}
                    </Badge>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => formatDrive(drive.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Used space</span>
                    <span className="text-muted-foreground">{drive.used}%</span>
                  </div>
                  <Progress value={drive.used} className="h-1.5" />
                </div>
                
                {versioningEnabled && (
                  <div className="mt-3 pt-3 border-t text-xs flex justify-between text-muted-foreground">
                    <span>Auto-versioning</span>
                    <span>Active • {Math.floor(Math.random() * 10) + 1} versions</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriveManager;
