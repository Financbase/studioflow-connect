
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useDashboard, WidgetId } from '@/contexts/dashboard';
import { WidgetList } from './WidgetList';
import { LayoutNameInput } from './LayoutNameInput';
import { useCustomLayout } from '@/contexts/dashboard/hooks/useCustomLayout';
import { DialogActions } from './DialogActions';
import { Layout } from './types';
import { Panel } from '@/components/ui/panel';

/**
 * Component for creating and editing custom dashboard layouts
 */
export const CustomLayoutEditor = () => {
  const { hasFeatureAccess, pricingTier } = useDashboard();
  const { saveLayout, updateLayout, layouts, selectedLayout } = useCustomLayout();
  
  const [name, setName] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetId[]>([]);
  const [editMode, setEditMode] = useState(false);
  
  // Initialize component state when selected layout changes
  useEffect(() => {
    if (selectedLayout) {
      setName(selectedLayout.name);
      setSelectedWidgets(selectedLayout.widgets);
      setEditMode(true);
    } else {
      setName('');
      setSelectedWidgets([]);
      setEditMode(false);
    }
  }, [selectedLayout]);
  
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
    
    // Create a new layout or update existing one
    const newLayout: Layout = {
      id: editMode && selectedLayout ? selectedLayout.id : Date.now().toString(),
      name: name.trim(),
      widgets: selectedWidgets,
      createdAt: editMode && selectedLayout ? selectedLayout.createdAt : new Date(),
      updatedAt: new Date()
    };
    
    if (editMode && selectedLayout) {
      updateLayout(newLayout);
      toast.default({
        title: "Layout Updated",
        description: `Your "${name}" layout has been updated.`
      });
    } else {
      saveLayout(newLayout);
      toast.default({
        title: "Layout Saved",
        description: `Your "${name}" layout has been saved.`
      });
    }
    
    // Reset form after save
    setName('');
    setSelectedWidgets([]);
    setEditMode(false);
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
  const canEditLayouts = pricingTier === 'pro';
  
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
          name={name} 
          setName={setName} 
          placeholder="My Custom Layout"
        />
          
        <div className="space-y-2">
          <Label>Select Widgets</Label>
          <Panel className="p-4">
            <WidgetList 
              selectedWidgets={selectedWidgets} 
              onToggle={handleWidgetToggle}
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
          isEditing={editMode}
        />
      </CardFooter>
    </Card>
  );
};
