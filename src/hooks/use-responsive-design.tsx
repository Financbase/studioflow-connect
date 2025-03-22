
import * as React from "react";

// Define standard breakpoints for consistent responsive design
export const BREAKPOINTS = {
  SM: 640,  // Small screens (e.g., mobile phones)
  MD: 768,  // Medium screens (e.g., tablets)
  LG: 1024, // Large screens (e.g., laptops)
  XL: 1280, // Extra large screens (e.g., desktops)
  XXL: 1536 // Extra extra large screens (e.g., large desktops)
};

/**
 * Custom hook to detect screen size based on breakpoints
 * Returns boolean values for each breakpoint
 */
export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = React.useState({
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    isXxl: false
  });

  React.useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        isSm: width >= BREAKPOINTS.SM,
        isMd: width >= BREAKPOINTS.MD,
        isLg: width >= BREAKPOINTS.LG,
        isXl: width >= BREAKPOINTS.XL,
        isXxl: width >= BREAKPOINTS.XXL
      });
    };
    
    // Initial check
    checkBreakpoints();
    
    // Add event listener
    window.addEventListener('resize', checkBreakpoints);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);
  
  return breakpoints;
}

/**
 * Custom hook to get the current breakpoint name
 * Returns the name of the current breakpoint (sm, md, lg, xl, xxl)
 */
export function useCurrentBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
  const { isSm, isMd, isLg, isXl, isXxl } = useBreakpoints();
  
  if (isXxl) return 'xxl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}

/**
 * Custom hook to detect element visibility in viewport
 */
export function useElementVisibility<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<T>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 10% of the element is visible
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  return { ref, isVisible };
}

/**
 * Custom hook for responsive grid layouts
 * Returns the number of columns for a grid based on the current screen size
 */
export function useResponsiveGrid(
  options = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }
): number {
  const breakpoint = useCurrentBreakpoint();
  return options[breakpoint] || 1;
}
