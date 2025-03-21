
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Link as LinkIcon,
  Shield,
  ArrowUpDown,
  Check,
  Layers,
  Plug
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface CoreFeaturesProps {
  universalBridgeEnabled: boolean;
  versioningEnabled: boolean;
  hardwareAccelerationEnabled: boolean;
  toggleFeature: (feature: string) => void;
}

const CoreFeatures: React.FC<CoreFeaturesProps> = ({ 
  universalBridgeEnabled, 
  versioningEnabled, 
  hardwareAccelerationEnabled, 
  toggleFeature 
}) => {
  return (
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
  );
};

export default CoreFeatures;
