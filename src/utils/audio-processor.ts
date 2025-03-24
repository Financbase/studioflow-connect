/**
 * Audio processor utility for StudioFlow
 * Handles audio analysis, visualization, and processing
 */

import { ErrorCode, handleError } from '@/utils/error-handler';

// AudioContext singleton
let audioContext: AudioContext | null = null;

/**
 * Get or create the audio context
 */
export function getAudioContext(): AudioContext {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch (error) {
      handleError(error, true, { action: 'getAudioContext' });
      throw new Error('WebAudio is not supported in this browser');
    }
  }
  return audioContext;
}

/**
 * Resume the audio context if it's suspended
 * (Browsers require user interaction to start audio context)
 */
export async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (error) {
      handleError(error, true, { action: 'resumeAudioContext' });
    }
  }
}

/**
 * Interface for audio analyser options
 */
export interface AudioAnalyserOptions {
  fftSize?: number;
  minDecibels?: number;
  maxDecibels?: number;
  smoothingTimeConstant?: number;
}

/**
 * Create an analyser node with specified options
 */
export function createAnalyser(options?: AudioAnalyserOptions): AnalyserNode {
  const ctx = getAudioContext();
  const analyser = ctx.createAnalyser();
  
  if (options) {
    if (options.fftSize) analyser.fftSize = options.fftSize;
    if (options.minDecibels) analyser.minDecibels = options.minDecibels;
    if (options.maxDecibels) analyser.maxDecibels = options.maxDecibels;
    if (options.smoothingTimeConstant) analyser.smoothingTimeConstant = options.smoothingTimeConstant;
  }
  
  return analyser;
}

/**
 * Decode an audio file into an AudioBuffer
 */
export async function decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
  const ctx = getAudioContext();
  try {
    return await ctx.decodeAudioData(arrayBuffer);
  } catch (error) {
    handleError(error, true, { 
      action: 'decodeAudioData',
      context: { bufferLength: arrayBuffer.byteLength }
    });
    throw error;
  }
}

/**
 * Load an audio file from a URL
 */
export async function loadAudioFile(url: string): Promise<AudioBuffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load audio file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return await decodeAudioData(arrayBuffer);
  } catch (error) {
    handleError(error, true, { action: 'loadAudioFile', context: { url } });
    throw error;
  }
}

/**
 * Create a buffer source node from an AudioBuffer
 */
export function createBufferSource(buffer: AudioBuffer): AudioBufferSourceNode {
  const ctx = getAudioContext();
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  return source;
}

/**
 * Interface for waveform data
 */
export interface WaveformData {
  peaks: number[]; // Normalized peak values (0-1)
  duration: number; // Duration in seconds
}

/**
 * Generate waveform data from an audio buffer
 */
export function generateWaveformData(
  buffer: AudioBuffer,
  numberOfPoints: number = 100
): WaveformData {
  // Use the first channel (usually left)
  const channelData = buffer.getChannelData(0);
  const peaks: number[] = [];
  
  // Number of samples per point
  const samplesPerPoint = Math.floor(channelData.length / numberOfPoints);
  
  for (let i = 0; i < numberOfPoints; i++) {
    const startSample = i * samplesPerPoint;
    const endSample = startSample + samplesPerPoint;
    
    let min = 1.0;
    let max = -1.0;
    
    for (let j = startSample; j < endSample; j++) {
      const sample = channelData[j];
      if (sample < min) min = sample;
      if (sample > max) max = sample;
    }
    
    // Store the peak-to-peak amplitude (normalized)
    peaks.push((max - min) / 2);
  }
  
  return {
    peaks,
    duration: buffer.duration
  };
}

/**
 * Interface for frequency data
 */
export interface FrequencyData {
  frequencies: Uint8Array;
  binCount: number;
  minDecibels: number;
  maxDecibels: number;
}

/**
 * Get frequency data from an analyser node
 */
export function getFrequencyData(analyser: AnalyserNode): FrequencyData {
  const frequencies = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencies);
  
  return {
    frequencies,
    binCount: analyser.frequencyBinCount,
    minDecibels: analyser.minDecibels,
    maxDecibels: analyser.maxDecibels
  };
}

/**
 * Create a gain node with specified gain value
 */
export function createGain(gainValue: number = 1): GainNode {
  const ctx = getAudioContext();
  const gain = ctx.createGain();
  gain.gain.value = gainValue;
  return gain;
}

/**
 * Simple audio player with basic controls
 */
export class AudioPlayer {
  private context: AudioContext;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode;
  private analyser: AnalyserNode;
  private buffer: AudioBuffer | null = null;
  private startTime: number = 0;
  private offset: number = 0;
  private isPlaying: boolean = false;
  
  constructor(options?: AudioAnalyserOptions) {
    this.context = getAudioContext();
    this.gainNode = this.context.createGain();
    this.analyser = createAnalyser(options);
    
    // Connect nodes
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  
  /**
   * Load an audio buffer
   */
  async loadBuffer(buffer: AudioBuffer): Promise<void> {
    this.buffer = buffer;
    this.offset = 0;
    this.startTime = 0;
  }
  
  /**
   * Load an audio file from URL
   */
  async loadFromUrl(url: string): Promise<void> {
    try {
      this.buffer = await loadAudioFile(url);
      this.offset = 0;
      this.startTime = 0;
    } catch (error) {
      handleError(error, true, { action: 'AudioPlayer.loadFromUrl' });
      throw error;
    }
  }
  
  /**
   * Start playing the audio
   */
  play(): void {
    if (!this.buffer) {
      handleError(
        new Error('No audio buffer loaded'),
        true,
        { action: 'AudioPlayer.play' }
      );
      return;
    }
    
    // If already playing, stop first
    if (this.isPlaying) {
      this.stop();
    }
    
    try {
      resumeAudioContext();
      
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gainNode);
      
      // Set up ended callback
      this.source.onended = () => {
        if (this.isPlaying) {
          this.isPlaying = false;
          this.offset = 0;
        }
      };
      
      // Start playback
      this.startTime = this.context.currentTime;
      this.source.start(0, this.offset);
      this.isPlaying = true;
    } catch (error) {
      handleError(error, true, { action: 'AudioPlayer.play' });
    }
  }
  
  /**
   * Pause playback
   */
  pause(): void {
    if (!this.isPlaying || !this.source) return;
    
    try {
      this.source.stop(0);
      this.offset += this.context.currentTime - this.startTime;
      this.isPlaying = false;
      this.source = null;
    } catch (error) {
      handleError(error, true, { action: 'AudioPlayer.pause' });
    }
  }
  
  /**
   * Stop playback and reset to beginning
   */
  stop(): void {
    if (!this.source) return;
    
    try {
      this.source.stop(0);
      this.offset = 0;
      this.isPlaying = false;
      this.source = null;
    } catch (error) {
      handleError(error, true, { action: 'AudioPlayer.stop' });
    }
  }
  
  /**
   * Set playback position
   */
  seek(time: number): void {
    if (!this.buffer) return;
    
    // Clamp time to valid range
    time = Math.max(0, Math.min(time, this.buffer.duration));
    
    const wasPlaying = this.isPlaying;
    
    if (wasPlaying) {
      this.pause();
    }
    
    this.offset = time;
    
    if (wasPlaying) {
      this.play();
    }
  }
  
  /**
   * Set volume (0-1)
   */
  setVolume(volume: number): void {
    // Clamp volume to valid range
    volume = Math.max(0, Math.min(volume, 1));
    
    try {
      this.gainNode.gain.value = volume;
    } catch (error) {
      handleError(error, true, { action: 'AudioPlayer.setVolume' });
    }
  }
  
  /**
   * Get current playback position
   */
  getCurrentTime(): number {
    if (!this.isPlaying) {
      return this.offset;
    }
    return this.offset + (this.context.currentTime - this.startTime);
  }
  
  /**
   * Get audio duration
   */
  getDuration(): number {
    return this.buffer ? this.buffer.duration : 0;
  }
  
  /**
   * Get current playback state
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * Get the analyzer node for visualizations
   */
  getAnalyser(): AnalyserNode {
    return this.analyser;
  }
  
  /**
   * Get waveform data
   */
  getWaveformData(pointCount: number = 100): WaveformData | null {
    if (!this.buffer) return null;
    return generateWaveformData(this.buffer, pointCount);
  }
  
  /**
   * Get current frequency data
   */
  getFrequencyData(): FrequencyData {
    return getFrequencyData(this.analyser);
  }
  
  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.isPlaying && this.source) {
      this.source.stop(0);
    }
    
    this.gainNode.disconnect();
    this.analyser.disconnect();
    
    this.source = null;
    this.buffer = null;
    this.isPlaying = false;
  }
} 