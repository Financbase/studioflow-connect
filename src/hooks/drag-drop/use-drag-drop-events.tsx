
import { useState, useEffect, useCallback, DragEvent } from 'react';

export interface DragDropEventHandlers {
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  isDragging: boolean;
}

export interface DragDropEventOptions {
  onDropCallback?: (files: File[]) => void;
  processFiles?: (files: File[]) => File[];
  multiple?: boolean;
}

/**
 * Hook for handling drag and drop events
 */
export function useDragDropEvents(options: DragDropEventOptions = {}): DragDropEventHandlers {
  const { onDropCallback, processFiles, multiple = false } = options;
  const [isDragging, setIsDragging] = useState(false);
  
  // Reset dragging state when component unmounts
  useEffect(() => {
    return () => {
      setIsDragging(false);
    };
  }, []);
  
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
    
    // Process files if callback provided
    if (processFiles) {
      const validFiles = processFiles(filesToProcess);
      
      if (validFiles.length > 0 && onDropCallback) {
        onDropCallback(validFiles);
      }
    } else if (onDropCallback) {
      onDropCallback(filesToProcess);
    }
  }, [multiple, processFiles, onDropCallback]);
  
  return {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop
  };
}
