
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "screen";
  centered?: boolean;
  removePadding?: boolean;
  fluid?: boolean;
  /**
   * Sets the container to take the full height of its parent
   */
  fullHeight?: boolean;
  /**
   * Applies a background color to the container
   */
  withBackground?: boolean;
  /**
   * Makes the container focusable and adds keyboard navigation support
   */
  focusable?: boolean;
}

const maxWidthMap = {
  sm: "max-w-screen-sm", // 640px
  md: "max-w-screen-md", // 768px
  lg: "max-w-screen-lg", // 1024px
  xl: "max-w-screen-xl", // 1280px
  "2xl": "max-w-screen-2xl", // 1536px
  full: "max-w-full",
  screen: "max-w-none"
};

/**
 * A responsive container component that adapts to different screen sizes.
 * It provides consistent padding and maximum width constraints while
 * supporting various layout options and accessibility features.
 * 
 * @example
 * <ResponsiveContainer maxWidth="lg" centered>
 *   <p>Content with large max width and centered</p>
 * </ResponsiveContainer>
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
    fullHeight = false,
    withBackground = false,
    focusable = false,
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
          fullHeight && "h-full",
          withBackground && "bg-background/50",
          className
        ),
        tabIndex: focusable ? 0 : undefined,
        role: focusable ? "region" : undefined,
        ...(focusable && { "aria-label": props["aria-label"] || "Content section" }),
        ...props
      },
      children
    );
  }
);

ResponsiveContainer.displayName = "ResponsiveContainer";
