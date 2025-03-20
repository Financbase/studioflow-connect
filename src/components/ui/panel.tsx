
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

// Separate style configurations by theme
const themeStyles = {
  modern: {
    base: "shadow-sm bg-card/95",
    dark: "bg-card/90 backdrop-blur-sm",
    elevated: "shadow-lg",
  },
  classic: {
    base: "border-2 shadow-sm bg-gradient-to-b from-card/95 to-card",
    dark: "bg-gradient-to-b from-card/80 to-card shadow-md",
    elevated: "shadow-[3px_3px_0] shadow-border",
  },
  legacy: {
    base: "shadow-sm bg-gradient-to-b from-card to-card/90",
    dark: "bg-gradient-to-b from-card/90 to-card",
    elevated: "shadow-md",
  },
  windows: {
    base: "border-2 shadow-md bg-card/95",
    dark: "border-[1px] shadow-lg bg-card/90",
    elevated: "shadow-[2px_2px_5px_rgba(0,0,0,0.2)]",
  },
};

export const panelVariants = cva(
  "rounded-lg border bg-card text-card-foreground p-4 overflow-auto max-h-full",
  {
    variants: {
      variant: {
        default: "",
        elevated: "",
      },
    },
    defaultVariants: {
      variant: "default",
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
    const currentTheme = themeVariant as keyof typeof themeStyles || "modern";
    
    // Set base styles based on theme
    const baseStyle = themeStyles[currentTheme]?.base || "";
    const darkStyle = isDarkMode ? themeStyles[currentTheme]?.dark || "" : "";
    const elevatedStyle = variant === "elevated" ? themeStyles[currentTheme]?.elevated || "" : "";
    
    // Common hover/focus states
    const interactiveStyles = [
      isDarkMode && "hover:bg-card/100 focus-within:bg-card/100 focus-within:ring-1 focus-within:ring-primary/40",
      !isDarkMode && "hover:bg-card focus-within:bg-card/100 focus-within:ring-1 focus-within:ring-primary/20",
    ];
    
    return (
      <div
        ref={ref}
        className={cn(
          panelVariants({ variant }),
          baseStyle,
          darkStyle,
          elevatedStyle,
          interactiveStyles,
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

export { Panel };
