
import React from 'react';
import { ExampleUsageProps } from './types';

export const PrimaryExample: React.FC<ExampleUsageProps> = ({ colorValue, colors }) => (
  <div className="mt-2 p-2 border rounded-md">
    <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
    <div 
      className="px-3 py-1.5 rounded text-center text-xs"
      style={{ 
        backgroundColor: colorValue,
        color: colors["primary-foreground"] || "#FFFFFF"
      }}
    >
      Primary Button
    </div>
  </div>
);

export const SecondaryExample: React.FC<ExampleUsageProps> = ({ colorValue, colors }) => (
  <div className="mt-2 p-2 border rounded-md">
    <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
    <div 
      className="px-3 py-1.5 rounded text-center text-xs"
      style={{ 
        backgroundColor: colorValue,
        color: colors["secondary-foreground"] || "#000000"
      }}
    >
      Secondary Button
    </div>
  </div>
);

export const CardExample: React.FC<ExampleUsageProps> = ({ colorValue, colors }) => (
  <div className="mt-2 p-2 border rounded-md">
    <div className="text-xs text-muted-foreground mb-1">Example usage:</div>
    <div 
      className="p-2 rounded text-xs"
      style={{ 
        backgroundColor: colorValue,
        color: colors["card-foreground"] || "#000000"
      }}
    >
      <div className="font-medium">Card Title</div>
      <div 
        className="text-xs"
        style={{ 
          color: colors["muted-foreground"] || "#666666" 
        }}
      >
        Card content text
      </div>
    </div>
  </div>
);

// Component to determine which example to show based on color key
export const ExampleUsage: React.FC<ExampleUsageProps> = ({ colorKey, colorValue, colors }) => {
  switch (colorKey) {
    case "primary":
      return <PrimaryExample colorKey={colorKey} colorValue={colorValue} colors={colors} />;
    case "secondary":
      return <SecondaryExample colorKey={colorKey} colorValue={colorValue} colors={colors} />;
    case "card":
      return <CardExample colorKey={colorKey} colorValue={colorValue} colors={colors} />;
    default:
      return null;
  }
};
