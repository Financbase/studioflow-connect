
import * as React from "react"

// Define standard breakpoints for consistent usage across the app
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
};

/**
 * Custom hook to detect if the current viewport is mobile size
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initial check
    checkIfMobile();
    
    // Create a media query list for mobile detection
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`);
    
    // Event handler function
    const handleResize = () => checkIfMobile();
    
    // Modern way to add event listener for media query
    mql.addEventListener("change", handleResize);
    
    // Cleanup function
    return () => mql.removeEventListener("change", handleResize);
    
    // Helper function to check and set mobile state
    function checkIfMobile() {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE);
    }
  }, []);

  return isMobile;
}

/**
 * Custom hook to detect if the current viewport is tablet size
 */
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initial check
    checkIfTablet();
    
    // Create a media query list for tablet detection
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.TABLET - 1}px)`);
    
    // Event handler function
    const handleResize = () => checkIfTablet();
    
    // Add event listener
    mql.addEventListener("change", handleResize);
    
    // Cleanup function
    return () => mql.removeEventListener("change", handleResize);
    
    // Helper function to check and set tablet state
    function checkIfTablet() {
      setIsTablet(window.innerWidth >= BREAKPOINTS.MOBILE && window.innerWidth < BREAKPOINTS.TABLET);
    }
  }, []);

  return isTablet;
}

/**
 * Custom hook to detect if the current viewport is desktop size
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initial check
    checkIfDesktop();
    
    // Create a media query list for desktop detection
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.TABLET}px)`);
    
    // Event handler function
    const handleResize = () => checkIfDesktop();
    
    // Add event listener
    mql.addEventListener("change", handleResize);
    
    // Cleanup function
    return () => mql.removeEventListener("change", handleResize);
    
    // Helper function to check and set desktop state
    function checkIfDesktop() {
      setIsDesktop(window.innerWidth >= BREAKPOINTS.TABLET);
    }
  }, []);

  return isDesktop;
}

/**
 * All-in-one hook for responsive design
 * Returns an object with boolean values for each breakpoint
 */
export function useResponsive() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    // Helper computed properties
    isTabletOrLarger: isTablet || isDesktop,
    isMobileOrTablet: isMobile || isTablet
  };
}

/**
 * Hook to get the current breakpoint name
 */
export function useBreakpointName(): 'mobile' | 'tablet' | 'desktop' {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
}
