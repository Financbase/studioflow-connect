
import { useState, useEffect } from 'react';

type ZenModeTheme = 'minimal' | 'ambient' | 'focus';
type AmbientSoundscape = 'silence' | 'lofi' | 'nature' | 'analog';

export interface ZenModeOptions {
  theme: ZenModeTheme;
  soundscape: AmbientSoundscape;
  enableTimers: boolean;
  hideNotifications: boolean;
}

const defaultOptions: ZenModeOptions = {
  theme: 'minimal',
  soundscape: 'silence',
  enableTimers: false,
  hideNotifications: true
};

export const useZenMode = () => {
  const [isZenModeActive, setIsZenModeActive] = useState(false);
  const [options, setOptions] = useState<ZenModeOptions>(defaultOptions);
  
  // Effect to prevent scrolling when Zen Mode is active
  useEffect(() => {
    if (isZenModeActive) {
      document.body.style.overflow = 'hidden';
      // Add zen-mode class to body for global styling
      document.body.classList.add('zen-mode-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('zen-mode-active');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('zen-mode-active');
    };
  }, [isZenModeActive]);
  
  // Toggle Zen Mode
  const toggleZenMode = () => {
    setIsZenModeActive(prev => !prev);
  };
  
  // Update Zen Mode options
  const updateOptions = (newOptions: Partial<ZenModeOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };
  
  return {
    isZenModeActive,
    toggleZenMode,
    options,
    updateOptions
  };
};
