
import { useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from '@/hooks/use-toast';

export type ZenModeTheme = 'minimal' | 'dark' | 'light' | 'paper' | 'ambient' | 'focus';
export type ZenModeSoundscape = 'silence' | 'lofi' | 'nature' | 'ambient';

export interface ZenModeOptions {
  theme: ZenModeTheme;
  soundscape: ZenModeSoundscape;
  enableTimers: boolean;
  hideNotifications: boolean;
  enableBrainstorming: boolean;
}

const defaultOptions: ZenModeOptions = {
  theme: 'minimal',
  soundscape: 'silence',
  enableTimers: false,
  hideNotifications: true,
  enableBrainstorming: false
};

/**
 * Hook for managing the application's Zen Mode state and behaviors
 */
export const useZenMode = () => {
  // Store Zen Mode state in localStorage to persist between sessions
  const [isActive, setIsActive] = useLocalStorage<boolean>('zenMode-active', false);
  
  // Store Zen Mode options in localStorage to persist user preferences
  const [options, setOptions] = useLocalStorage<ZenModeOptions>('zenMode-options', defaultOptions);
  
  // Track how long the user has been in Zen Mode
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  
  /**
   * Toggle Zen Mode on/off
   */
  const toggleZenMode = useCallback(() => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      // Zen Mode activated
      setSessionStartTime(Date.now());
      
      // Show a toast notification
      toast({
        title: 'Zen Mode Activated',
        description: 'Distractions minimized. Focus enhanced.'
      });
      
      // Apply any global effects for zen mode (like hiding notifications)
      if (options.hideNotifications) {
        // In a real app, would integrate with OS notifications API
        // or disable in-app notifications
      }
    } else {
      // Zen Mode deactivated
      // Calculate session duration if we have a start time
      if (sessionStartTime) {
        const duration = Math.floor((Date.now() - sessionStartTime) / 1000 / 60); // in minutes
        toast({
          title: 'Zen Mode Ended',
          description: `You stayed focused for ${duration} minutes`
        });
      }
      
      setSessionStartTime(null);
    }
  }, [isActive, options.hideNotifications, sessionStartTime, setIsActive]);
  
  /**
   * Update Zen Mode options
   */
  const updateOptions = useCallback((newOptions: Partial<ZenModeOptions>) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      ...newOptions
    }));
  }, [setOptions]);
  
  return {
    isActive,
    options,
    toggleZenMode,
    updateOptions,
    // Alias for components that might be using toggle directly
    toggle: toggleZenMode
  };
};

export default useZenMode;
