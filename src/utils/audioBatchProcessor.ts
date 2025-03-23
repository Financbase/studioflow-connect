
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';

/**
 * Interface for batch processing configuration
 */
export interface BatchProcessOptions {
  batchSize?: number;
  concurrentProcesses?: number;
  onProgress?: (progress: number) => void;
  onComplete?: (results: ProcessingResult[]) => void;
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * Result of processing an individual audio asset
 */
export interface ProcessingResult {
  asset: AudioAsset;
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

/**
 * Default options for batch processing
 */
const DEFAULT_OPTIONS: BatchProcessOptions = {
  batchSize: 5,
  concurrentProcesses: 2,
  retryAttempts: 2,
  retryDelay: 2000
};

/**
 * Batch processor for audio assets
 */
export class AudioBatchProcessor {
  private options: Required<BatchProcessOptions>;
  private processingQueue: AudioAsset[] = [];
  private results: ProcessingResult[] = [];
  private activeProcesses = 0;
  private processedCount = 0;
  private totalCount = 0;
  private isProcessing = false;

  constructor(options?: BatchProcessOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options } as Required<BatchProcessOptions>;
  }

  /**
   * Add assets to the processing queue
   */
  public addToQueue(assets: AudioAsset[]): void {
    this.processingQueue.push(...assets);
    this.totalCount += assets.length;
  }

  /**
   * Start processing the queue
   */
  public async startProcessing(processor: (asset: AudioAsset) => Promise<any>): Promise<ProcessingResult[]> {
    if (this.isProcessing) {
      console.warn('Batch processing already in progress');
      return this.results;
    }

    this.isProcessing = true;
    this.processedCount = 0;
    this.results = [];

    try {
      const batches = this.createBatches();
      
      for (const batch of batches) {
        await this.processBatch(batch, processor);
        this.updateProgress();
      }
      
      if (this.options.onComplete) {
        this.options.onComplete(this.results);
      }
      
      this.isProcessing = false;
      return this.results;
      
    } catch (error) {
      this.isProcessing = false;
      console.error('Batch processing failed:', error);
      toast({
        title: 'Processing Failed',
        description: 'An error occurred during batch processing.',
        variant: 'destructive'
      });
      
      return this.results;
    }
  }

  /**
   * Process a single asset with retry capability
   */
  private async processAsset(asset: AudioAsset, processor: (asset: AudioAsset) => Promise<any>): Promise<ProcessingResult> {
    let attempts = 0;
    
    while (attempts <= this.options.retryAttempts) {
      try {
        // Use storage_path instead of fileUrl
        if (!asset.storage_path) {
          throw new Error('Asset has no storage path');
        }
        
        const metadata = await processor(asset);
        
        return {
          asset,
          success: true,
          metadata
        };
      } catch (error) {
        attempts++;
        
        if (attempts <= this.options.retryAttempts) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));
        } else {
          // Max attempts reached
          return {
            asset,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      }
    }
    
    // Fallback (this should never be reached due to the returns above)
    return {
      asset,
      success: false,
      error: 'Failed after max retry attempts'
    };
  }
  
  /**
   * Create batches from the queue based on batch size
   */
  private createBatches(): AudioAsset[][] {
    const batches: AudioAsset[][] = [];
    const { batchSize } = this.options;
    
    for (let i = 0; i < this.processingQueue.length; i += batchSize) {
      batches.push(this.processingQueue.slice(i, i + batchSize));
    }
    
    return batches;
  }
  
  /**
   * Process a batch of assets with concurrency control
   */
  private async processBatch(batch: AudioAsset[], processor: (asset: AudioAsset) => Promise<any>): Promise<void> {
    const { concurrentProcesses } = this.options;
    
    // Process in chunks based on concurrency limit
    for (let i = 0; i < batch.length; i += concurrentProcesses) {
      const chunk = batch.slice(i, i + concurrentProcesses);
      
      // Process chunk items in parallel
      const chunkResults = await Promise.all(
        chunk.map(asset => this.processAsset(asset, processor))
      );
      
      this.results.push(...chunkResults);
      this.processedCount += chunk.length;
      this.updateProgress();
    }
  }
  
  /**
   * Update progress based on processed count
   */
  private updateProgress(): void {
    if (this.options.onProgress && this.totalCount > 0) {
      const progress = (this.processedCount / this.totalCount) * 100;
      this.options.onProgress(progress);
    }
  }
  
  /**
   * Reset the processor
   */
  public reset(): void {
    this.processingQueue = [];
    this.results = [];
    this.activeProcesses = 0;
    this.processedCount = 0;
    this.totalCount = 0;
    this.isProcessing = false;
  }
  
  /**
   * Get current processing status
   */
  public getStatus() {
    return {
      isProcessing: this.isProcessing,
      processedCount: this.processedCount,
      totalCount: this.totalCount,
      progress: this.totalCount > 0 ? (this.processedCount / this.totalCount) * 100 : 0,
      remainingItems: this.totalCount - this.processedCount
    };
  }
}
