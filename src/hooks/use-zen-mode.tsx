
import { useState, useEffect } from 'react';

export const useZenMode = () => {
  const [isZenModeActive, setIsZenModeActive] = useState(false);
  
  // Effect to prevent scrolling when Zen Mode is active
  useEffect(() => {
    if (isZenModeActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZenModeActive]);
  
  // Toggle Zen Mode
  const toggleZenMode = () => {
    setIsZenModeActive(prev => !prev);
  };
  
  return {
    isZenModeActive,
    toggleZenMode
  };
};
