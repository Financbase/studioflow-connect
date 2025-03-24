
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
import DialogActions from './DialogActions';
import { SavedLayout } from './types';
import { Panel } from '@/components/ui/panel';

/**
 * Component for creating and editing custom dashboard layouts
 */
const CustomLayoutEditor = () => {
  const { hasFeatureAccess, pricingTier } = useDashboard();
  const { customLayout, updateCustomLayout, isUpdating, isLayoutChanged, hasLayoutChanged } = useCustomLayout();
  
  const [name, setName] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>([]);
  const [editMode, setEditMode] = useState(false);
  
  // Initialize component state when selected layout changes
  useEffect(() => {
    if (customLayout) {
      setSelectedWidgets(customLayout);
    } else {
      setSelectedWidgets([]);
    }
  }, [customLayout]);
  
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
    
    // Update the custom layout
    updateCustomLayout(selectedWidgets);
    
    toast.default({
      title: "Layout Updated",
      description: `Your "${name}" layout has been updated.`
    });
    
    // Reset form after save
    setName('');
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
  
  // Check if user has access to this feature
  const canEditLayouts = pricingTier === 'pro' || pricingTier === 'enterprise';
  
  if (!canEditLayouts) {
    return null;
  }
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          {editMode ? 'Edit Layout' : 'Create Custom Layout'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <LayoutNameInput 
          layoutName={name} 
          onLayoutNameChange={setName} 
          canSaveMultipleLayouts={pricingTier === 'pro' || pricingTier === 'enterprise'}
          pricingTier={pricingTier}
        />
          
        <div className="space-y-2">
          <Label>Select Widgets</Label>
          <Panel className="p-4">
            <WidgetList 
              widgets={Object.values(WidgetId)}
              selectedWidgets={selectedWidgets} 
              onToggleWidget={handleWidgetToggle}
              featureAccess={{
                // All widget access flags
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
              pricingTier={pricingTier}
            />
          </Panel>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <DialogActions 
          onCancel={() => {
            setName('');
            setSelectedWidgets([]);
            setEditMode(false);
          }}
          onSave={handleSaveLayout}
        />
      </CardFooter>
    </Card>
  );
};

export default CustomLayoutEditor;
