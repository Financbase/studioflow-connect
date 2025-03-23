
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { validateFileType, validateFileSize } from '@/utils/file-validation';

export interface DragDropValidationOptions {
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  validateFile?: (file: File) => boolean | string;
}

/**
 * Hook for validating files in drag and drop operations
 */
export function useDragDropValidation(options: DragDropValidationOptions = {}) {
  const {
    acceptedFileTypes = [],
    maxFileSize,
    validateFile,
  } = options;
  
  const validateFiles = useCallback((filesToValidate: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of filesToValidate) {
      // Check file type
      if (!validateFileType(file, acceptedFileTypes)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an accepted file type.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size
      if (!validateFileSize(file, maxFileSize)) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum file size.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Run custom validation if provided
      if (validateFile) {
        const result = validateFile(file);
        if (result !== true && typeof result === 'string') {
          toast({
            title: "Validation failed",
            description: result,
            variant: "destructive"
          });
          continue;
        }
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  }, [acceptedFileTypes, maxFileSize, validateFile]);
  
  return {
    validateFiles
  };
}
