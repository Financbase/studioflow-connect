
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MusicIcon, Pencil, FileText, Coffee, Brain } from "lucide-react";
import ZenModeBrainstorm from "../ZenModeBrainstorm";

interface AmbientThemeContentProps {
  activeFeature: "none" | "writing" | "audio";
  handleFeatureClick: (feature: "writing" | "audio") => void;
}

const AmbientThemeContent: React.FC<AmbientThemeContentProps> = ({ 
  activeFeature, 
  handleFeatureClick 
}) => {
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
          <Button 
            variant="ghost" 
            className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 transition-all duration-300"
            onClick={() => handleFeatureClick("audio")}
          >
            <div className="flex flex-col items-center">
              <MusicIcon className="h-8 w-8 mb-3" />
              <span>Audio Creation</span>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 border-x border-white/10 transition-all duration-300"
            onClick={() => handleFeatureClick("writing")}
          >
            <div className="flex flex-col items-center">
              <Pencil className="h-8 w-8 mb-3" />
              <span>Visual Design</span>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            className="rounded-none p-8 h-auto text-white/80 hover:bg-white/10 transition-all duration-300"
          >
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-3 text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => handleFeatureClick("writing")}
            >
              Start Brainstorming
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {activeFeature === "writing" && (
        <div className="mt-4">
          <ZenModeBrainstorm isVisible={true} themeMode="ambient" />
        </div>
      )}
    </div>
  );
};

export default AmbientThemeContent;
