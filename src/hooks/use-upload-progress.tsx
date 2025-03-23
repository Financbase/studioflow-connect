
import { useState, useCallback } from 'react';

/**
 * Hook for tracking file upload progress
 */
export function useUploadProgress() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  const startUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress({});
  }, []);
  
  const updateProgress = useCallback((filePath: string, progress: number) => {
    setUploadProgress(prev => ({
      ...prev,
      [filePath]: progress
    }));
  }, []);
  
  const completeUpload = useCallback(() => {
    setIsUploading(false);
  }, []);
  
  const resetProgress = useCallback(() => {
    setUploadProgress({});
    setIsUploading(false);
  }, []);
  
  return {
    isUploading,
    uploadProgress,
    startUpload,
    updateProgress,
    completeUpload,
    resetProgress
  };
}
