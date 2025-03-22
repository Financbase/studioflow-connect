
import { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * Available breakpoints in the application
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Screen size configuration matching Tailwind default breakpoints
 */
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

interface ResponsiveLayoutOptions {
  /**
   * Debounce time for resize events in milliseconds
   */
  debounceTime?: number;
}

export interface ResponsiveLayoutState {
  /**
   * Current screen width
   */
  screenWidth: number;
  
  /**
   * Current screen height
   */
  screenHeight: number;
  
  /**
   * Current breakpoint (xs, sm, md, lg, xl, 2xl)
   */
  breakpoint: Breakpoint;
  
  /**
   * Whether the current screen size is mobile
   */
  isMobile: boolean;
  
  /**
   * Whether the current screen size is portrait
   */
  isPortrait: boolean;
  
  /**
   * Check if the current screen size is at or above a specific breakpoint
   */
  isMinWidth: (breakpoint: Breakpoint) => boolean;
  
  /**
   * Check if the current screen size is below a specific breakpoint
   */
  isMaxWidth: (breakpoint: Breakpoint) => boolean;
  
  /**
   * Get the number of columns to use for the current breakpoint
   */
  getColumnsForBreakpoint: (options?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  }) => number;
}

/**
 * A comprehensive hook for responsive layout management
 * that provides various utilities for responsive design.
 */
export const useResponsiveLayout = (
  options: ResponsiveLayoutOptions = {}
): ResponsiveLayoutState => {
  const { debounceTime = 100 } = options;
  const isMobileDevice = useIsMobile();
  
  // Track window dimensions with debounce
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let debounceTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, debounceTime);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimeout);
    };
  }, [debounceTime]);
  
  // Calculate current breakpoint based on screen width
  const breakpoint = useMemo<Breakpoint>(() => {
    const { width } = dimensions;
    
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [dimensions]);
  
  // Utility functions for breakpoint comparisons
  const isMinWidth = (bp: Breakpoint): boolean => {
    return dimensions.width >= breakpoints[bp];
  };
  
  const isMaxWidth = (bp: Breakpoint): boolean => {
    return dimensions.width < breakpoints[bp];
  };
  
  // Determine if the screen is in portrait orientation
  const isPortrait = dimensions.height > dimensions.width;
  
  // Function to get number of columns based on current breakpoint
  const getColumnsForBreakpoint = (options: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  } = {}): number => {
    const defaults = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, '2xl': 4 };
    const merged = { ...defaults, ...options };
    
    return merged[breakpoint];
  };
  
  return {
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
    breakpoint,
    isMobile: isMobileDevice,
    isPortrait,
    isMinWidth,
    isMaxWidth,
    getColumnsForBreakpoint
  };
};
