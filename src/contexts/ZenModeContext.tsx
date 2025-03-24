import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for ambient sounds
export type AmbientSoundType = 'rain' | 'ocean' | 'forest' | 'whitenoise' | 'cafe' | 'none';

// Define timer settings
export interface TimerSettings {
  focusDuration: number; // in minutes
  breakDuration: number; // in minutes
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  numPomodorosUntilLongBreak: number;
  longBreakDuration: number; // in minutes
}

// Define theme settings for Zen mode
export interface ZenThemeSettings {
  background: string;
  text: string;
  accent: string;
  fontScale: number;
}

// Main Zen mode state interface
export interface ZenModeState {
  isActive: boolean;
  timerRunning: boolean;
  timerType: 'focus' | 'break' | 'longBreak';
  currentTimerValue: number; // in seconds
  completedPomodoros: number;
  ambientSound: AmbientSoundType;
  ambientVolume: number;
  hideNotifications: boolean;
  hideMenuBar: boolean;
  theme: ZenThemeSettings;
  fullscreen: boolean;
}

// Context configuration settings
export interface ZenModeConfig {
  timerSettings: TimerSettings;
  defaultTheme: ZenThemeSettings;
}

// Context type
type ZenModeContextType = {
  state: ZenModeState;
  config: ZenModeConfig;
  actions: {
    toggleZenMode: () => void;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    skipTimer: () => void;
    setAmbientSound: (sound: AmbientSoundType) => void;
    setAmbientVolume: (volume: number) => void;
    toggleNotifications: () => void;
    toggleMenuBar: () => void;
    toggleFullscreen: () => void;
    updateTimerSettings: (settings: Partial<TimerSettings>) => void;
    updateTheme: (theme: Partial<ZenThemeSettings>) => void;
  };
};

// Default timer settings
const defaultTimerSettings: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  numPomodorosUntilLongBreak: 4,
  longBreakDuration: 15,
};

// Default theme
const defaultTheme: ZenThemeSettings = {
  background: '#1e1e2e',
  text: '#f8f8f2',
  accent: '#bd93f9',
  fontScale: 1.0,
};

// Default state
const defaultState: ZenModeState = {
  isActive: false,
  timerRunning: false,
  timerType: 'focus',
  currentTimerValue: defaultTimerSettings.focusDuration * 60,
  completedPomodoros: 0,
  ambientSound: 'none',
  ambientVolume: 0.5,
  hideNotifications: true,
  hideMenuBar: true,
  theme: defaultTheme,
  fullscreen: false,
};

// Default config
const defaultConfig: ZenModeConfig = {
  timerSettings: defaultTimerSettings,
  defaultTheme,
};

// Create context with default values
const ZenModeContext = createContext<ZenModeContextType | undefined>(undefined);

// Audio context and nodes for ambient sounds
let audioContext: AudioContext | null = null;
let audioNodes: { [key in AmbientSoundType]?: AudioBufferSourceNode } = {};

export const ZenModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ZenModeState>(() => {
    // Try to load saved state from localStorage
    const saved = localStorage.getItem('zenModeState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved zen mode state', e);
      }
    }
    return defaultState;
  });

  const [config, setConfig] = useState<ZenModeConfig>(() => {
    // Try to load saved config from localStorage
    const saved = localStorage.getItem('zenModeConfig');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved zen mode config', e);
      }
    }
    return defaultConfig;
  });

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('zenModeState', JSON.stringify(state));
  }, [state]);

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('zenModeConfig', JSON.stringify(config));
  }, [config]);

  // Timer countdown effect
  useEffect(() => {
    if (!state.timerRunning) return;

    const interval = setInterval(() => {
      setState(prevState => {
        if (prevState.currentTimerValue <= 1) {
          // Timer finished
          clearInterval(interval);
          
          // Handle timer completion based on type
          if (prevState.timerType === 'focus') {
            const newPomodoros = prevState.completedPomodoros + 1;
            const isLongBreak = newPomodoros % config.timerSettings.numPomodorosUntilLongBreak === 0;
            
            return {
              ...prevState,
              timerRunning: config.timerSettings.autoStartBreaks,
              timerType: isLongBreak ? 'longBreak' : 'break',
              currentTimerValue: isLongBreak 
                ? config.timerSettings.longBreakDuration * 60 
                : config.timerSettings.breakDuration * 60,
              completedPomodoros: newPomodoros
            };
          } else {
            // Break finished, start next focus session
            return {
              ...prevState,
              timerRunning: config.timerSettings.autoStartPomodoros,
              timerType: 'focus',
              currentTimerValue: config.timerSettings.focusDuration * 60
            };
          }
        }
        
        // Normal countdown
        return {
          ...prevState,
          currentTimerValue: prevState.currentTimerValue - 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timerRunning, config.timerSettings]);

  // Actions
  const toggleZenMode = () => {
    setState(prev => ({
      ...prev,
      isActive: !prev.isActive,
      // Reset timer when entering zen mode
      currentTimerValue: prev.isActive 
        ? prev.currentTimerValue 
        : config.timerSettings.focusDuration * 60,
      timerType: 'focus'
    }));
  };

  const startTimer = () => {
    setState(prev => ({ ...prev, timerRunning: true }));
  };

  const pauseTimer = () => {
    setState(prev => ({ ...prev, timerRunning: false }));
  };

  const resetTimer = () => {
    const duration = state.timerType === 'focus' 
      ? config.timerSettings.focusDuration 
      : state.timerType === 'break' 
        ? config.timerSettings.breakDuration 
        : config.timerSettings.longBreakDuration;
    
    setState(prev => ({
      ...prev,
      timerRunning: false,
      currentTimerValue: duration * 60
    }));
  };

  const skipTimer = () => {
    const isCurrentlyFocus = state.timerType === 'focus';
    
    if (isCurrentlyFocus) {
      const newPomodoros = state.completedPomodoros + 1;
      const isLongBreak = newPomodoros % config.timerSettings.numPomodorosUntilLongBreak === 0;
      
      setState(prev => ({
        ...prev,
        timerRunning: config.timerSettings.autoStartBreaks,
        timerType: isLongBreak ? 'longBreak' : 'break',
        currentTimerValue: isLongBreak 
          ? config.timerSettings.longBreakDuration * 60 
          : config.timerSettings.breakDuration * 60,
        completedPomodoros: newPomodoros
      }));
    } else {
      setState(prev => ({
        ...prev,
        timerRunning: config.timerSettings.autoStartPomodoros,
        timerType: 'focus',
        currentTimerValue: config.timerSettings.focusDuration * 60
      }));
    }
  };

  const setAmbientSound = (sound: AmbientSoundType) => {
    // TODO: Implement actual audio playback logic
    setState(prev => ({ ...prev, ambientSound: sound }));
  };

  const setAmbientVolume = (volume: number) => {
    // Clamp volume between 0 and 1
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState(prev => ({ ...prev, ambientVolume: clampedVolume }));
  };

  const toggleNotifications = () => {
    setState(prev => ({ ...prev, hideNotifications: !prev.hideNotifications }));
  };

  const toggleMenuBar = () => {
    setState(prev => ({ ...prev, hideMenuBar: !prev.hideMenuBar }));
  };

  const toggleFullscreen = () => {
    setState(prev => ({ ...prev, fullscreen: !prev.fullscreen }));
    
    // Implement actual fullscreen toggling
    if (!state.fullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen mode:', err);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen mode:', err);
      });
    }
  };

  const updateTimerSettings = (settings: Partial<TimerSettings>) => {
    setConfig(prev => ({
      ...prev,
      timerSettings: { ...prev.timerSettings, ...settings }
    }));

    // If timer isn't running, update current timer value to match new settings
    if (!state.timerRunning) {
      setState(prev => {
        const updatedSettings = { ...config.timerSettings, ...settings };
        let newDuration: number;
        
        if (prev.timerType === 'focus') {
          newDuration = (settings.focusDuration ?? prev.currentTimerValue / 60) * 60;
        } else if (prev.timerType === 'break') {
          newDuration = (settings.breakDuration ?? prev.currentTimerValue / 60) * 60;
        } else {
          newDuration = (settings.longBreakDuration ?? prev.currentTimerValue / 60) * 60;
        }
        
        return {
          ...prev,
          currentTimerValue: newDuration
        };
      });
    }
  };

  const updateTheme = (theme: Partial<ZenThemeSettings>) => {
    setState(prev => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  };

  const contextValue: ZenModeContextType = {
    state,
    config,
    actions: {
      toggleZenMode,
      startTimer,
      pauseTimer,
      resetTimer,
      skipTimer,
      setAmbientSound,
      setAmbientVolume,
      toggleNotifications,
      toggleMenuBar,
      toggleFullscreen,
      updateTimerSettings,
      updateTheme,
    }
  };

  return (
    <ZenModeContext.Provider value={contextValue}>
      {children}
    </ZenModeContext.Provider>
  );
};

// Hook for using the ZenMode context
export const useZenMode = (): ZenModeContextType => {
  const context = useContext(ZenModeContext);
  if (!context) {
    throw new Error('useZenMode must be used within a ZenModeProvider');
  }
  return context;
}; 