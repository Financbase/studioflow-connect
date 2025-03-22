
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

/**
 * Hook to manage responsive layout adjustments across the application
 * with optimized rendering and performance considerations.
 * 
 * @returns Various responsive layout utilities and state
 */
export const useResponsiveLayout = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  
  // Debounced resize handler to improve performance
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024 && width < 1440);
      setIsLargeDesktop(width >= 1440);
    };
    
    // Add debouncing for better performance
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', debouncedResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Determine optimal column count based on screen size
  const getOptimalColumnCount = (minColumns = 1, maxColumns = 4) => {
    if (isMobile) return minColumns;
    if (isTablet) return Math.min(maxColumns, Math.max(minColumns, 2));
    if (isDesktop) return Math.min(maxColumns, Math.max(minColumns, 3));
    if (isLargeDesktop) return maxColumns;
    return minColumns;
  };
  
  // Get appropriate container class based on screen size
  const getContainerClass = () => {
    if (isMobile) return 'responsive-container size-sm mobile-container';
    if (isTablet) return 'responsive-container size-md tablet-container';
    if (isDesktop) return 'responsive-container size-lg desktop-container';
    return 'responsive-container size-xl large-desktop-container';
  };
  
  // Get appropriate grid class for responsive layouts
  const getResponsiveGridClass = (columns = 4) => {
    const optimalColumns = getOptimalColumnCount(1, columns);
    return `responsive-grid responsive-grid-${optimalColumns}`;
  };
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    getOptimalColumnCount,
    getContainerClass,
    getResponsiveGridClass,
    screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large-desktop',
  };
};

export default useResponsiveLayout;
