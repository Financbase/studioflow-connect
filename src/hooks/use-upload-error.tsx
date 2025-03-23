
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for handling upload errors with toast notifications
 */
export function useUploadError() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error, fileName: string) => {
    setError(error);
    
    toast({
      title: "Upload failed",
      description: `Could not upload ${fileName}: ${error.message}`,
      variant: "destructive"
    });
    
    return error;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}
