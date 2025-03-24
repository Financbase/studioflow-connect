
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { useDashboard } from '@/contexts/dashboard';
import { WidgetId, SavedLayout } from '@/contexts/dashboard/types';
import { Settings2 } from 'lucide-react';
import CustomLayoutTabs from './CustomLayoutTabs';

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const DialogActions: React.FC<DialogActionsProps> = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-2 mt-4">
    <Button variant="outline" onClick={onCancel}>Cancel</Button>
    <Button onClick={onSave}>Save Layout</Button>
  </div>
);

/**
 * Component for creating and editing custom dashboard layouts
 */
const CustomLayoutEditor = () => {
  const { hasFeatureAccess, pricingTier, widgets, customLayout, savedLayouts } = useDashboard();
  const { updateCustomLayout, isUpdating } = useDashboard();
  const { saveLayout, deleteLayout, applyLayout } = useDashboard();
  
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
      toast({
        title: "Invalid Layout",
        description: "Please select at least one widget for your layout",
        variant: "destructive"
      });
      return;
    }
    
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please provide a name for your layout",
        variant: "destructive"
      });
      return;
    }
    
    // Save layout to database and local state
    if (saveLayout) {
      saveLayout(name, selectedWidgets);
    }
    
    // Update the custom layout
    if (updateCustomLayout) {
      updateCustomLayout(selectedWidgets);
    }
    
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
  
  // Fixed: Changed the parameter type to match the expected SavedLayout
  const handleSelectLayout = (layout: SavedLayout) => {
    if (applyLayout) {
      applyLayout(layout.id);
      setIsOpen(false);
    }
  };
  
  const handleDeleteLayout = (layoutId: string) => {
    if (deleteLayout) {
      deleteLayout(layoutId);
    }
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
          widgets={Object.values(WidgetId) as WidgetId[]}
          selectedWidgets={selectedWidgets}
          featureAccess={{
            analytics: hasFeatureAccess(WidgetId.analytics),
            audio_player: hasFeatureAccess(WidgetId.audio_player),
            calendar: hasFeatureAccess(WidgetId.calendar),
            file_browser: hasFeatureAccess(WidgetId.file_browser),
            marketplace: hasFeatureAccess(WidgetId.marketplace),
            performance: hasFeatureAccess(WidgetId.performance),
            projects: hasFeatureAccess(WidgetId.projects),
            quick_actions: hasFeatureAccess(WidgetId.quick_actions),
            recent_files: hasFeatureAccess(WidgetId.recent_files),
            settings: hasFeatureAccess(WidgetId.settings),
            system_status: hasFeatureAccess(WidgetId.system_status),
            todo: hasFeatureAccess(WidgetId.todo),
            usage_stats: hasFeatureAccess(WidgetId.usage_stats),
            weather: hasFeatureAccess(WidgetId.weather),
            connect: hasFeatureAccess(WidgetId.connect),
            system: hasFeatureAccess(WidgetId.system),
            audio: hasFeatureAccess(WidgetId.audio),
            ai: hasFeatureAccess(WidgetId.ai),
            vm: hasFeatureAccess(WidgetId.vm),
            daw: hasFeatureAccess(WidgetId.daw)
          }}
          onToggleWidget={handleWidgetToggle}
          savedLayouts={savedLayouts || []}
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
