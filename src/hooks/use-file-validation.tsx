
import { useCallback } from 'react';
import { validateFileType, validateFileSize, getInvalidTypeErrorMessage, getFileSizeErrorMessage } from '@/utils/file-validation';
import { toast } from '@/hooks/use-toast';

interface FileValidationOptions {
  allowedFileTypes?: string[];
  maxFileSize?: number;
  customValidator?: (file: File) => string | null;
}

/**
 * Hook for validating files before upload
 */
export function useFileValidation(options: FileValidationOptions = {}) {
  const { allowedFileTypes = [], maxFileSize, customValidator } = options;
  
  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!validateFileType(file, allowedFileTypes)) {
      return getInvalidTypeErrorMessage(file.name);
    }
    
    // Check file size
    if (!validateFileSize(file, maxFileSize)) {
      return getFileSizeErrorMessage(file.name);
    }
    
    // Run custom validation if provided
    if (customValidator) {
      return customValidator(file);
    }
    
    return null;
  }, [allowedFileTypes, maxFileSize, customValidator]);
  
  const validateFiles = useCallback((files: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      const validationError = validateFile(file);
      
      if (validationError) {
        toast({
          title: "Validation Error",
          description: validationError,
          variant: "destructive"
        });
        continue;
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  }, [validateFile]);
  
  return {
    validateFile,
    validateFiles
  };
}
