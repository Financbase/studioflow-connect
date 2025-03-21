
import React from "react";

interface PalettePreviewSectionProps {
  // No complex props needed for this component
}

const PalettePreviewSection: React.FC<PalettePreviewSectionProps> = () => {
  return (
    <div className="p-4 border rounded-lg bg-background text-foreground">
      <div className="space-y-4">
        <h4 className="font-medium">Color Palette Preview</h4>
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 bg-primary text-primary-foreground rounded">Primary</div>
          <div className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded">Secondary</div>
          <div className="px-3 py-1.5 bg-accent text-accent-foreground rounded">Accent</div>
          <div className="px-3 py-1.5 bg-muted text-muted-foreground rounded">Muted</div>
          <div className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded">Destructive</div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="p-3 bg-card text-card-foreground border-b">
            Card Header
          </div>
          <div className="p-3 bg-card text-muted-foreground">
            Card content with <span className="text-card-foreground">normal</span> and muted text
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90">
            Button
          </button>
          <button className="px-3 py-1.5 rounded bg-secondary text-secondary-foreground hover:opacity-90">
            Button
          </button>
          <button className="px-3 py-1.5 rounded border hover:bg-muted">
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default PalettePreviewSection;
