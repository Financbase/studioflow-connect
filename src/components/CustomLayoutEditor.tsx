
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2, Save, Layout, Layers, BookmarkPlus, FileOutput } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useDashboard, WidgetId } from "@/contexts/DashboardContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useResponsive } from "@/hooks/use-mobile";

// Import the missing icons from lucide-react
import { Cpu, AudioLines, FileAudio } from "lucide-react";

type SavedLayout = {
  id: string;
  name: string;
  widgets: WidgetId[];
  isDefault?: boolean;
  createdAt: string;
};

const CustomLayoutEditor = () => {
  const { customLayout, updateCustomLayout, featureAccess, pricingTier } = useDashboard();
  const { t } = useLanguage();
  const { themeVariant } = useTheme();
  const { isMobile } = useResponsive();
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>(customLayout);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("widgets");
  const [layoutName, setLayoutName] = useState("My Custom Layout");
  
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([
    {
      id: "default",
      name: "Default Layout",
      widgets: ["connect", "audio", "system"],
      isDefault: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "minimal",
      name: "Minimal Studio",
      widgets: ["connect", "audio"],
      createdAt: new Date().toISOString()
    }
  ]);
  
  const getWidgetLabel = (widgetId: WidgetId): string => {
    const widgetLabelMap: Record<WidgetId, string> = {
      'system': 'System Monitor',
      'vm': 'VM Controller',
      'daw': 'DAW Workflow',
      'audio': 'Audio Analyzer',
      'ai': 'AI Tools',
      'marketplace': 'Marketplace',
      'connect': 'StudioFlow Connect'
    };
    
    return widgetLabelMap[widgetId];
  };
  
  const getWidgetDescription = (widgetId: WidgetId): string => {
    const widgetDescMap: Record<WidgetId, string> = {
      'system': 'Monitor CPU, RAM and disk metrics',
      'vm': 'Create and manage virtual machines',
      'daw': 'Connect with digital audio workstations',
      'audio': 'Analyze audio files and recordings',
      'ai': 'AI-assisted music production',
      'marketplace': 'Browse and purchase plugins and samples',
      'connect': 'Cross-platform storage access'
    };
    
    return widgetDescMap[widgetId];
  };
  
  const getWidgetIcon = (widgetId: WidgetId): React.ReactNode => {
    switch (widgetId) {
      case 'system':
        return <Cpu className="h-4 w-4 mr-2" />;
      case 'audio':
        return <AudioLines className="h-4 w-4 mr-2" />;
      case 'ai':
        return <FileAudio className="h-4 w-4 mr-2" />;
      case 'vm':
        return <Layout className="h-4 w-4 mr-2" />;
      case 'daw':
        return <Layers className="h-4 w-4 mr-2" />;
      case 'marketplace':
        return <FileOutput className="h-4 w-4 mr-2" />;
      case 'connect':
        return <BookmarkPlus className="h-4 w-4 mr-2" />;
      default:
        return <Settings2 className="h-4 w-4 mr-2" />;
    }
  };
  
  const handleToggleWidget = (widgetId: WidgetId) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  const handleSaveLayout = () => {
    if (selectedWidgets.length === 0) {
      toast.destructive({
        title: "Invalid Layout",
        description: "Please select at least one widget for your layout",
      });
      return;
    }
    
    updateCustomLayout(selectedWidgets);
    
    if (pricingTier === 'pro' || pricingTier === 'enterprise') {
      const layoutExists = savedLayouts.some(layout => layout.name === layoutName);
      
      if (layoutExists) {
        setSavedLayouts(savedLayouts.map(layout => 
          layout.name === layoutName 
            ? { ...layout, widgets: selectedWidgets } 
            : layout
        ));
        
        toast.default({
          title: "Layout Updated",
          description: `The layout "${layoutName}" has been updated`
        });
      } else {
        const newLayout: SavedLayout = {
          id: `layout-${Date.now()}`,
          name: layoutName,
          widgets: selectedWidgets,
          createdAt: new Date().toISOString()
        };
        
        setSavedLayouts([...savedLayouts, newLayout]);
        
        toast.default({
          title: "Layout Saved",
          description: `New layout "${layoutName}" has been saved`
        });
      }
    } else {
      toast.default({
        title: "Layout Updated",
        description: "Your dashboard layout has been updated"
      });
    }
    
    setIsOpen(false);
  };
  
  const handleSelectSavedLayout = (layout: SavedLayout) => {
    setSelectedWidgets(layout.widgets);
    setLayoutName(layout.name);
    setActiveTab("widgets");
  };
  
  const handleDeleteLayout = (layoutId: string) => {
    setSavedLayouts(savedLayouts.filter(layout => layout.id !== layoutId));
    
    toast.default({
      title: "Layout Deleted",
      description: "The layout has been removed from your saved layouts"
    });
  };
  
  const canSaveMultipleLayouts = pricingTier === 'pro' || pricingTier === 'enterprise';
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={isMobile ? "icon" : "sm"} className={isMobile ? "w-9 h-9 p-0" : "gap-2"}>
          <Settings2 className="h-4 w-4" />
          {!isMobile && "Customize"}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-[625px]"} ${themeVariant === "windows" ? "rounded-none" : ""}`}>
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Configure your studio dashboard to suit your workflow
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="widgets" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="widgets">Widget Selection</TabsTrigger>
            <TabsTrigger 
              value="layouts" 
              disabled={!canSaveMultipleLayouts}
              className="relative"
            >
              Saved Layouts
              {!canSaveMultipleLayouts && (
                <Badge variant="outline" className="absolute -top-1 -right-1 text-[10px] px-1 py-0">
                  Pro
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="widgets" className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="layout-name">Layout Name</Label>
                {canSaveMultipleLayouts && (
                  <Badge variant="outline" className="ml-2">
                    {pricingTier === 'pro' ? 'Pro' : 'Enterprise'}
                  </Badge>
                )}
              </div>
              <Input 
                id="layout-name" 
                value={layoutName} 
                onChange={(e) => setLayoutName(e.target.value)}
                placeholder="Enter a name for this layout"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {canSaveMultipleLayouts 
                  ? "Pro users can save multiple custom layouts for different workflows" 
                  : "Upgrade to Pro to save multiple custom layouts"}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              {(Object.keys(featureAccess) as WidgetId[]).map((widgetId) => {
                const hasAccess = featureAccess[widgetId];
                
                return (
                  <div key={widgetId} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label htmlFor={`widget-${widgetId}`} className="flex items-center gap-2 text-foreground font-medium">
                          {getWidgetIcon(widgetId)}
                          {getWidgetLabel(widgetId)}
                          {!hasAccess && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                              {pricingTier === 'free' ? 'Premium' : 'Pro'}
                            </span>
                          )}
                        </Label>
                        <p className="text-xs text-muted-foreground pl-6">{getWidgetDescription(widgetId)}</p>
                      </div>
                      <Switch
                        id={`widget-${widgetId}`}
                        checked={selectedWidgets.includes(widgetId)}
                        onCheckedChange={() => handleToggleWidget(widgetId)}
                        disabled={!hasAccess}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="layouts" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Your Saved Layouts</h3>
                <Badge variant="secondary">Pro Feature</Badge>
              </div>
              
              {savedLayouts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No saved layouts yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create and save layouts to switch between different configurations
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedLayouts.map(layout => (
                    <Card key={layout.id} className="p-4 flex justify-between items-center hover:bg-accent/50 transition-colors cursor-pointer rounded-md border">
                      <div className="flex-1" onClick={() => handleSelectSavedLayout(layout)}>
                        <h4 className="font-medium flex items-center">
                          <Layers className="h-4 w-4 mr-2" />
                          {layout.name}
                          {layout.isDefault && (
                            <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {layout.widgets.length} widgets • Created {new Date(layout.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSelectSavedLayout(layout)}
                        >
                          Load
                        </Button>
                        {!layout.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLayout(layout.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pro Features</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save multiple layout configurations for different workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quick-switch between different studio layouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create task-specific layouts (recording, mixing, mastering)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Receive AI-powered layout recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
          <Button variant="outline" onClick={() => setIsOpen(false)} className={isMobile ? "w-full" : ""}>
            Cancel
          </Button>
          <Button onClick={handleSaveLayout} className={`${isMobile ? "w-full" : ""} gap-2`}>
            <Save className="h-4 w-4" />
            {activeTab === "layouts" && canSaveMultipleLayouts ? "Save New Layout" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Card = ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export default CustomLayoutEditor;
