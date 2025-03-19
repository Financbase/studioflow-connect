
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export const panelVariants = cva(
  "rounded-lg border bg-card text-card-foreground p-4 overflow-auto max-h-full",
  {
    variants: {
      variant: {
        default: "",
        elevated: "",
      },
      themeStyle: {
        modern: "",
        classic: "border-2 shadow-sm",
        legacy: "shadow-sm",
        windows: "border rounded-md",
      },
      colorMode: {
        light: "",
        dark: "",
      }
    },
    defaultVariants: {
      variant: "default",
      themeStyle: "modern",
      colorMode: "light",
    },
  }
);

export interface PanelProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  variant?: "default" | "elevated";
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { themeVariant, isDarkMode } = useTheme();
    
    return (
      <div
        ref={ref}
        className={cn(
          panelVariants({ 
            variant, 
            themeStyle: themeVariant as any, 
            colorMode: isDarkMode ? "dark" : "light" 
          }),
          
          // Additional theme-specific styles that are too complex for cva
          // Classic theme styles
          !isDarkMode && themeVariant === "classic" && "bg-gradient-to-b from-card/95 to-card",
          isDarkMode && themeVariant === "classic" && "bg-gradient-to-b from-card/80 to-card shadow-md",
          
          // Windows theme styles
          !isDarkMode && themeVariant === "windows" && "border-2 shadow-md bg-card/95",
          isDarkMode && themeVariant === "windows" && "border-[1px] shadow-lg bg-card/90",
          
          // Legacy theme styles
          !isDarkMode && themeVariant === "legacy" && "bg-gradient-to-b from-card to-card/90",
          isDarkMode && themeVariant === "legacy" && "bg-gradient-to-b from-card/90 to-card",
          
          // Modern theme styles
          !isDarkMode && themeVariant === "modern" && "shadow-sm bg-card/95",
          isDarkMode && themeVariant === "modern" && "bg-card/90 backdrop-blur-sm",
          
          // Elevated variant
          variant === "elevated" && themeVariant === "modern" && "shadow-lg",
          variant === "elevated" && themeVariant === "legacy" && "shadow-md",
          variant === "elevated" && themeVariant === "classic" && "shadow-[3px_3px_0] shadow-border",
          variant === "elevated" && themeVariant === "windows" && "shadow-[2px_2px_5px_rgba(0,0,0,0.2)]",
          
          // Hover/focus states
          isDarkMode && "hover:bg-card/100 focus-within:bg-card/100 focus-within:ring-1 focus-within:ring-primary/40",
          !isDarkMode && "hover:bg-card focus-within:bg-card/100 focus-within:ring-1 focus-within:ring-primary/20",
          
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

export { Panel };
