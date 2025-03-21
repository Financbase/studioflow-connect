
/**
 * Formats seconds into MM:SS format
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Formats file size in bytes to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Formats audio file type to a cleaner format
 */
export const formatFileType = (type: string): string => {
  const fileType = type.split('/')[1]?.toUpperCase() || 'AUDIO';
  return fileType.length > 4 ? fileType.substring(0, 4) : fileType;
};

/**
 * Debounce function for UI interactions
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Safely initializes an AudioContext with browser compatibility
 */
export const createAudioContext = (): AudioContext => {
  // Check if AudioContext is available in this browser
  if (!window.AudioContext && !(window as any).webkitAudioContext) {
    throw new Error("AudioContext is not supported in this browser");
  }
  
  // Create the appropriate context
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

/**
 * Safely connect an audio source to an analyzer and destination
 */
export const connectAudioNodes = (
  context: AudioContext,
  source: MediaElementAudioSourceNode,
  analyzer: AnalyserNode
): void => {
  try {
    source.connect(analyzer);
    analyzer.connect(context.destination);
  } catch (error) {
    console.error("Error connecting audio nodes:", error);
    throw error;
  }
};
