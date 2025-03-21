
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Clock, 
  ClipboardList, 
  Lightbulb as LightbulbIcon, 
  EyeOff, 
  Gauge 
} from "lucide-react";
import ZenModeBrainstorm from "../ZenModeBrainstorm";

interface FocusThemeContentProps {
  activeFeature: "none" | "writing" | "audio";
  handleFeatureClick: (feature: "writing" | "audio") => void;
}

const FocusThemeContent: React.FC<FocusThemeContentProps> = ({ 
  activeFeature, 
  handleFeatureClick 
}) => {
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
              <Button 
                variant="outline" 
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <Clock className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
                onClick={() => handleFeatureClick("writing")}
              >
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
      
      {activeFeature === "writing" && (
        <div className="mt-4">
          <ZenModeBrainstorm isVisible={true} themeMode="focus" />
        </div>
      )}
    </div>
  );
};

export default FocusThemeContent;
