
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "screen";
  centered?: boolean;
  removePadding?: boolean;
  fluid?: boolean;
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
  screen: "max-w-none"
};

/**
 * A responsive container component that adapts to different screen sizes.
 * It provides consistent padding and maximum width constraints.
 */
export const ResponsiveContainer = React.forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  ({ 
    children, 
    className, 
    as: Component = "div", 
    maxWidth = "xl", 
    centered = true, 
    removePadding = false,
    fluid = false,
    ...props 
  }, ref) => {
    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          "w-full",
          !removePadding && "px-4 sm:px-6 lg:px-8",
          !fluid && maxWidthMap[maxWidth],
          centered && "mx-auto",
          className
        ),
        ...props
      },
      children
    );
  }
);

ResponsiveContainer.displayName = "ResponsiveContainer";
