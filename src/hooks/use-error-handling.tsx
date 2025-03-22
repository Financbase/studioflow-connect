
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ErrorOptions {
  title?: string;
  logToConsole?: boolean;
  showToast?: boolean;
  toastVariant?: 'default' | 'destructive';
  retry?: () => Promise<any>;
}

/**
 * Hook for centralized and consistent error handling
 * with support for retry logic and user feedback
 */
export const useErrorHandling = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: any, options: ErrorOptions = {}) => {
    const {
      title = 'An error occurred',
      logToConsole = true,
      showToast = true,
      toastVariant = 'destructive',
      retry
    } = options;
    
    // Store the error
    const errorObj = error instanceof Error ? error : new Error(String(error));
    setLastError(errorObj);
    
    // Format error message
    const errorMessage = errorObj.message || 'Something went wrong';
    
    // Log to console if needed
    if (logToConsole) {
      console.error(`[Error] ${title}:`, errorObj);
    }
    
    // Show toast notification if needed
    if (showToast) {
      toast({
        title,
        description: errorMessage,
        variant: toastVariant,
        action: retry ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => retryOperation(retry)}
            className="retry-action"
          >
            Retry
          </Button>
        ) : undefined
      });
    }
    
    return errorObj;
  }, []);
  
  const retryOperation = useCallback(async (operation: () => Promise<any>) => {
    try {
      setIsRetrying(true);
      setLastError(null);
      await operation();
      toast({
        title: "Operation successful",
        description: "The operation completed successfully on retry.",
      });
    } catch (error) {
      handleError(error, {
        title: "Retry failed",
        showToast: true
      });
    } finally {
      setIsRetrying(false);
    }
  }, [handleError]);
  
  const clearError = useCallback(() => {
    setLastError(null);
  }, []);
  
  return {
    handleError,
    retryOperation,
    clearError,
    lastError,
    isRetrying,
    hasError: lastError !== null
  };
};

export default useErrorHandling;
