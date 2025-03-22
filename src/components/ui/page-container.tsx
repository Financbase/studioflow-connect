
import React from 'react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer } from '@/components/ui/responsive-container';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "screen";
  fullHeight?: boolean;
  withSpacing?: boolean;
  withBackground?: boolean;
  withAnimation?: boolean;
  breadcrumbs?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarWidth?: number | string;
  sidebarPosition?: 'left' | 'right';
}

/**
 * A high-level page container that composes multiple UI elements
 * for consistent page layouts throughout the application.
 */
export const PageContainer = ({
  children,
  className,
  maxWidth = "xl",
  fullHeight = false,
  withSpacing = true,
  withBackground = false,
  withAnimation = true,
  breadcrumbs,
  header,
  footer,
  sidebar,
  sidebarWidth = 280,
  sidebarPosition = 'left',
  ...props
}: PageContainerProps) => {
  const withSidebar = Boolean(sidebar);
  const sidebarWidthValue = typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth;
  
  return (
    <div 
      className={cn(
        "w-full",
        fullHeight && "min-h-screen flex flex-col",
        withAnimation && "animate-fade-in",
        className
      )}
      {...props}
    >
      {header && (
        <div className="w-full">
          {header}
        </div>
      )}
      
      {breadcrumbs && (
        <div className="w-full bg-muted/30 py-2 border-b">
          <ResponsiveContainer maxWidth={maxWidth}>
            {breadcrumbs}
          </ResponsiveContainer>
        </div>
      )}
      
      <div className={cn(
        "flex-1 w-full", 
        withBackground && "bg-background",
        withSpacing && "py-6"
      )}>
        {withSidebar ? (
          <ResponsiveContainer 
            maxWidth={maxWidth} 
            className="flex flex-col md:flex-row gap-6"
          >
            {sidebarPosition === 'left' && (
              <div className="w-full md:w-auto md:flex-shrink-0" style={{ flexBasis: sidebarWidthValue }}>
                {sidebar}
              </div>
            )}
            
            <div className="flex-1">
              {children}
            </div>
            
            {sidebarPosition === 'right' && (
              <div className="w-full md:w-auto md:flex-shrink-0" style={{ flexBasis: sidebarWidthValue }}>
                {sidebar}
              </div>
            )}
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer maxWidth={maxWidth}>
            {children}
          </ResponsiveContainer>
        )}
      </div>
      
      {footer && (
        <div className="w-full mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
};
