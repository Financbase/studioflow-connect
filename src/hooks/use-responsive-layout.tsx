
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type LayoutMode = 'compact' | 'default' | 'expanded';
type ScreenOrientation = 'portrait' | 'landscape';

interface LayoutConfig {
  sidebarVisible: boolean;
  contentColumns: 1 | 2 | 3 | 4;
  widgetsPerRow: 1 | 2 | 3 | 4;
  compactHeader: boolean;
  compactWidgets: boolean;
  stackedNavigation: boolean;
}

interface ResponsiveLayout {
  breakpoint: Breakpoint;
  mode: LayoutMode;
  orientation: ScreenOrientation;
  config: LayoutConfig;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Breakpoint values in px - matching Tailwind defaults
const breakpointValues = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Hook for handling responsive layout configurations across different device sizes
 * with automatic detection of screen changes and orientation shifts.
 */
export function useResponsiveLayout(): ResponsiveLayout {
  const isMobileDevice = useIsMobile();
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [height, setHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 768);
  
  // Determine current breakpoint based on screen width
  const getBreakpoint = useCallback((width: number): Breakpoint => {
    if (width < breakpointValues.sm) return 'xs';
    if (width < breakpointValues.md) return 'sm';
    if (width < breakpointValues.lg) return 'md';
    if (width < breakpointValues.xl) return 'lg';
    if (width < breakpointValues['2xl']) return 'xl';
    return '2xl';
  }, []);
  
  // Get screen orientation
  const getOrientation = useCallback((width: number, height: number): ScreenOrientation => {
    return width > height ? 'landscape' : 'portrait';
  }, []);
  
  // Derive layout mode from breakpoint
  const getLayoutMode = useCallback((breakpoint: Breakpoint): LayoutMode => {
    if (['xs', 'sm'].includes(breakpoint)) return 'compact';
    if (['md', 'lg'].includes(breakpoint)) return 'default';
    return 'expanded';
  }, []);
  
  // Generate layout configuration based on breakpoint and mode
  const getLayoutConfig = useCallback((breakpoint: Breakpoint, mode: LayoutMode): LayoutConfig => {
    switch (mode) {
      case 'compact':
        return {
          sidebarVisible: false,
          contentColumns: 1,
          widgetsPerRow: 1,
          compactHeader: true,
          compactWidgets: true,
          stackedNavigation: true
        };
      case 'default':
        return {
          sidebarVisible: true,
          contentColumns: breakpoint === 'md' ? 2 : 3,
          widgetsPerRow: breakpoint === 'md' ? 1 : 2,
          compactHeader: false,
          compactWidgets: false,
          stackedNavigation: false
        };
      case 'expanded':
        return {
          sidebarVisible: true,
          contentColumns: 4,
          widgetsPerRow: 3,
          compactHeader: false,
          compactWidgets: false,
          stackedNavigation: false
        };
    }
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const breakpoint = getBreakpoint(width);
  const orientation = getOrientation(width, height);
  const mode = getLayoutMode(breakpoint);
  const config = getLayoutConfig(breakpoint, mode);
  
  return {
    breakpoint,
    mode,
    orientation,
    config,
    isMobile: ['xs', 'sm'].includes(breakpoint),
    isTablet: ['md', 'lg'].includes(breakpoint),
    isDesktop: ['xl', '2xl'].includes(breakpoint)
  };
}
