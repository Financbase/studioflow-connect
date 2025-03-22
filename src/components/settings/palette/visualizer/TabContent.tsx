
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ColorCard from './ColorCard';
import { evaluateWCAGCompliance, getContrastRatio } from "@/lib/colorUtils/colorContrast";

interface TabContentProps {
  tabValue: string;
  activeTab: string;
  colors: Record<string, string>;
  colorGroups: Record<string, string[]>;
}

export const TabContent: React.FC<TabContentProps> = ({ 
  tabValue, 
  activeTab, 
  colors, 
  colorGroups 
}) => {
  // Calculate contrast with the background for each color
  const getColorContrast = (color: string) => {
    const background = colors.background || "#FFFFFF";
    const ratio = getContrastRatio(color, background);
    const compliance = evaluateWCAGCompliance(color, background);
    
    return {
      ratio,
      compliance,
      isAccessible: compliance.AA
    };
  };

  // Filter colors based on the active tab
  const getFilteredColors = () => {
    if (activeTab === "all") {
      return Object.entries(colors);
    }
    
    const group = colorGroups[activeTab as keyof typeof colorGroups] || [];
    return Object.entries(colors).filter(([key]) => group.includes(key));
  };

  return (
    <TabsContent value={tabValue} className="mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getFilteredColors().map(([key, color]) => {
          const contrast = getColorContrast(color);
          
          return (
            <ColorCard 
              key={key} 
              colorKey={key} 
              colorValue={color} 
              contrast={contrast}
              backgroundColors={colors}
            />
          );
        })}
      </div>
    </TabsContent>
  );
};
