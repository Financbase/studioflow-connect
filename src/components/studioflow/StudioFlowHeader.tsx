
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Share2, Users, Zap, BookOpen } from "lucide-react";

const StudioFlowHeader: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default StudioFlowHeader;
