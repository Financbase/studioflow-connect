
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MusicIcon, BookOpen, Pencil, FileText, Code } from "lucide-react";

interface ZenModeContentProps {
  themeMode: "minimal" | "ambient" | "focus";
}

const ZenModeContent: React.FC<ZenModeContentProps> = ({ themeMode }) => {
  // Different content layouts based on theme
  if (themeMode === "minimal") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-background/20 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <MusicIcon className="h-10 w-10 mb-4 text-primary/80" />
            <h3 className="text-xl font-medium mb-2">Audio Workspace</h3>
            <p className="text-center text-sm text-white/70">
              Focus on your audio production with minimal distractions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/20 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <BookOpen className="h-10 w-10 mb-4 text-primary/80" />
            <h3 className="text-xl font-medium mb-2">Note Taking</h3>
            <p className="text-center text-sm text-white/70">
              Capture your creative ideas in a distraction-free environment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (themeMode === "ambient") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-sm">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center">
            <h3 className="text-2xl font-light mb-3">Immersive Creative Environment</h3>
            <p className="text-white/70 max-w-md mx-auto">
              Let ambient visuals and sounds enhance your creative flow state.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10">
              <div className="flex flex-col items-center">
                <MusicIcon className="h-8 w-8 mb-3" />
                <span>Audio Creation</span>
              </div>
            </Button>
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 border-x border-white/10">
              <div className="flex flex-col items-center">
                <Pencil className="h-8 w-8 mb-3" />
                <span>Visual Design</span>
              </div>
            </Button>
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10">
              <div className="flex flex-col items-center">
                <FileText className="h-8 w-8 mb-3" />
                <span>Documentation</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Focus theme
  return (
    <div className="space-y-6">
      <Card className="bg-background/10 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Code className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-medium mb-4">Deep Focus Mode</h3>
            <p className="text-center text-white/70 max-w-md">
              Eliminate distractions and optimize your environment for maximum productivity and concentration.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                Start Timer
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                Task List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZenModeContent;
