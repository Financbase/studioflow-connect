
import { useState, useEffect } from 'react';

export interface ZenModeOptions {
  theme: 'minimal' | 'ambient' | 'focus';
  soundscape: 'silence' | 'lofi' | 'nature' | 'analog';
  enableTimers: boolean;
  hideNotifications: boolean;
}

interface UseZenModeProps {
  initialOptions?: Partial<ZenModeOptions>;
}

const DEFAULT_OPTIONS: ZenModeOptions = {
  theme: 'minimal',
  soundscape: 'silence',
  enableTimers: false,
  hideNotifications: true,
};

export const useZenMode = (props?: UseZenModeProps) => {
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState<ZenModeOptions>({
    ...DEFAULT_OPTIONS,
    ...props?.initialOptions,
  });
  
  // Apply zen mode classes to document body
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('zen-mode-active');
    } else {
      document.body.classList.remove('zen-mode-active');
    }
    
    return () => {
      document.body.classList.remove('zen-mode-active');
    };
  }, [isActive]);
  
  // Handle notification hiding
  useEffect(() => {
    if (isActive && options.hideNotifications) {
      // This would be where we'd implement notification hiding
      // For example: document.querySelectorAll('.notification').forEach(el => el.classList.add('hidden'));
    }
    
    return () => {
      // And restoring them when zen mode is disabled
      // document.querySelectorAll('.notification').forEach(el => el.classList.remove('hidden'));
    };
  }, [isActive, options.hideNotifications]);
  
  // Handle soundscapes
  useEffect(() => {
    if (isActive && options.soundscape !== 'silence') {
      // This would be where we'd start playing the soundscape audio
      const playSound = () => {
        console.log(`Playing ${options.soundscape} soundscape`);
        // Actual implementation would depend on your audio setup
      };
      
      playSound();
      return () => {
        // Stop playing the soundscape audio
        console.log(`Stopping ${options.soundscape} soundscape`);
      };
    }
  }, [isActive, options.soundscape]);
  
  const updateOptions = (newOptions: Partial<ZenModeOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };
  
  const toggle = () => setIsActive(prev => !prev);
  const activate = () => setIsActive(true);
  const deactivate = () => setIsActive(false);
  
  return {
    isActive,
    options,
    toggle,
    activate,
    deactivate,
    updateOptions,
  };
};

export default useZenMode;
