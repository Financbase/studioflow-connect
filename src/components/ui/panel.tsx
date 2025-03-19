
import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { themeVariant, isDarkMode } = useTheme();
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground p-4", 
          // Classic theme styles
          themeVariant === "classic" && "border-2 shadow-sm",
          !isDarkMode && themeVariant === "classic" && "bg-gradient-to-b from-card/95 to-card",
          isDarkMode && themeVariant === "classic" && "bg-gradient-to-b from-card/80 to-card shadow-md",
          
          // Windows theme styles
          themeVariant === "windows" && "border rounded-none",
          !isDarkMode && themeVariant === "windows" && "border-2 shadow-md",
          isDarkMode && themeVariant === "windows" && "border-[1px] shadow-lg",
          
          // Legacy theme styles
          themeVariant === "legacy" && "shadow-sm",
          !isDarkMode && themeVariant === "legacy" && "bg-gradient-to-b from-card to-card/90",
          isDarkMode && themeVariant === "legacy" && "bg-gradient-to-b from-card/90 to-card",
          
          // Modern theme styles
          !isDarkMode && themeVariant === "modern" && "shadow-sm",
          isDarkMode && themeVariant === "modern" && "bg-card/90 backdrop-blur-sm",
          
          // Elevated variant
          variant === "elevated" && themeVariant === "modern" && "shadow-lg",
          variant === "elevated" && themeVariant === "legacy" && "shadow-md",
          variant === "elevated" && themeVariant === "classic" && "shadow-[3px_3px_0] shadow-border",
          variant === "elevated" && themeVariant === "windows" && "shadow-[2px_2px_5px_rgba(0,0,0,0.2)]",
          
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

export { Panel };
