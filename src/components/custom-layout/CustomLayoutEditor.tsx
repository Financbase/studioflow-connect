
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useDashboard, WidgetId } from '@/contexts/dashboard';
import WidgetList from './WidgetList';
import LayoutNameInput from './LayoutNameInput';
import { useCustomLayout } from '@/contexts/dashboard/hooks/useCustomLayout';
import { useSavedLayouts } from '@/contexts/dashboard/hooks/useSavedLayouts';
import DialogActions from './DialogActions';
import { SavedLayout } from './types';
import { Panel } from '@/components/ui/panel';
import CustomLayoutTabs from './CustomLayoutTabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from 'lucide-react';

/**
 * Component for creating and editing custom dashboard layouts
 */
const CustomLayoutEditor = () => {
  const { hasFeatureAccess, pricingTier, widgets } = useDashboard();
  const { customLayout, updateCustomLayout, isUpdating, isLayoutChanged, hasLayoutChanged } = useCustomLayout();
  const { 
    layouts, 
    saveLayout, 
    deleteLayout, 
    applyLayout, 
    isLoading: isLoadingLayouts 
  } = useSavedLayouts();
  
  const [name, setName] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>([]);
  const [activeTab, setActiveTab] = useState('widgets');
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize component state when selected layout changes
  useEffect(() => {
    if (customLayout) {
      setSelectedWidgets(customLayout);
    } else {
      setSelectedWidgets(widgets);
    }
  }, [customLayout, widgets]);
  
  const handleSaveLayout = () => {
    if (selectedWidgets.length === 0) {
      toast.error({
        title: "Invalid Layout",
        description: "Please select at least one widget for your layout",
      });
      return;
    }
    
    if (!name.trim()) {
      toast.error({
        title: "Name Required",
        description: "Please provide a name for your layout",
      });
      return;
    }
    
    // Save layout to database and local state
    saveLayout(name, selectedWidgets);
    
    // Update the custom layout
    updateCustomLayout(selectedWidgets);
    
    // Reset form after save
    setName('');
    setIsOpen(false);
  };
  
  const handleWidgetToggle = (widgetId: WidgetId) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };
  
  const handleSelectLayout = (layout: SavedLayout) => {
    applyLayout(layout.id);
    setIsOpen(false);
  };
  
  const handleDeleteLayout = (layoutId: string) => {
    deleteLayout(layoutId);
  };
  
  // Check if user has access to this feature
  const canEditLayouts = pricingTier === 'pro' || pricingTier === 'enterprise';
  const canSaveMultipleLayouts = pricingTier === 'pro' || pricingTier === 'enterprise';
  
  if (!canEditLayouts) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Layout Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Custom Dashboard Layout</DialogTitle>
          <DialogDescription>
            Create and manage your personalized dashboard layouts
          </DialogDescription>
        </DialogHeader>
        
        <CustomLayoutTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          layoutName={name}
          onLayoutNameChange={setName}
          canSaveMultipleLayouts={canSaveMultipleLayouts}
          pricingTier={pricingTier}
          widgets={Object.values(WidgetId)}
          selectedWidgets={selectedWidgets}
          featureAccess={{
            // All widget access flags based on pricing tier
            analytics: pricingTier !== "free",
            audio_player: true,
            calendar: true,
            file_browser: true,
            marketplace: true,
            performance: pricingTier === "pro" || pricingTier === "enterprise",
            projects: true,
            quick_actions: true,
            recent_files: true,
            settings: true,
            system_status: pricingTier !== "free",
            todo: true,
            usage_stats: pricingTier !== "free",
            weather: true,
            connect: true,
            system: pricingTier !== "free",
            audio: true,
            ai: pricingTier !== "free",
            vm: pricingTier === "pro" || pricingTier === "enterprise",
            daw: pricingTier !== "free"
          }}
          onToggleWidget={handleWidgetToggle}
          savedLayouts={layouts}
          onSelectSavedLayout={handleSelectLayout}
          onDeleteLayout={handleDeleteLayout}
        />
        
        <DialogActions 
          onCancel={() => {
            setName('');
            setIsOpen(false);
          }}
          onSave={handleSaveLayout}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomLayoutEditor;
