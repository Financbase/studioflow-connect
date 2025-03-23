
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useUploadProgress } from '@/hooks/use-upload-progress';
import { useFileValidation } from '@/hooks/use-file-validation';
import { useUploadError } from '@/hooks/use-upload-error';

export interface FileUploadOptions {
  bucketName: string;
  folderPath?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  onUploadStart?: (files: File[]) => void;
  onUploadProgress?: (progress: number, file: File) => void;
  onUploadComplete?: (result: UploadResult[]) => void;
  onUploadError?: (error: Error, file: File) => void;
}

export interface UploadResult {
  file: File;
  success: boolean;
  path?: string;
  error?: string;
  data?: any;
}

export function useFileUpload(options: FileUploadOptions) {
  const {
    bucketName,
    folderPath = '',
    allowedFileTypes = [],
    maxFileSize,
    onUploadStart,
    onUploadProgress,
    onUploadComplete,
    onUploadError
  } = options;
  
  const [results, setResults] = useState<UploadResult[]>([]);
  const { isUploading, uploadProgress, startUpload, updateProgress, completeUpload, resetProgress } = useUploadProgress();
  const { validateFile, validateFiles } = useFileValidation({ allowedFileTypes, maxFileSize });
  const { error, handleError, clearError } = useUploadError();
  
  const resetState = useCallback(() => {
    resetProgress();
    setResults([]);
    clearError();
  }, [resetProgress, clearError]);
  
  const uploadFiles = useCallback(async (files: File[]): Promise<UploadResult[]> => {
    if (files.length === 0) return [];
    
    startUpload();
    const uploadResults: UploadResult[] = [];
    
    if (onUploadStart) {
      onUploadStart(files);
    }
    
    // Validate all files first
    const validFiles = validateFiles(files);
    
    // Add validation failures to results
    const invalidFiles = files.filter(file => !validFiles.includes(file));
    for (const file of invalidFiles) {
      const validationError = validateFile(file);
      uploadResults.push({
        file,
        success: false,
        error: validationError || 'Validation failed'
      });
      
      if (onUploadError && validationError) {
        onUploadError(new Error(validationError), file);
      }
    }
    
    // Upload all valid files
    for (const file of validFiles) {
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      
      try {
        // Upload file to Supabase storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        // Update progress to 100% when complete since Supabase doesn't use onUploadProgress
        updateProgress(filePath, 100);
        if (onUploadProgress) {
          onUploadProgress(100, file);
        }
        
        if (error) {
          throw error;
        }
        
        // File uploaded successfully
        uploadResults.push({
          file,
          success: true,
          path: filePath,
          data
        });
        
      } catch (error: any) {
        console.error(`Error uploading ${file.name}:`, error);
        
        uploadResults.push({
          file,
          success: false,
          error: error.message || 'Upload failed'
        });
        
        if (onUploadError) {
          onUploadError(error, file);
        }
        
        handleError(error, file.name);
      }
    }
    
    setResults(uploadResults);
    completeUpload();
    
    if (onUploadComplete) {
      onUploadComplete(uploadResults);
    }
    
    return uploadResults;
  }, [
    bucketName, 
    folderPath, 
    validateFiles, 
    validateFile, 
    startUpload, 
    updateProgress, 
    completeUpload, 
    onUploadStart, 
    onUploadProgress, 
    onUploadComplete, 
    onUploadError,
    handleError
  ]);
  
  const getUploadUrl = useCallback(async (path: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(path, 60 * 60); // 1 hour expiry
      
      if (error) {
        throw error;
      }
      
      return data.signedUrl;
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return null;
    }
  }, [bucketName]);
  
  const deleteFile = useCallback(async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([path]);
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }, [bucketName]);
  
  return {
    isUploading,
    uploadProgress,
    results,
    uploadFiles,
    getUploadUrl,
    deleteFile,
    resetState
  };
}
