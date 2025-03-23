
/**
 * Audio Batch Processing Utility
 * 
 * This utility helps with processing multiple audio files with the same
 * operations in a batch processing workflow.
 */

import { AudioAsset } from '@/types/supabase';

export type AudioProcessingOperation = {
  name: string;
  processor: (audioData: AudioBuffer) => Promise<AudioBuffer>;
  options?: Record<string, any>;
};

export type BatchProcessingStatus = {
  total: number;
  completed: number;
  failed: number;
  processing: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  errors: Record<string, string>;
};

export type BatchProcessingOptions = {
  parallelProcessing?: number;
  onProgress?: (status: BatchProcessingStatus) => void;
  stopOnError?: boolean;
};

export class AudioBatchProcessor {
  private audioContext: AudioContext;
  private operations: AudioProcessingOperation[] = [];
  private status: BatchProcessingStatus = {
    total: 0,
    completed: 0,
    failed: 0,
    processing: 0,
    status: 'idle',
    errors: {}
  };
  private options: Required<BatchProcessingOptions>;
  
  constructor(options?: BatchProcessingOptions) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.options = {
      parallelProcessing: 2,
      onProgress: () => {},
      stopOnError: false,
      ...options
    };
  }
  
  addOperation(operation: AudioProcessingOperation): this {
    this.operations.push(operation);
    return this;
  }
  
  clearOperations(): this {
    this.operations = [];
    return this;
  }
  
  resetStatus(): this {
    this.status = {
      total: 0,
      completed: 0,
      failed: 0,
      processing: 0,
      status: 'idle',
      errors: {}
    };
    return this;
  }
  
  async processFiles(files: File[]): Promise<AudioBuffer[]> {
    return this.processAudioData(files.map(file => ({ file })));
  }
  
  async processAudioAssets(assets: AudioAsset[]): Promise<AudioBuffer[]> {
    // Convert assets to files or URLs for processing
    const audioData = await Promise.all(
      assets.map(async (asset) => {
        if (asset.fileUrl) {
          const response = await fetch(asset.fileUrl);
          const blob = await response.blob();
          return { asset, blob };
        }
        throw new Error(`Asset ${asset.id} has no valid file URL`);
      })
    );
    
    return this.processAudioData(audioData);
  }
  
  private updateStatus(update: Partial<BatchProcessingStatus>) {
    this.status = {
      ...this.status,
      ...update
    };
    this.options.onProgress(this.status);
  }
  
  private async processAudioData(
    audioData: Array<{ file?: File; blob?: Blob; asset?: AudioAsset }>
  ): Promise<AudioBuffer[]> {
    const results: AudioBuffer[] = [];
    
    this.resetStatus();
    this.updateStatus({
      total: audioData.length,
      status: 'processing'
    });
    
    // Process in chunks based on parallelProcessing setting
    const chunks = this.chunkArray(audioData, this.options.parallelProcessing);
    
    try {
      for (const chunk of chunks) {
        // Process each chunk in parallel
        const chunkPromises = chunk.map(async (data, index) => {
          try {
            this.updateStatus({ processing: this.status.processing + 1 });
            
            // Decode the audio data
            const arrayBuffer = await this.getArrayBuffer(data);
            let audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            // Apply each operation in sequence
            for (const operation of this.operations) {
              audioBuffer = await operation.processor(audioBuffer);
            }
            
            this.updateStatus({
              completed: this.status.completed + 1,
              processing: this.status.processing - 1
            });
            
            return audioBuffer;
          } catch (error) {
            const errorMessage = (error as Error).message;
            const id = data.asset?.id || `file-${index}`;
            
            this.updateStatus({
              failed: this.status.failed + 1,
              processing: this.status.processing - 1,
              errors: {
                ...this.status.errors,
                [id]: errorMessage
              }
            });
            
            if (this.options.stopOnError) {
              throw error;
            }
            
            return null;
          }
        });
        
        const chunkResults = await Promise.all(chunkPromises);
        results.push(...chunkResults.filter(Boolean) as AudioBuffer[]);
      }
      
      this.updateStatus({ status: 'completed' });
      return results;
    } catch (error) {
      this.updateStatus({ status: 'error' });
      throw error;
    }
  }
  
  private async getArrayBuffer(data: { file?: File; blob?: Blob }): Promise<ArrayBuffer> {
    const source = data.file || data.blob;
    if (!source) {
      throw new Error('No valid audio source provided');
    }
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(source);
    });
  }
  
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Common audio processing operations
export const commonAudioOperations = {
  normalize: {
    name: 'Normalize',
    processor: async (audioBuffer: AudioBuffer): Promise<AudioBuffer> => {
      // Create a new buffer with the same properties
      const normalizedBuffer = new AudioBuffer({
        length: audioBuffer.length,
        numberOfChannels: audioBuffer.numberOfChannels,
        sampleRate: audioBuffer.sampleRate
      });
      
      // Find the maximum amplitude across all channels
      let maxAmplitude = 0;
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
          const absValue = Math.abs(channelData[i]);
          if (absValue > maxAmplitude) {
            maxAmplitude = absValue;
          }
        }
      }
      
      // Apply normalization
      const scaleFactor = maxAmplitude > 0 ? 0.99 / maxAmplitude : 1;
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const newChannelData = new Float32Array(channelData.length);
        
        // Apply the scale factor to each sample
        for (let i = 0; i < channelData.length; i++) {
          newChannelData[i] = channelData[i] * scaleFactor;
        }
        
        normalizedBuffer.copyToChannel(newChannelData, channel);
      }
      
      return normalizedBuffer;
    }
  },
  
  // Additional operations can be added here
};

export default AudioBatchProcessor;
