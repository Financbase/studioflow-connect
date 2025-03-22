
import React from 'react';
import { cn } from '@/lib/utils';
import useResponsiveLayout from '@/hooks/use-responsive-layout';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Makes the container take full height of its parent */
  fullHeight?: boolean;
  /** Makes the container take full width of its parent */
  fullWidth?: boolean;
  /** Adds max-width constraint based on screen size */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Applies consistent padding */
  padded?: boolean | 'sm' | 'md' | 'lg';
  /** Centers the content horizontally */
  centered?: boolean;
  /** Adds a vertical scroll area */
  scrollable?: boolean;
  /** For main content areas, ensures proper landmarks for accessibility */
  isMain?: boolean;
  /** Aria label for the container */
  ariaLabel?: string;
}

/**
 * A responsive container component with accessibility features
 * that adjusts to different screen sizes and provides consistent layout
 */
export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ 
    children, 
    className, 
    fullHeight = false, 
    fullWidth = false,
    maxWidth = 'lg',
    padded = true,
    centered = false,
    scrollable = false,
    isMain = false,
    ariaLabel,
    ...props 
  }, ref) => {
    const { getContainerClass } = useResponsiveLayout();
    
    // Process padding size
    const getPaddingClass = () => {
      if (padded === false) return '';
      if (padded === 'sm') return 'px-2 py-2 md:px-3 md:py-3';
      if (padded === 'md') return 'px-3 py-4 md:px-4 md:py-5';
      if (padded === 'lg') return 'px-4 py-6 md:px-6 md:py-8';
      return 'px-3 py-4 md:px-4 md:py-5'; // Default (true)
    };
    
    // Process max width
    const getMaxWidthClass = () => {
      if (maxWidth === 'none' || fullWidth) return '';
      return `max-w-${maxWidth}`;
    };
    
    // Compile classes
    const containerClasses = cn(
      getContainerClass(),
      getMaxWidthClass(),
      getPaddingClass(),
      {
        'h-full': fullHeight,
        'w-full': fullWidth,
        'mx-auto': centered,
        'overflow-y-auto': scrollable,
      },
      className
    );
    
    const Element = isMain ? 'main' : 'div';
    
    return (
      <Element 
        ref={ref}
        className={containerClasses}
        aria-label={ariaLabel}
        role={!isMain && ariaLabel ? 'region' : undefined}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
