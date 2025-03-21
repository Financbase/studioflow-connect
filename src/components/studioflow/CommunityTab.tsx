
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Users, Share2 } from "lucide-react";

const CommunityTab: React.FC = () => {
  return (
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
  );
};

export default CommunityTab;
