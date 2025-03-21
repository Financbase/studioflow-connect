
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hexToRgb } from '@/lib/colorUtils/colorConversion';
import { calculateContrastRatio, meetsContrastGuidelines } from '@/lib/colorContrastUtils';

interface ColorItem {
  key: string;
  value: string;
  name: string;
}

interface ColorPaletteVisualizerProps {
  colors: Record<string, string>;
  showContrast?: boolean;
}

const ColorPaletteVisualizer: React.FC<ColorPaletteVisualizerProps> = ({
  colors,
  showContrast = true
}) => {
  // Group colors by category
  const colorGroups = useMemo(() => {
    const groups: Record<string, ColorItem[]> = {
      'Base': [],
      'Primary': [],
      'Secondary': [],
      'Accent': [],
      'Destructive': [],
      'Background': []
    };
    
    Object.entries(colors).forEach(([key, value]) => {
      const formattedKey = key.replace(/-/g, ' ');
      const name = formattedKey
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const colorItem = { key, value, name };
      
      if (key.includes('primary')) {
        groups['Primary'].push(colorItem);
      } else if (key.includes('secondary')) {
        groups['Secondary'].push(colorItem);
      } else if (key.includes('accent')) {
        groups['Accent'].push(colorItem);
      } else if (key.includes('destructive')) {
        groups['Destructive'].push(colorItem);
      } else if (key.includes('background') || key.includes('card') || key === 'muted') {
        groups['Background'].push(colorItem);
      } else {
        groups['Base'].push(colorItem);
      }
    });
    
    // Filter out empty groups
    return Object.fromEntries(
      Object.entries(groups).filter(([_, items]) => items.length > 0)
    );
  }, [colors]);
  
  // Calculate contrast for each color pair if showContrast is true
  const contrastChecks = useMemo(() => {
    if (!showContrast) return {};
    
    const checks: Record<string, {
      ratio: number;
      passesAA: boolean;
      passesAAA: boolean;
    }> = {};
    
    // Check contrast for common combinations
    const backgroundValue = colors['background'] || '#FFFFFF';
    const foregroundValue = colors['foreground'] || '#000000';
    
    // Check background-foreground contrast
    checks['background-foreground'] = {
      ratio: calculateContrastRatio(backgroundValue, foregroundValue),
      passesAA: meetsContrastGuidelines(backgroundValue, foregroundValue, 'AA'),
      passesAAA: meetsContrastGuidelines(backgroundValue, foregroundValue, 'AAA')
    };
    
    // Check primary button contrast
    if (colors['primary'] && colors['primary-foreground']) {
      checks['primary-button'] = {
        ratio: calculateContrastRatio(colors['primary'], colors['primary-foreground']),
        passesAA: meetsContrastGuidelines(colors['primary'], colors['primary-foreground'], 'AA'),
        passesAAA: meetsContrastGuidelines(colors['primary'], colors['primary-foreground'], 'AAA')
      };
    }
    
    // Check secondary button contrast
    if (colors['secondary'] && colors['secondary-foreground']) {
      checks['secondary-button'] = {
        ratio: calculateContrastRatio(colors['secondary'], colors['secondary-foreground']),
        passesAA: meetsContrastGuidelines(colors['secondary'], colors['secondary-foreground'], 'AA'),
        passesAAA: meetsContrastGuidelines(colors['secondary'], colors['secondary-foreground'], 'AAA')
      };
    }
    
    return checks;
  }, [colors, showContrast]);
  
  const formatContrastRatio = (ratio: number) => {
    return ratio.toFixed(2) + ':1';
  };
  
  const getContrastBadgeColor = (passes: boolean) => {
    return passes ? 'bg-green-500 text-white' : 'bg-amber-500 text-white';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Visualization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Groups */}
        <div className="space-y-4">
          {Object.entries(colorGroups).map(([groupName, colorItems]) => (
            <div key={groupName} className="space-y-2">
              <h3 className="text-sm font-medium">{groupName}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {colorItems.map((item) => (
                  <div 
                    key={item.key} 
                    className="flex items-center space-x-3 p-2 border rounded-md"
                    style={{ borderColor: `rgba(${hexToRgb(item.value).r}, ${hexToRgb(item.value).g}, ${hexToRgb(item.value).b}, 0.3)` }}
                  >
                    <div 
                      className="w-8 h-8 rounded-md border"
                      style={{ 
                        backgroundColor: item.value,
                        borderColor: 'rgba(0,0,0,0.1)'
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Contrast Checks */}
        {showContrast && Object.keys(contrastChecks).length > 0 && (
          <div className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-medium">Contrast Checks</h3>
            <div className="space-y-2">
              {Object.entries(contrastChecks).map(([key, check]) => (
                <div key={key} className="flex flex-wrap items-center justify-between p-2 border rounded-md">
                  <p className="text-sm font-medium">{key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono">{formatContrastRatio(check.ratio)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getContrastBadgeColor(check.passesAA)}`}>
                      AA {check.passesAA ? '✓' : '✗'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getContrastBadgeColor(check.passesAAA)}`}>
                      AAA {check.passesAAA ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Color Harmonies Preview */}
        <div className="space-y-2 border-t pt-4">
          <h3 className="text-sm font-medium">UI Preview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-md"
              style={{ backgroundColor: colors['background'] || '#FFFFFF' }}
            >
              <h4 
                className="font-medium mb-2"
                style={{ color: colors['foreground'] || '#000000' }}
              >
                Sample Text
              </h4>
              <p 
                className="text-sm mb-2"
                style={{ color: colors['foreground'] || '#000000' }}
              >
                This is a preview of text on the background color.
              </p>
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 rounded-md text-sm"
                  style={{ 
                    backgroundColor: colors['primary'] || '#000000',
                    color: colors['primary-foreground'] || '#FFFFFF'
                  }}
                >
                  Primary
                </button>
                <button 
                  className="px-3 py-1 rounded-md text-sm"
                  style={{ 
                    backgroundColor: colors['secondary'] || '#EEEEEE',
                    color: colors['secondary-foreground'] || '#000000'
                  }}
                >
                  Secondary
                </button>
                <button 
                  className="px-3 py-1 rounded-md text-sm"
                  style={{ 
                    backgroundColor: colors['destructive'] || '#FF0000',
                    color: colors['destructive-foreground'] || '#FFFFFF'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div 
              className="p-4 rounded-md"
              style={{ backgroundColor: colors['card'] || '#F8F8F8' }}
            >
              <h4 
                className="font-medium mb-2"
                style={{ color: colors['card-foreground'] || '#000000' }}
              >
                Card Header
              </h4>
              <p 
                className="text-sm mb-2"
                style={{ color: colors['muted-foreground'] || '#666666' }}
              >
                This is muted text in a card.
              </p>
              <div 
                className="p-2 rounded-md mb-2"
                style={{ backgroundColor: colors['muted'] || '#F0F0F0' }}
              >
                <p 
                  className="text-xs"
                  style={{ color: colors['muted-foreground'] || '#666666' }}
                >
                  This is a muted section.
                </p>
              </div>
              <div 
                className="p-2 rounded-md"
                style={{ 
                  backgroundColor: colors['accent'] || '#F0F0FF',
                  color: colors['accent-foreground'] || '#0000DD'
                }}
              >
                <p className="text-xs">This is an accent section.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPaletteVisualizer;
