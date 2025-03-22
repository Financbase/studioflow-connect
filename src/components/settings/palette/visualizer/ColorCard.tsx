
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ColorCardProps } from './types';
import { ExampleUsage } from './ExampleUsage';

const ColorCard: React.FC<ColorCardProps> = ({ colorKey, colorValue, contrast, backgroundColors }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyColor = () => {
    navigator.clipboard.writeText(colorValue);
    setCopied(true);
    
    toast({
      title: "Color Copied",
      description: `${colorValue} has been copied to your clipboard`
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div key={colorKey} className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium text-sm">{colorKey}</div>
        <div className="text-xs text-muted-foreground">
          {contrast.ratio.toFixed(2)}:1
          {contrast.isAccessible ? (
            <span className="text-green-500 ml-1">✓</span>
          ) : (
            <span className="text-red-500 ml-1">✗</span>
          )}
        </div>
      </div>
      
      <div 
        className="h-16 rounded-md flex items-center justify-between p-3"
        style={{ backgroundColor: colorValue }}
      >
        <div 
          className="text-sm font-medium px-2 py-1 rounded"
          style={{ 
            backgroundColor: backgroundColors.background || "#FFFFFF",
            color: backgroundColors.foreground || "#000000"
          }}
        >
          {colorValue}
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopyColor}
          className="h-8 bg-background/60 backdrop-blur-sm hover:bg-background/80"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      
      <ExampleUsage colorKey={colorKey} colorValue={colorValue} colors={backgroundColors} />
    </div>
  );
};

export default ColorCard;
