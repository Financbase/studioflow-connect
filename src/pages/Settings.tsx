
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDashboard } from "@/contexts/DashboardContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomLayoutEditor from "@/components/CustomLayoutEditor";
import { 
  MoonStar, 
  Sun, 
  MonitorSmartphone, 
  Languages, 
  CreditCard, 
  Layout, 
  Volume2, 
  BellRing, 
  FileAudio, 
  HardDrive, 
  Loader2, 
  Clock, 
  LayoutGrid,
  Save,
  Laptop,
  Monitor,
  Smartphone,
  PanelRight,
  LucideProps,
  Headphones,
  Keyboard,
  SquareTerminal
} from "lucide-react";

// Define audio format options
type AudioFormat = "wav" | "aiff" | "mp3" | "flac";

interface AudioSettings {
  defaultFormat: AudioFormat;
  sampleRate: 44100 | 48000 | 96000 | 192000;
  bitDepth: 16 | 24 | 32;
  bufferSize: 128 | 256 | 512 | 1024 | 2048;
  autosave: boolean;
  autosaveInterval: 1 | 5 | 10 | 15 | 30; // minutes
}

interface NotificationSettings {
  showDesktopNotifications: boolean;
  playSound: boolean;
  notifyOnErrors: boolean;
  notifyOnCompletion: boolean;
  notifyOnSystemEvents: boolean;
}

const Settings = () => {
  const { user, profile } = useAuth();
  const { themeVariant, setThemeVariant, theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { viewMode, setViewMode, pricingTier, setPricingTier } = useDashboard();
  
  // Additional state for enhanced settings
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    defaultFormat: "wav",
    sampleRate: 48000,
    bitDepth: 24,
    bufferSize: 512,
    autosave: true,
    autosaveInterval: 5
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    showDesktopNotifications: true,
    playSound: true,
    notifyOnErrors: true,
    notifyOnCompletion: true,
    notifyOnSystemEvents: false
  });
  
  const [interfaceSettings, setInterfaceSettings] = useState({
    showTips: true,
    enableAnimations: true,
    highContrastMode: false,
    fontSize: 16,
    showDetailedAnalytics: pricingTier !== "free",
    enableKeyboardShortcuts: true,
    terminalAccess: pricingTier === "pro" || pricingTier === "enterprise",
    developerMode: pricingTier === "enterprise",
    responsiveMode: "auto" as "auto" | "desktop" | "tablet" | "mobile",
    sidebarPosition: "right" as "left" | "right",
  });
  
  const [storageSettings, setStorageSettings] = useState({
    defaultStoragePath: user?.email ? `/home/${user.email.split('@')[0]}/audio` : "/home/user/audio",
    enableCloudSync: pricingTier !== "free",
    enableAutoBackup: true,
    backupFrequency: 24, // hours
    compressBackups: true,
  });

  // Type-safe language selection handler
  const handleLanguageChange = (lang: string) => {
    if (lang === "en" || lang === "es" || lang === "fr" || lang === "de" || lang === "sv") {
      setLanguage(lang);
      toast({
        title: "Language Changed",
        description: `The interface language has been updated to ${lang.toUpperCase()}.`,
      });
    }
  };
  
  // Audio settings handlers
  const handleAudioSettingChange = <K extends keyof AudioSettings>(key: K, value: AudioSettings[K]) => {
    setAudioSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Audio Setting Updated",
      description: `The ${key} setting has been updated.`,
    });
  };
  
  // Notification settings handlers
  const handleNotificationSettingChange = <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };
  
  // Interface settings handlers
  const handleInterfaceSettingChange = <K extends keyof typeof interfaceSettings>(key: K, value: typeof interfaceSettings[K]) => {
    setInterfaceSettings(prev => ({ ...prev, [key]: value }));
  };
  
  // Storage settings handlers
  const handleStorageSettingChange = <K extends keyof typeof storageSettings>(key: K, value: typeof storageSettings[K]) => {
    setStorageSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const saveAllSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All your settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Customize StudioFlow to match your production workflow
              </p>
            </div>
            <Button onClick={saveAllSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save All Settings
            </Button>
          </div>

          <Tabs defaultValue="appearance">
            <TabsList className="mb-6 w-full flex-wrap justify-start h-auto">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/10 gap-2">
                <MonitorSmartphone className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="data-[state=active]:bg-primary/10 gap-2">
                <Languages className="h-4 w-4" />
                <span>Language</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-primary/10 gap-2">
                <FileAudio className="h-4 w-4" />
                <span>Audio</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 gap-2">
                <BellRing className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-primary/10 gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Subscription</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-primary/10 gap-2">
                <Layout className="h-4 w-4" />
                <span>Layout</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="data-[state=active]:bg-primary/10 gap-2">
                <HardDrive className="h-4 w-4" />
                <span>Storage</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode" className="flex items-center gap-2">
                        <MoonStar className="h-4 w-4" />
                        Dark Mode
                      </Label>
                      <Switch 
                        id="dark-mode" 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for a more comfortable viewing experience in low light.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MonitorSmartphone className="h-4 w-4" />
                      Theme Variant
                    </Label>
                    <Select 
                      value={themeVariant} 
                      onValueChange={(value: "modern" | "legacy" | "classic" | "windows" | "default" | "retro") => setThemeVariant(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="retro">Retro</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose a theme variant to customize the look and feel of the application.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <LayoutGrid className="h-4 w-4" />
                        Interface Options
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-tips" className="text-sm">Show Tips</Label>
                            <Switch 
                              id="show-tips" 
                              checked={interfaceSettings.showTips}
                              onCheckedChange={(checked) => handleInterfaceSettingChange("showTips", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Display helpful tips throughout the application
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="enable-animations" className="text-sm">Enable Animations</Label>
                            <Switch 
                              id="enable-animations" 
                              checked={interfaceSettings.enableAnimations}
                              onCheckedChange={(checked) => handleInterfaceSettingChange("enableAnimations", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Enable smooth transitions between elements
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="high-contrast" className="text-sm">High Contrast Mode</Label>
                            <Switch 
                              id="high-contrast" 
                              checked={interfaceSettings.highContrastMode}
                              onCheckedChange={(checked) => handleInterfaceSettingChange("highContrastMode", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Increase contrast for better visibility
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="keyboard-shortcuts" className="text-sm">Keyboard Shortcuts</Label>
                            <Switch 
                              id="keyboard-shortcuts" 
                              checked={interfaceSettings.enableKeyboardShortcuts}
                              onCheckedChange={(checked) => handleInterfaceSettingChange("enableKeyboardShortcuts", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Enable keyboard shortcuts for faster navigation
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-size" className="flex items-center gap-2">
                        Font Size: {interfaceSettings.fontSize}px
                      </Label>
                      <Slider 
                        id="font-size"
                        defaultValue={[interfaceSettings.fontSize]}
                        min={12}
                        max={24}
                        step={1}
                        onValueChange={(value) => handleInterfaceSettingChange("fontSize", value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <MonitorSmartphone className="h-4 w-4" />
                      Device Mode
                    </Label>
                    <RadioGroup 
                      value={interfaceSettings.responsiveMode}
                      onValueChange={(value: "auto" | "desktop" | "tablet" | "mobile") => handleInterfaceSettingChange("responsiveMode", value)}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      <div>
                        <RadioGroupItem 
                          value="auto" 
                          id="auto" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="auto"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <MonitorSmartphone className="mb-3 h-6 w-6" />
                          Auto
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="desktop" 
                          id="desktop" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="desktop"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Monitor className="mb-3 h-6 w-6" />
                          Desktop
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="tablet" 
                          id="tablet" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="tablet"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Laptop className="mb-3 h-6 w-6" />
                          Tablet
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="mobile" 
                          id="mobile" 
                          className="peer sr-only" 
                        />
                        <Label
                          htmlFor="mobile"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Smartphone className="mb-3 h-6 w-6" />
                          Mobile
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">
                      Choose how the application should adapt to different screen sizes.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <PanelRight className="h-4 w-4" />
                          Sidebar Position
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Choose the position of the sidebar in desktop mode
                        </p>
                      </div>
                      <Select 
                        value={interfaceSettings.sidebarPosition} 
                        onValueChange={(value: "left" | "right") => handleInterfaceSettingChange("sidebarPosition", value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="terminal-access" className="flex items-center gap-2">
                          <SquareTerminal className="h-4 w-4" />
                          Terminal Access
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Enable command-line interface for advanced operations
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {(pricingTier !== "pro" && pricingTier !== "enterprise") && (
                          <Badge variant="outline">Pro</Badge>
                        )}
                        <Switch 
                          id="terminal-access" 
                          checked={interfaceSettings.terminalAccess}
                          disabled={pricingTier !== "pro" && pricingTier !== "enterprise"}
                          onCheckedChange={(checked) => handleInterfaceSettingChange("terminalAccess", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Change the language used throughout the application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Interface Language
                    </Label>
                    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="sv">Svenska</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      This will change the language for all text in the application.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Date & Time Format</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date Format</Label>
                          <Select defaultValue="MM/DD/YYYY">
                            <SelectTrigger>
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Time Format</Label>
                          <Select defaultValue="12h">
                            <SelectTrigger>
                              <SelectValue placeholder="Select time format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                              <SelectItem value="24h">24-hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audio Settings</CardTitle>
                  <CardDescription>
                    Configure audio processing and playback settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <FileAudio className="h-4 w-4" />
                        Default Audio Format
                      </Label>
                      <Select 
                        value={audioSettings.defaultFormat} 
                        onValueChange={(value: AudioFormat) => handleAudioSettingChange("defaultFormat", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select audio format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wav">WAV</SelectItem>
                          <SelectItem value="aiff">AIFF</SelectItem>
                          <SelectItem value="flac">FLAC</SelectItem>
                          <SelectItem value="mp3">MP3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Default Sample Rate
                      </Label>
                      <Select 
                        value={audioSettings.sampleRate.toString()} 
                        onValueChange={(value) => handleAudioSettingChange("sampleRate", parseInt(value) as 44100 | 48000 | 96000 | 192000)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sample rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="44100">44.1 kHz</SelectItem>
                          <SelectItem value="48000">48 kHz</SelectItem>
                          <SelectItem value="96000">96 kHz</SelectItem>
                          <SelectItem value="192000">192 kHz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Bit Depth</Label>
                      <Select 
                        value={audioSettings.bitDepth.toString()} 
                        onValueChange={(value) => handleAudioSettingChange("bitDepth", parseInt(value) as 16 | 24 | 32)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bit depth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16">16-bit</SelectItem>
                          <SelectItem value="24">24-bit</SelectItem>
                          <SelectItem value="32">32-bit float</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Buffer Size</Label>
                      <Select 
                        value={audioSettings.bufferSize.toString()} 
                        onValueChange={(value) => handleAudioSettingChange("bufferSize", parseInt(value) as 128 | 256 | 512 | 1024 | 2048)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select buffer size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128">128 samples</SelectItem>
                          <SelectItem value="256">256 samples</SelectItem>
                          <SelectItem value="512">512 samples</SelectItem>
                          <SelectItem value="1024">1024 samples</SelectItem>
                          <SelectItem value="2048">2048 samples</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autosave" className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Autosave Audio Projects
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Automatically save audio projects at regular intervals
                        </p>
                      </div>
                      <Switch 
                        id="autosave" 
                        checked={audioSettings.autosave}
                        onCheckedChange={(checked) => handleAudioSettingChange("autosave", checked)}
                      />
                    </div>
                    
                    {audioSettings.autosave && (
                      <div className="space-y-2 pl-6">
                        <Label>Autosave Interval</Label>
                        <Select 
                          value={audioSettings.autosaveInterval.toString()} 
                          onValueChange={(value) => handleAudioSettingChange("autosaveInterval", parseInt(value) as 1 | 5 | 10 | 15 | 30)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Every minute</SelectItem>
                            <SelectItem value="5">Every 5 minutes</SelectItem>
                            <SelectItem value="10">Every 10 minutes</SelectItem>
                            <SelectItem value="15">Every 15 minutes</SelectItem>
                            <SelectItem value="30">Every 30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Playback Settings
                    </Label>
                    <div className="pl-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="playback-volume">Volume: 100%</Label>
                        <Slider 
                          id="playback-volume"
                          defaultValue={[100]}
                          min={0}
                          max={100}
                          step={1}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="normalize-volume" className="text-sm">Auto-normalize volume</Label>
                        <Switch id="normalize-volume" defaultChecked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="loudness-protection" className="text-sm">Loudness protection</Label>
                        <Switch id="loudness-protection" defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when notifications are displayed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="desktop-notifications" className="flex items-center gap-2">
                          <BellRing className="h-4 w-4" />
                          Desktop Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Show notifications on your desktop
                        </p>
                      </div>
                      <Switch 
                        id="desktop-notifications" 
                        checked={notificationSettings.showDesktopNotifications}
                        onCheckedChange={(checked) => handleNotificationSettingChange("showDesktopNotifications", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sound-notifications" className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Sound Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Play sounds for important events
                        </p>
                      </div>
                      <Switch 
                        id="sound-notifications" 
                        checked={notificationSettings.playSound}
                        onCheckedChange={(checked) => handleNotificationSettingChange("playSound", checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label className="font-medium">Notification Events</Label>
                    <div className="space-y-3 pl-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-errors" className="text-sm">Processing errors</Label>
                        <Switch 
                          id="notify-errors" 
                          checked={notificationSettings.notifyOnErrors}
                          onCheckedChange={(checked) => handleNotificationSettingChange("notifyOnErrors", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-completion" className="text-sm">Task completion</Label>
                        <Switch 
                          id="notify-completion" 
                          checked={notificationSettings.notifyOnCompletion}
                          onCheckedChange={(checked) => handleNotificationSettingChange("notifyOnCompletion", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-system" className="text-sm">System events</Label>
                        <Switch 
                          id="notify-system" 
                          checked={notificationSettings.notifyOnSystemEvents}
                          onCheckedChange={(checked) => handleNotificationSettingChange("notifyOnSystemEvents", checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label className="font-medium">Quiet Hours</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quiet-start">Start Time</Label>
                        <Select defaultValue="22:00">
                          <SelectTrigger>
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                            <SelectItem value="21:00">9:00 PM</SelectItem>
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quiet-end">End Time</Label>
                        <Select defaultValue="07:00">
                          <SelectTrigger>
                            <SelectValue placeholder="Select end time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="06:00">6:00 AM</SelectItem>
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-quiet-hours" className="text-sm">Enable Quiet Hours</Label>
                      <Switch id="enable-quiet-hours" defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mute notifications during quiet hours to avoid disturbances
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Management</CardTitle>
                  <CardDescription>
                    View and manage your subscription plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-lg">Current Plan</h3>
                          <p className="text-sm text-muted-foreground">Your current subscription plan</p>
                        </div>
                        {pricingTier === "free" ? (
                          <Badge variant="outline">Free</Badge>
                        ) : pricingTier === "standard" ? (
                          <Badge variant="secondary">Standard</Badge>
                        ) : pricingTier === "pro" ? (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">Pro</Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-purple-500 to-red-500">Enterprise</Badge>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Plan:</span>
                          <span className="text-sm font-medium capitalize">{pricingTier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Billing Cycle:</span>
                          <span className="text-sm font-medium">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Next Payment:</span>
                          <span className="text-sm font-medium">June 15, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Payment Method:</span>
                          <span className="text-sm font-medium">Visa •••• 4242</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SubscriptionCard 
                        title="Free"
                        price="$0"
                        description="Basic audio analysis and limited storage access"
                        features={[
                          "Basic audio analysis",
                          "Limited storage access",
                          "Standard audio formats support",
                          "1 GB storage"
                        ]}
                        current={pricingTier === "free"}
                      />
                      
                      <SubscriptionCard 
                        title="Standard"
                        price="$9.99"
                        description="Enhanced features for hobbyists and small studios"
                        features={[
                          "Advanced audio analysis",
                          "Cross-platform storage",
                          "AI-assisted tools",
                          "10 GB storage",
                          "Email support"
                        ]}
                        current={pricingTier === "standard"}
                      />
                      
                      <SubscriptionCard 
                        title="Pro"
                        price="$19.99"
                        description="Professional features for serious producers"
                        features={[
                          "All Standard features",
                          "VM controller",
                          "Custom layout profiles",
                          "Advanced DAW integration",
                          "Unlimited storage",
                          "Priority support"
                        ]}
                        recommended
                        current={pricingTier === "pro"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Layout</CardTitle>
                  <CardDescription>
                    Customize your dashboard view and layout settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>View Mode</Label>
                    <Select 
                      value={viewMode} 
                      onValueChange={(value: "simple" | "advanced" | "custom" | "mobile") => setViewMode(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select view mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose how you want your dashboard to be displayed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Layout Configuration</Label>
                    <CustomLayoutEditor />
                    
                    <div className="mt-4 bg-muted p-4 rounded-md">
                      <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4" />
                        Layout Management
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Pro users can save multiple custom layouts for different workflows.
                      </p>
                      
                      {pricingTier === "pro" || pricingTier === "enterprise" ? (
                        <Button variant="outline" className="w-full">
                          Manage Saved Layouts
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">
                            Upgrade to Pro to unlock multiple layout profiles:
                          </p>
                          <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                            <li>Save task-specific layouts (recording, mixing, mastering)</li>
                            <li>Switch layouts with a single click</li>
                            <li>Share layouts with other Pro users</li>
                            <li>Get AI-powered layout recommendations</li>
                          </ul>
                          <Button className="w-full mt-2" variant="default">
                            Upgrade to Pro
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Settings</CardTitle>
                  <CardDescription>
                    Configure storage and backup preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="default-path" className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        Default Storage Path
                      </Label>
                      <div className="flex mt-2 gap-2">
                        <Input 
                          id="default-path" 
                          value={storageSettings.defaultStoragePath}
                          onChange={(e) => handleStorageSettingChange("defaultStoragePath", e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline">Browse</Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Default location for storing audio files and projects
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cloud-sync" className="flex items-center gap-2">
                          <CloudIcon className="h-4 w-4" />
                          Cloud Synchronization
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sync your files across devices
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {pricingTier === "free" && (
                          <Badge variant="outline">Premium</Badge>
                        )}
                        <Switch 
                          id="cloud-sync" 
                          checked={storageSettings.enableCloudSync}
                          disabled={pricingTier === "free"}
                          onCheckedChange={(checked) => handleStorageSettingChange("enableCloudSync", checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-backup" className="flex items-center gap-2">
                          <BackupIcon className="h-4 w-4" />
                          Automatic Backups
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Regularly backup your projects and files
                        </p>
                      </div>
                      <Switch 
                        id="auto-backup" 
                        checked={storageSettings.enableAutoBackup}
                        onCheckedChange={(checked) => handleStorageSettingChange("enableAutoBackup", checked)}
                      />
                    </div>
                    
                    {storageSettings.enableAutoBackup && (
                      <div className="space-y-4 pl-6">
                        <div className="space-y-2">
                          <Label>Backup Frequency</Label>
                          <Select 
                            value={storageSettings.backupFrequency.toString()} 
                            onValueChange={(value) => handleStorageSettingChange("backupFrequency", parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">Every 6 hours</SelectItem>
                              <SelectItem value="12">Every 12 hours</SelectItem>
                              <SelectItem value="24">Every 24 hours</SelectItem>
                              <SelectItem value="48">Every 48 hours</SelectItem>
                              <SelectItem value="168">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="compress-backups" className="text-sm">Compress backups</Label>
                          <Switch 
                            id="compress-backups" 
                            checked={storageSettings.compressBackups}
                            onCheckedChange={(checked) => handleStorageSettingChange("compressBackups", checked)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Storage Usage</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-sm">Projects</Label>
                          <span className="text-sm">2.4 GB</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: "24%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-sm">Audio Files</Label>
                          <span className="text-sm">5.8 GB</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: "58%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-sm">Documents</Label>
                          <span className="text-sm">0.6 GB</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: "6%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-sm">Other</Label>
                          <span className="text-sm">1.2 GB</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full">
                          <div className="h-2 bg-orange-500 rounded-full" style={{ width: "12%" }} />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Total Used</p>
                          <p className="text-sm text-muted-foreground">10 GB quota</p>
                        </div>
                        <p className="font-medium">10 / 10 GB</p>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Manage Storage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={saveAllSettings} size="lg" className="gap-2">
              <Save className="h-4 w-4" />
              Save All Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper components
const SubscriptionCard = ({ 
  title, 
  price, 
  description, 
  features, 
  recommended = false,
  current = false
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  recommended?: boolean;
  current?: boolean;
}) => {
  return (
    <Card className={`relative ${recommended ? "border-primary" : ""}`}>
      {recommended && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-max">
          <Badge className="bg-primary">Recommended</Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{price}</span>
          <span className="text-xs text-muted-foreground">per month</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckIcon className="h-4 w-4 text-green-500 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {current ? (
          <Button variant="outline" className="w-full" disabled>
            Current Plan
          </Button>
        ) : (
          <Button 
            variant={recommended ? "default" : "outline"} 
            className={`w-full ${recommended ? "bg-primary" : ""}`}
          >
            {title === "Free" ? "Current Plan" : `Upgrade to ${title}`}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Icons
const CheckIcon = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const CloudIcon = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const BackupIcon = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default Settings;
