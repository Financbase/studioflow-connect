import React, { useState, useEffect } from 'react';
import { useZenMode, AmbientSoundType } from '@/contexts/ZenModeContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  Maximize,
  Volume2,
  VolumeX,
  BellOff,
  Menu,
} from 'lucide-react';

const ZenModePanel: React.FC = () => {
  const { state, config, actions } = useZenMode();
  const [activeTab, setActiveTab] = useState<string>('timer');
  const [formattedTime, setFormattedTime] = useState<string>('25:00');

  useEffect(() => {
    // Format the current timer value (seconds) to MM:SS
    const minutes = Math.floor(state.currentTimerValue / 60);
    const seconds = state.currentTimerValue % 60;
    setFormattedTime(
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  }, [state.currentTimerValue]);

  const handleSoundChange = (value: string) => {
    actions.setAmbientSound(value as AmbientSoundType);
  };

  return (
    <Card className={`w-full max-w-md mx-auto shadow-lg transition-all duration-300 ${
      state.isActive ? 'bg-opacity-90' : ''
    }`}
    style={{
      backgroundColor: state.isActive ? state.theme.background : '',
      color: state.isActive ? state.theme.text : '',
    }}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Zen Mode</span>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={actions.toggleFullscreen}
              title={state.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="h-8 w-8 p-0"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <Tabs defaultValue="timer" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="timer" className="flex-1">Timer</TabsTrigger>
          <TabsTrigger value="sound" className="flex-1">Sound</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          <TabsContent value="timer" className="mt-0">
            <div className="flex flex-col items-center">
              <div className="text-6xl font-mono font-bold mb-6">{formattedTime}</div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant={state.timerRunning ? "secondary" : "default"}
                  size="sm"
                  onClick={state.timerRunning ? actions.pauseTimer : actions.startTimer}
                  className="w-12 h-12 rounded-full p-0"
                >
                  {state.timerRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={actions.resetTimer}
                  className="w-10 h-10 rounded-full p-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={actions.skipTimer}
                  className="w-10 h-10 rounded-full p-0"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-center">
                <p className="mb-2">
                  {state.timerType === 'focus' ? 'Focus Session' : 
                   state.timerType === 'break' ? 'Short Break' : 'Long Break'}
                </p>
                <p className="opacity-75">
                  Completed Pomodoros: {state.completedPomodoros}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sound" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ambient-sound">Ambient Sound</Label>
                <Select 
                  value={state.ambientSound} 
                  onValueChange={handleSoundChange}
                >
                  <SelectTrigger id="ambient-sound">
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="rain">Rain</SelectItem>
                    <SelectItem value="ocean">Ocean</SelectItem>
                    <SelectItem value="forest">Forest</SelectItem>
                    <SelectItem value="cafe">Café</SelectItem>
                    <SelectItem value="whitenoise">White Noise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume-slider">Volume</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 p-0"
                    onClick={() => actions.setAmbientVolume(state.ambientVolume > 0 ? 0 : 0.5)}
                  >
                    {state.ambientVolume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
                <Slider 
                  id="volume-slider"
                  disabled={state.ambientSound === 'none'}
                  min={0} 
                  max={1} 
                  step={0.01} 
                  value={[state.ambientVolume]}
                  onValueChange={(value) => actions.setAmbientVolume(value[0])}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="hide-notifications">Hide Notifications</Label>
                <Switch 
                  id="hide-notifications" 
                  checked={state.hideNotifications}
                  onCheckedChange={actions.toggleNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="hide-menu">Hide Menu Bar</Label>
                <Switch 
                  id="hide-menu" 
                  checked={state.hideMenuBar}
                  onCheckedChange={actions.toggleMenuBar}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="focus-duration">Focus Duration (minutes)</Label>
                <div className="flex items-center space-x-2">
                  <Slider 
                    id="focus-duration"
                    min={5} 
                    max={60} 
                    step={5} 
                    value={[config.timerSettings.focusDuration]}
                    onValueChange={(value) => actions.updateTimerSettings({ focusDuration: value[0] })}
                  />
                  <span className="w-8 text-right">{config.timerSettings.focusDuration}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                <div className="flex items-center space-x-2">
                  <Slider 
                    id="break-duration"
                    min={1} 
                    max={30} 
                    step={1} 
                    value={[config.timerSettings.breakDuration]}
                    onValueChange={(value) => actions.updateTimerSettings({ breakDuration: value[0] })}
                  />
                  <span className="w-8 text-right">{config.timerSettings.breakDuration}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-breaks">Auto-start Breaks</Label>
                <Switch 
                  id="auto-breaks" 
                  checked={config.timerSettings.autoStartBreaks}
                  onCheckedChange={(checked) => actions.updateTimerSettings({ autoStartBreaks: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-pomodoros">Auto-start Pomodoros</Label>
                <Switch 
                  id="auto-pomodoros" 
                  checked={config.timerSettings.autoStartPomodoros}
                  onCheckedChange={(checked) => actions.updateTimerSettings({ autoStartPomodoros: checked })}
                />
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={actions.toggleZenMode}
        >
          {state.isActive ? "Exit Zen Mode" : "Enter Zen Mode"}
        </Button>
        
        <p className="text-xs opacity-70">
          StudioFlow Zen Mode
        </p>
      </CardFooter>
    </Card>
  );
};

export default ZenModePanel; 