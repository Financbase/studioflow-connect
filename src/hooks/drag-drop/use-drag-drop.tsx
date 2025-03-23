
import { useState, useCallback } from 'react';
import { useDragDropEvents } from './use-drag-drop-events';
import { useDragDropValidation } from './use-drag-drop-validation';

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
  
  const [files, setFiles] = useState<File[]>([]);
  
  // Initialize validation hook
  const { validateFiles } = useDragDropValidation({
    acceptedFileTypes,
    maxFileSize,
    validateFile
  });
  
  // Process the dropped files
  const processDroppedFiles = useCallback((droppedFiles: File[]) => {
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => multiple ? [...prevFiles, ...validFiles] : validFiles);
      if (onDrop) {
        onDrop(validFiles);
      }
    }
    
    return validFiles;
  }, [validateFiles, multiple, onDrop]);
  
  // Initialize event handlers
  const { 
    isDragging, 
    handleDragEnter, 
    handleDragLeave, 
    handleDragOver, 
    handleDrop 
  } = useDragDropEvents({
    onDropCallback: onDrop,
    processFiles: processDroppedFiles,
    multiple
  });
  
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
