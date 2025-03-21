import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MusicIcon, 
  BookOpen, 
  Pencil, 
  FileText, 
  Code, 
  Coffee, 
  Brain, 
  Zap, 
  Clock, 
  ClipboardList, 
  Lightbulb as LightbulbIcon, 
  EyeOff, 
  Gauge 
} from "lucide-react";

interface ZenModeContentProps {
  themeMode: "minimal" | "ambient" | "focus";
}

const ZenModeContent: React.FC<ZenModeContentProps> = ({ themeMode }) => {
  // Different content layouts based on theme
  if (themeMode === "minimal") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <Card className="bg-background/20 border-white/10 backdrop-blur-sm hover:bg-background/30 transition-all duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <MusicIcon className="h-10 w-10 mb-4 text-primary/80" />
            <h3 className="text-xl font-medium mb-2">Audio Workspace</h3>
            <p className="text-center text-sm text-white/70">
              Focus on your audio production with minimal distractions.
            </p>
            <Button variant="outline" className="mt-4 border-white/20 bg-white/5 hover:bg-white/10">
              Enter Space
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/20 border-white/10 backdrop-blur-sm hover:bg-background/30 transition-all duration-300">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            <BookOpen className="h-10 w-10 mb-4 text-primary/80" />
            <h3 className="text-xl font-medium mb-2">Note Taking</h3>
            <p className="text-center text-sm text-white/70">
              Capture your creative ideas in a distraction-free environment.
            </p>
            <Button variant="outline" className="mt-4 border-white/20 bg-white/5 hover:bg-white/10">
              Start Writing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (themeMode === "ambient") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-sm theme-transition-bg">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8 text-center ambient-background">
            <h3 className="text-2xl font-light mb-3">Immersive Creative Environment</h3>
            <p className="text-white/70 max-w-md mx-auto">
              Let ambient visuals and sounds enhance your creative flow state.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col items-center">
                <MusicIcon className="h-8 w-8 mb-3" />
                <span>Audio Creation</span>
              </div>
            </Button>
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 border-x border-white/10 transition-all duration-300">
              <div className="flex flex-col items-center">
                <Pencil className="h-8 w-8 mb-3" />
                <span>Visual Design</span>
              </div>
            </Button>
            <Button variant="ghost" className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col items-center">
                <FileText className="h-8 w-8 mb-3" />
                <span>Documentation</span>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-background/10 border-white/10 backdrop-blur-sm hover:bg-background/20 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[150px]">
              <Coffee className="h-8 w-8 mb-3 text-primary/80" />
              <h3 className="text-lg font-medium mb-2">Ambient Sounds</h3>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="sound-equalizer bar w-1 bg-primary/60 rounded-t-full" 
                    style={{ 
                      height: `${20 + Math.random() * 40}%`, 
                      animationDelay: `${i * 0.1}s`,
                      '--bar-index': i 
                    } as React.CSSProperties}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/10 border-white/10 backdrop-blur-sm hover:bg-background/20 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[150px]">
              <Brain className="h-8 w-8 mb-3 text-primary/80" />
              <h3 className="text-lg font-medium mb-2">Thought Space</h3>
              <p className="text-center text-sm text-white/70">
                Clear your mind and focus on the present moment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Focus theme
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-background/10 border-white/10 backdrop-blur-sm focus-border-glow">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pulse-soft">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-medium mb-4">Deep Focus Mode</h3>
            <p className="text-center text-white/70 max-w-md">
              Eliminate distractions and optimize your environment for maximum productivity and concentration.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <Clock className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <ClipboardList className="mr-2 h-4 w-4" />
                Task List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-background/5 border-white/10 backdrop-blur-sm hover:bg-background/10 transition-all duration-300">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <LightbulbIcon className="h-6 w-6 mb-2 text-primary/80" />
            <h4 className="text-sm font-medium">Focus Tips</h4>
            <p className="text-xs text-white/60 mt-1">
              Take short breaks every 25 minutes
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/5 border-white/10 backdrop-blur-sm hover:bg-background/10 transition-all duration-300">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <EyeOff className="h-6 w-6 mb-2 text-primary/80" />
            <h4 className="text-sm font-medium">Distraction Blocking</h4>
            <p className="text-xs text-white/60 mt-1">
              Notifications silenced
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/5 border-white/10 backdrop-blur-sm hover:bg-background/10 transition-all duration-300">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Gauge className="h-6 w-6 mb-2 text-primary/80" />
            <h4 className="text-sm font-medium">Focus Level</h4>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
              <div className="bg-primary h-full rounded-full w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZenModeContent;
