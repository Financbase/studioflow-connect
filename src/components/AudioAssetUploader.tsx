
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import UploadForm from './audio/UploadForm';
import FilePreview from './audio/FilePreview';

interface AudioAssetUploaderProps {
  onUploadComplete?: (asset: any) => void;
}

const AudioAssetUploader: React.FC<AudioAssetUploaderProps> = ({ onUploadComplete }) => {
  const { user } = useAuth();
  const { themeVariant } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an audio file
      if (!selectedFile.type.startsWith('audio/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an audio file',
          variant: 'destructive',
        });
        return;
      }
      
      // Check if file is too large (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Audio file must be less than 10MB',
          variant: 'destructive',
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file || !user) return;
    
    try {
      setUploading(true);
      setProgress(0);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from('audio_assets')
        .upload(filePath, file, {
          cacheControl: '3600',
        });
        
      if (storageError) {
        throw storageError;
      }
      
      // Manually update progress since we can't use onUploadProgress
      setProgress(100);
      
      // Create a record in the audio_assets table
      const { data: assetData, error: assetError } = await supabase
        .from('audio_assets')
        .insert({
          user_id: user.id,
          name: file.name,
          storage_path: filePath,
          type: file.type,
          size: file.size,
        })
        .select()
        .single();
        
      if (assetError) {
        throw assetError;
      }
      
      toast({
        title: 'Upload successful',
        description: 'Your audio file has been uploaded',
      });
      
      if (onUploadComplete) {
        onUploadComplete(assetData);
      }
      
      // Reset state
      setFile(null);
      
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setFile(null);
  };

  return (
    <div className={`p-4 border rounded-md bg-card ${themeVariant === "windows" ? "rounded-none" : ""}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload Audio</h3>
        
        {!file ? (
          <UploadForm 
            onFileChange={handleFileChange}
            uploading={uploading}
          />
        ) : (
          <FilePreview
            file={file}
            progress={progress}
            uploading={uploading}
            onCancelClick={handleCancelUpload}
            onUploadClick={uploadFile}
          />
        )}
      </div>
    </div>
  );
};

export default AudioAssetUploader;
