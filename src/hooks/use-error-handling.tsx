
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language';

type ErrorOptions = {
  title?: string;
  showToast?: boolean;
  logToConsole?: boolean;
  context?: string;
};

const defaultOptions: ErrorOptions = {
  title: undefined,
  showToast: true,
  logToConsole: true,
  context: 'application',
};

/**
 * A hook to standardize error handling across the application
 */
const useErrorHandling = () => {
  const { t } = useLanguage();
  
  const handleError = useCallback((error: unknown, options?: ErrorOptions) => {
    const opts = { ...defaultOptions, ...options };
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Log to console if needed
    if (opts.logToConsole) {
      console.error(`[${opts.context} Error]:`, error);
    }
    
    // Show toast if needed
    if (opts.showToast) {
      toast.error({
        title: opts.title || t('system.error'),
        description: errorMessage,
      });
    }
    
    return errorMessage;
  }, [t]);
  
  return { handleError };
};

export default useErrorHandling;
