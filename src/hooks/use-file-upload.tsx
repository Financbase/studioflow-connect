
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [results, setResults] = useState<UploadResult[]>([]);
  
  const resetState = useCallback(() => {
    setIsUploading(false);
    setUploadProgress({});
    setResults([]);
  }, []);
  
  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (allowedFileTypes.length > 0) {
      const isValidType = allowedFileTypes.some(type => {
        // Handle wildcard file types (e.g., "audio/*")
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return file.type.startsWith(`${category}/`);
        }
        return file.type === type;
      });
      
      if (!isValidType) {
        return `${file.name} is not an accepted file type.`;
      }
    }
    
    // Check file size
    if (maxFileSize && file.size > maxFileSize) {
      return `${file.name} exceeds the maximum file size.`;
    }
    
    return null;
  }, [allowedFileTypes, maxFileSize]);
  
  const uploadFiles = useCallback(async (files: File[]): Promise<UploadResult[]> => {
    if (files.length === 0) return [];
    
    setIsUploading(true);
    const newUploadProgress: Record<string, number> = {};
    const uploadResults: UploadResult[] = [];
    
    if (onUploadStart) {
      onUploadStart(files);
    }
    
    for (const file of files) {
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        uploadResults.push({
          file,
          success: false,
          error: validationError
        });
        
        if (onUploadError) {
          onUploadError(new Error(validationError), file);
        }
        
        continue;
      }
      
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      
      try {
        // Create an upload event handler that works with Supabase's API
        const handleProgress = (event: ProgressEvent) => {
          if (event.lengthComputable) {
            const progressValue = (event.loaded / event.total) * 100;
            newUploadProgress[filePath] = progressValue;
            setUploadProgress({ ...newUploadProgress });
            
            if (onUploadProgress) {
              onUploadProgress(progressValue, file);
            }
          }
        };

        // Upload file to Supabase storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        // Update progress to 100% when complete since Supabase doesn't use onUploadProgress
        newUploadProgress[filePath] = 100;
        setUploadProgress({ ...newUploadProgress });
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
        
        toast({
          title: "Upload failed",
          description: `Could not upload ${file.name}: ${error.message}`,
          variant: "destructive"
        });
      }
    }
    
    setResults(uploadResults);
    setIsUploading(false);
    
    if (onUploadComplete) {
      onUploadComplete(uploadResults);
    }
    
    return uploadResults;
  }, [bucketName, folderPath, validateFile, onUploadStart, onUploadProgress, onUploadComplete, onUploadError]);
  
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
