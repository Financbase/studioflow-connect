
import { useState, useCallback } from 'react';

export type ZenModeTheme = 'minimal' | 'ambient' | 'focus';

export interface ZenModeOptions {
  theme: ZenModeTheme;
  music: boolean;
  notifications: boolean;
  timer: {
    enabled: boolean;
    minutes: number;
  };
  autoSave: boolean;
  focusHighlight: boolean;
}

export const defaultZenModeOptions: ZenModeOptions = {
  theme: 'minimal',
  music: true,
  notifications: false,
  timer: {
    enabled: false,
    minutes: 25
  },
  autoSave: true,
  focusHighlight: true
};

/**
 * Hook to manage zen mode state in the application
 */
export const useZenMode = () => {
  // State for tracking if zen mode is active
  const [isActive, setIsActive] = useState(false);
  
  // State for zen mode options
  const [options, setOptions] = useState<ZenModeOptions>(defaultZenModeOptions);
  
  // Toggle zen mode on/off
  const toggle = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);
  
  // Update zen mode options
  const updateOptions = useCallback((newOptions: Partial<ZenModeOptions>) => {
    setOptions(prev => ({
      ...prev,
      ...newOptions
    }));
  }, []);
  
  // Enable zen mode with specific options
  const enable = useCallback((customOptions?: Partial<ZenModeOptions>) => {
    if (customOptions) {
      updateOptions(customOptions);
    }
    setIsActive(true);
  }, [updateOptions]);
  
  // Disable zen mode
  const disable = useCallback(() => {
    setIsActive(false);
  }, []);
  
  return {
    isActive,
    options,
    toggle,
    enable,
    disable,
    updateOptions
  };
};
