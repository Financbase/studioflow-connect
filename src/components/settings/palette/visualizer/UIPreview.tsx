
import React from 'react';
import { UIPreviewProps } from './types';

export const UIPreview: React.FC<UIPreviewProps> = ({ colors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">UI Preview</h3>
      
      <div className="p-4 rounded-lg border"
        style={{ backgroundColor: colors.background || "#FFFFFF" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="p-4 rounded-md"
            style={{ 
              backgroundColor: colors.card || "#FFFFFF",
              color: colors["card-foreground"] || "#000000",
              border: `1px solid ${colors.border || "#E2E8F0"}`
            }}
          >
            <div className="font-medium mb-2">Card Title</div>
            <div 
              className="text-sm"
              style={{ color: colors["muted-foreground"] || "#64748B" }}
            >
              This is a card component with some muted text content.
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                className="px-3 py-1 rounded-md text-xs font-medium"
                style={{ 
                  backgroundColor: colors.primary || "#3B82F6",
                  color: colors["primary-foreground"] || "#FFFFFF"
                }}
              >
                Primary
              </button>
              <button 
                className="px-3 py-1 rounded-md text-xs font-medium"
                style={{ 
                  backgroundColor: colors.secondary || "#E2E8F0",
                  color: colors["secondary-foreground"] || "#1E293B"
                }}
              >
                Secondary
              </button>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-md"
            style={{ 
              backgroundColor: colors.card || "#FFFFFF",
              color: colors["card-foreground"] || "#000000",
              border: `1px solid ${colors.border || "#E2E8F0"}`
            }}
          >
            <div className="font-medium mb-2">Form Example</div>
            <div className="space-y-2">
              <div 
                className="text-xs font-medium"
                style={{ color: colors.foreground || "#000000" }}
              >
                Input Label
              </div>
              <div 
                className="flex h-8 w-full rounded-md px-3 py-1 text-sm"
                style={{ 
                  border: `1px solid ${colors.input || "#E2E8F0"}`,
                  backgroundColor: colors.background || "#FFFFFF"
                }}
              >
                Input text
              </div>
              <div 
                className="flex items-center mt-2"
              >
                <div 
                  className="h-4 w-4 rounded mr-2"
                  style={{ 
                    backgroundColor: colors.muted || "#F1F5F9",
                    border: `1px solid ${colors.border || "#E2E8F0"}`
                  }}
                ></div>
                <span 
                  className="text-xs"
                  style={{ color: colors.foreground || "#000000" }}
                >
                  Checkbox label
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-md"
            style={{ 
              backgroundColor: colors.card || "#FFFFFF",
              color: colors["card-foreground"] || "#000000",
              border: `1px solid ${colors.border || "#E2E8F0"}`
            }}
          >
            <div className="font-medium mb-2">Alert Example</div>
            <div
              className="p-3 rounded-md mb-2 text-xs"
              style={{ 
                backgroundColor: colors.accent || "#F1F5F9",
                color: colors["accent-foreground"] || "#1E293B"
              }}
            >
              This is an accent/info alert
            </div>
            <div
              className="p-3 rounded-md text-xs"
              style={{ 
                backgroundColor: colors.destructive || "#EF4444",
                color: colors["destructive-foreground"] || "#FFFFFF"
              }}
            >
              This is a destructive/error alert
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
