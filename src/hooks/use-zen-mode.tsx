
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";

export interface ZenModeOptions {
  theme: 'minimal' | 'ambient' | 'focus';
  soundscape: 'silence' | 'lofi' | 'nature' | 'analog';
  enableTimers: boolean;
  hideNotifications: boolean;
  enableBrainstorming?: boolean;
}

interface UseZenModeProps {
  initialOptions?: Partial<ZenModeOptions>;
  onStateChange?: (isActive: boolean) => void;
}

const DEFAULT_OPTIONS: ZenModeOptions = {
  theme: 'minimal',
  soundscape: 'silence',
  enableTimers: false,
  hideNotifications: true,
  enableBrainstorming: true,
};

// Map of soundscape names to their audio URLs
// In a real app, these would be actual audio files
const SOUNDSCAPE_URLS: Record<Exclude<ZenModeOptions['soundscape'], 'silence'>, string> = {
  lofi: 'https://example.com/lofi-beats.mp3',
  nature: 'https://example.com/nature-sounds.mp3',
  analog: 'https://example.com/analog-static.mp3',
};

// Store user preferences for zen mode
const STORAGE_KEY = 'zen-mode-preferences';

export const useZenMode = (props?: UseZenModeProps) => {
  // Load saved options from localStorage
  const getSavedOptions = useCallback((): ZenModeOptions => {
    try {
      const savedOptions = localStorage.getItem(STORAGE_KEY);
      return savedOptions 
        ? { ...DEFAULT_OPTIONS, ...JSON.parse(savedOptions) } 
        : { ...DEFAULT_OPTIONS, ...props?.initialOptions };
    } catch (e) {
      console.error('Error loading zen mode preferences:', e);
      return { ...DEFAULT_OPTIONS, ...props?.initialOptions };
    }
  }, [props?.initialOptions]);

  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState<ZenModeOptions>(getSavedOptions());
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Save options when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
    } catch (e) {
      console.error('Error saving zen mode preferences:', e);
    }
  }, [options]);
  
  // Apply zen mode classes to document body
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('zen-mode-active');
      
      // Notify user that zen mode is active
      if (options.theme !== 'minimal') {
        toast({
          title: `${options.theme.charAt(0).toUpperCase() + options.theme.slice(1)} Zen Mode activated`,
          description: "Enjoy your distraction-free environment.",
          duration: 3000,
        });
      }
    } else {
      document.body.classList.remove('zen-mode-active');
      // Reset active feature when exiting zen mode
      setActiveFeature(null);
    }
    
    // Call onStateChange if provided
    props?.onStateChange?.(isActive);
    
    return () => {
      document.body.classList.remove('zen-mode-active');
    };
  }, [isActive, options.theme, props]);
  
  // Handle notification hiding
  useEffect(() => {
    if (isActive && options.hideNotifications) {
      // This would be where we'd implement notification hiding
      // For example: document.querySelectorAll('.notification').forEach(el => el.classList.add('hidden'));
      console.log('Notifications hidden in Zen Mode');
    }
    
    return () => {
      // And restoring them when zen mode is disabled
      // document.querySelectorAll('.notification').forEach(el => el.classList.remove('hidden'));
      if (options.hideNotifications) {
        console.log('Notifications restored');
      }
    };
  }, [isActive, options.hideNotifications]);
  
  // Handle soundscapes
  useEffect(() => {
    // Cleanup previous audio if it exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    if (isActive && options.soundscape !== 'silence') {
      // In a real implementation, we would load and play the audio
      console.log(`Playing ${options.soundscape} soundscape`);
      
      // Create audio element (in a real app this would actually play sounds)
      const url = SOUNDSCAPE_URLS[options.soundscape];
      if (url) {
        const audio = new Audio(url);
        audio.loop = true;
        audio.volume = 0.4;
        // In a real implementation, uncomment the line below:
        // audio.play().catch(err => console.error('Error playing audio:', err));
        audioRef.current = audio;
        
        // Log instead of actually playing (since we don't have real audio files)
        console.log(`Started ${options.soundscape} soundscape (volume: ${audio.volume})`);
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        console.log(`Stopped soundscape audio`);
      }
    };
  }, [isActive, options.soundscape]);
  
  // Keyboard shortcut for toggling zen mode (Ctrl/Cmd + Shift + Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        setIsActive(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const updateOptions = useCallback((newOptions: Partial<ZenModeOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);
  
  const toggle = useCallback(() => setIsActive(prev => !prev), []);
  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);
  
  const setFeature = useCallback((feature: string | null) => {
    setActiveFeature(feature);
  }, []);
  
  return {
    isActive,
    options,
    activeFeature,
    toggle,
    activate,
    deactivate,
    updateOptions,
    setFeature,
  };
};

export default useZenMode;
