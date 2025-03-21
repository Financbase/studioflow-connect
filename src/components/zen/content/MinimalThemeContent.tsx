
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MusicIcon, BookOpen } from "lucide-react";
import ZenModeBrainstorm from "../ZenModeBrainstorm";

interface MinimalThemeContentProps {
  activeFeature: "none" | "writing" | "audio";
  handleFeatureClick: (feature: "writing" | "audio") => void;
}

const MinimalThemeContent: React.FC<MinimalThemeContentProps> = ({ 
  activeFeature, 
  handleFeatureClick 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <Card className="bg-background/20 border-white/10 backdrop-blur-sm hover:bg-background/30 transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          <MusicIcon className="h-10 w-10 mb-4 text-primary/80" />
          <h3 className="text-xl font-medium mb-2">Audio Workspace</h3>
          <p className="text-center text-sm text-white/70">
            Focus on your audio production with minimal distractions.
          </p>
          <Button 
            variant="outline" 
            className="mt-4 border-white/20 bg-white/5 hover:bg-white/10"
            onClick={() => handleFeatureClick("audio")}
          >
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
          <Button 
            variant="outline" 
            className="mt-4 border-white/20 bg-white/5 hover:bg-white/10"
            onClick={() => handleFeatureClick("writing")}
          >
            Start Writing
          </Button>
        </CardContent>
      </Card>
      
      {activeFeature === "writing" && (
        <div className="col-span-1 md:col-span-2 mt-4">
          <ZenModeBrainstorm isVisible={true} themeMode="minimal" />
        </div>
      )}
    </div>
  );
};

export default MinimalThemeContent;
