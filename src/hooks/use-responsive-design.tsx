
import { useState, useEffect, useMemo } from 'react';
import { useIsMobile } from './use-mobile';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/**
 * Default breakpoints matching Tailwind CSS defaults
 */
const defaultBreakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

interface ResponsiveDesignReturn {
  /**
   * Current breakpoint based on window width
   */
  breakpoint: Breakpoint;
  /**
   * Whether the current screen is smaller than the provided breakpoint
   */
  isBelow: (breakpoint: Breakpoint) => boolean;
  /**
   * Whether the current screen is larger than the provided breakpoint
   */
  isAbove: (breakpoint: Breakpoint) => boolean;
  /**
   * Returns the appropriate value based on the current breakpoint
   */
  value: <T>(values: Partial<Record<Breakpoint, T>>, defaultValue: T) => T;
  /**
   * Whether the device is in portrait orientation
   */
  isPortrait: boolean;
  /**
   * Current window width
   */
  width: number;
  /**
   * Current window height
   */
  height: number;
  /**
   * Whether the device is mobile (from useIsMobile)
   */
  isMobile: boolean;
}

/**
 * A hook for handling responsive design across the application
 * 
 * @example
 * const { isBelow, value } = useResponsiveDesign();
 * 
 * // Conditionally render based on breakpoint
 * {isBelow('md') && <MobileNav />}
 * 
 * // Use different values based on breakpoint
 * const columns = value({ xs: 1, sm: 2, lg: 3 }, 1);
 */
export const useResponsiveDesign = (
  customBreakpoints?: Partial<BreakpointConfig>
): ResponsiveDesignReturn => {
  const isMobile = useIsMobile();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  
  // Merge custom breakpoints with defaults
  const breakpoints = useMemo(() => {
    if (!customBreakpoints) return defaultBreakpoints;
    return { ...defaultBreakpoints, ...customBreakpoints };
  }, [customBreakpoints]);
  
  // Calculate current breakpoint based on window width
  const breakpoint = useMemo((): Breakpoint => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [width, breakpoints]);
  
  // Determine if in portrait orientation
  const isPortrait = height > width;
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if current width is below a specified breakpoint
  const isBelow = (checkBreakpoint: Breakpoint): boolean => {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    const checkIndex = breakpointOrder.indexOf(checkBreakpoint);
    return currentIndex < checkIndex;
  };
  
  // Check if current width is above a specified breakpoint
  const isAbove = (checkBreakpoint: Breakpoint): boolean => {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    const checkIndex = breakpointOrder.indexOf(checkBreakpoint);
    return currentIndex > checkIndex;
  };
  
  // Return the appropriate value based on the current breakpoint
  const value = <T,>(values: Partial<Record<Breakpoint, T>>, defaultValue: T): T => {
    // Order breakpoints from largest to smallest for mobile-first approach
    const breakpointOrder: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    
    // Find the largest breakpoint that is less than or equal to the current breakpoint
    for (const bp of breakpointOrder) {
      if (values[bp] !== undefined && !isBelow(bp)) {
        return values[bp] as T;
      }
    }
    
    return defaultValue;
  };
  
  return {
    breakpoint,
    isBelow,
    isAbove,
    value,
    isPortrait,
    width,
    height,
    isMobile
  };
};

export default useResponsiveDesign;
