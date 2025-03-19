
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
          themeVariant === "classic" && "border-2 shadow-sm",
          themeVariant === "windows" && "border rounded-none shadow-md",
          themeVariant === "legacy" && "shadow-sm",
          variant === "elevated" && "shadow-lg",
          !isDarkMode && themeVariant === "modern" && "shadow-sm",
          !isDarkMode && themeVariant === "classic" && "bg-gradient-to-b from-card/95 to-card border-2",
          !isDarkMode && themeVariant === "legacy" && "bg-gradient-to-b from-card to-card/90",
          !isDarkMode && themeVariant === "windows" && "border-2 shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

export { Panel };
