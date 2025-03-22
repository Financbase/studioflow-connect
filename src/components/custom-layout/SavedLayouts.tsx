
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layers } from "lucide-react";
import { SavedLayout } from "./types";
import { Card } from "./Card";

interface SavedLayoutsProps {
  savedLayouts: SavedLayout[];
  onSelectSavedLayout: (layout: SavedLayout) => void;
  onDeleteLayout: (layoutId: string) => void;
}

const SavedLayouts = ({ 
  savedLayouts, 
  onSelectSavedLayout, 
  onDeleteLayout 
}: SavedLayoutsProps) => {
  if (savedLayouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No saved layouts yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Create and save layouts to switch between different configurations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {savedLayouts.map(layout => (
        <Card key={layout.id} className="p-4 flex justify-between items-center hover:bg-accent/50 transition-colors cursor-pointer rounded-md border">
          <div className="flex-1" onClick={() => onSelectSavedLayout(layout)}>
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
              onClick={() => onSelectSavedLayout(layout)}
            >
              Load
            </Button>
            {!layout.isDefault && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteLayout(layout.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SavedLayouts;
