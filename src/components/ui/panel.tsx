
import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { themeVariant } = useTheme();
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground p-4", 
          themeVariant === "classic" && "border-2 shadow-sm",
          themeVariant === "windows" && "border rounded-none shadow-md",
          variant === "elevated" && "shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = "Panel";

export { Panel };
