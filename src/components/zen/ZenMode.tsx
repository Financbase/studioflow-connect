
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoonStar, Sun, Volume2, Timer, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

interface ZenModeProps {
  isActive: boolean;
  onToggle: () => void;
}

const ZenMode: React.FC<ZenModeProps> = ({ isActive, onToggle }) => {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  // Ambient sound options
  const ambientOptions = [
    { id: "nature", name: "Nature", icon: <Sparkles className="h-4 w-4" /> },
    { id: "studio", name: "Studio", icon: <Volume2 className="h-4 w-4" /> },
    { id: "minimal", name: "Minimal", icon: <MoonStar className="h-4 w-4" /> },
  ];
  
  // Reset timer when deactivating Zen Mode
  useEffect(() => {
    if (!isActive && activeTimer) {
      clearInterval(activeTimer);
      setActiveTimer(null);
      setTimeRemaining(null);
    }
  }, [isActive, activeTimer]);
  
  const startTimer = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
    }
    
    const totalSeconds = timerMinutes * 60;
    setTimeRemaining(totalSeconds);
    
    const timer = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setActiveTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setActiveTimer(timer);
  };
  
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "00:00";
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Sun className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Zen Mode</h1>
          <p className="text-muted-foreground">Focus on what matters most</p>
        </div>
        
        <Card className="border-0 bg-transparent">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <div className="text-6xl font-mono font-bold">{formatTime(timeRemaining)}</div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Duration</label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[timerMinutes]}
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={(value) => setTimerMinutes(value[0])}
                    disabled={!!activeTimer}
                  />
                  <span className="text-sm font-medium w-12">{timerMinutes}m</span>
                </div>
              </div>
              
              <Tabs defaultValue="nature">
                <TabsList className="grid grid-cols-3 w-full">
                  {ambientOptions.map(option => (
                    <TabsTrigger key={option.id} value={option.id} className="flex items-center gap-1">
                      {option.icon}
                      <span className="hidden sm:inline">{option.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="nature" className="mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ambient Volume</label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[ambientVolume]}
                        min={0}
                        max={100}
                        onValueChange={(value) => setAmbientVolume(value[0])}
                      />
                      <span className="text-sm font-medium w-12">{ambientVolume}%</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="studio" className="mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Studio Ambience</label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[ambientVolume]}
                        min={0}
                        max={100}
                        onValueChange={(value) => setAmbientVolume(value[0])}
                      />
                      <span className="text-sm font-medium w-12">{ambientVolume}%</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="minimal" className="mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimal Tone</label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[ambientVolume]}
                        min={0}
                        max={100}
                        onValueChange={(value) => setAmbientVolume(value[0])}
                      />
                      <span className="text-sm font-medium w-12">{ambientVolume}%</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center gap-2">
                <Button 
                  className="w-full" 
                  onClick={startTimer}
                  disabled={!!activeTimer}
                >
                  <Timer className="h-4 w-4 mr-2" />
                  Start Focus Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ZenMode;
