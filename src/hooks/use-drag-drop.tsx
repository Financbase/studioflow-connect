
import { useState, useEffect, useCallback, DragEvent } from 'react';
import { toast } from '@/hooks/use-toast';

export interface DragDropOptions {
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  multiple?: boolean;
  onDrop?: (files: File[]) => void;
  validateFile?: (file: File) => boolean | string;
}

export function useDragDrop(options: DragDropOptions = {}) {
  const {
    acceptedFileTypes = [],
    maxFileSize,
    multiple = false,
    onDrop,
    validateFile,
  } = options;
  
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  // Reset dragging state when component unmounts
  useEffect(() => {
    return () => {
      setIsDragging(false);
    };
  }, []);
  
  const validateFileType = useCallback((file: File): boolean => {
    if (acceptedFileTypes.length === 0) return true;
    
    return acceptedFileTypes.some(type => {
      // Handle wildcard file types (e.g., "audio/*")
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return file.type.startsWith(`${category}/`);
      }
      
      return file.type === type;
    });
  }, [acceptedFileTypes]);
  
  const validateFileSize = useCallback((file: File): boolean => {
    if (!maxFileSize) return true;
    return file.size <= maxFileSize;
  }, [maxFileSize]);
  
  const validateFiles = useCallback((filesToValidate: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of filesToValidate) {
      // Check file type
      if (!validateFileType(file)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an accepted file type.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size
      if (!validateFileSize(file)) {
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
  }, [validateFileType, validateFileSize, validateFile]);
  
  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);
  
  const handleDrop = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Limit files if multiple is false
    const filesToProcess = multiple ? droppedFiles : [droppedFiles[0]];
    
    // Validate files
    const validFiles = validateFiles(filesToProcess);
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => multiple ? [...prevFiles, ...validFiles] : validFiles);
      if (onDrop) {
        onDrop(validFiles);
      }
    }
  }, [multiple, validateFiles, onDrop]);
  
  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);
  
  const removeFile = useCallback((fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  }, []);
  
  return {
    isDragging,
    files,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    clearFiles,
    removeFile
  };
}
