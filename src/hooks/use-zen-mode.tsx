
import { useState, useEffect, useRef } from 'react';

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

// Map of soundscape names to their audio URLs
// In a real app, these would be actual audio files
const SOUNDSCAPE_URLS: Record<Exclude<ZenModeOptions['soundscape'], 'silence'>, string> = {
  lofi: 'https://example.com/lofi-beats.mp3',
  nature: 'https://example.com/nature-sounds.mp3',
  analog: 'https://example.com/analog-static.mp3',
};

export const useZenMode = (props?: UseZenModeProps) => {
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState<ZenModeOptions>({
    ...DEFAULT_OPTIONS,
    ...props?.initialOptions,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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
