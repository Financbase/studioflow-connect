
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import DriveManager from "./studioflow/DriveManager";
import CoreFeatures from "./studioflow/CoreFeatures";
import FeaturesTab from "./studioflow/FeaturesTab";
import CommunityTab from "./studioflow/CommunityTab";
import PremiumTab from "./studioflow/PremiumTab";
import StudioFlowHeader from "./studioflow/StudioFlowHeader";

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

  return (
    <section id="studioflow-connect" className="py-6 w-full animate-fade-in">
      <StudioFlowHeader />
      
      <Tabs defaultValue="drives" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="drives">Drive Manager</TabsTrigger>
          <TabsTrigger value="features">Core Features</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="premium">Premium Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drives" className="animate-in slide-in-from-left-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <DriveManager 
              drives={drives} 
              setDrives={setDrives} 
              versioningEnabled={versioningEnabled} 
            />
            
            <CoreFeatures 
              universalBridgeEnabled={universalBridgeEnabled}
              versioningEnabled={versioningEnabled}
              hardwareAccelerationEnabled={hardwareAccelerationEnabled}
              toggleFeature={toggleFeature}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="animate-in slide-in-from-right-1">
          <FeaturesTab />
        </TabsContent>
        
        <TabsContent value="community" className="animate-in slide-in-from-right-1">
          <CommunityTab />
        </TabsContent>
        
        <TabsContent value="premium" className="animate-in slide-in-from-right-1">
          <PremiumTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default StudioFlowConnect;
