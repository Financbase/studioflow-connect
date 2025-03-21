
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GitFork } from "lucide-react";

const RoadmapTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Roadmap</CardTitle>
        <CardDescription>Upcoming features and improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-500">In Progress</Badge>
              <h3 className="font-medium">Phase 1: Cross-Platform Storage Foundation</h3>
            </div>
            <div className="ml-6 pl-2 border-l text-sm space-y-2">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">StudioFlow Connect Core</p>
                  <p className="text-muted-foreground">Universal drive access and file system compatibility</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Audio Analysis Tools</p>
                  <p className="text-muted-foreground">Basic waveform and spectral visualization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Coming Soon</Badge>
              <h3 className="font-medium">Phase 2: Collaboration & Cloud Features</h3>
            </div>
            <div className="ml-6 pl-2 border-l text-sm space-y-2">
              <div className="flex items-start gap-2">
                <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Cloud Sync Engine</p>
                  <p className="text-muted-foreground">Seamless project syncing across devices</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Real-time Collaboration</p>
                  <p className="text-muted-foreground">Multi-user session support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Future</Badge>
              <h3 className="font-medium">Phase 3: Extended Reality Integration</h3>
            </div>
            <div className="ml-6 pl-2 border-l text-sm space-y-2">
              <div className="flex items-start gap-2">
                <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">AR/VR Studio Environment</p>
                  <p className="text-muted-foreground">Immersive mixing and production workspace</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Spatial Audio Tools</p>
                  <p className="text-muted-foreground">3D audio positioning and immersive sound design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapTab;
