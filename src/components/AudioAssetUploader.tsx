
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Upload, X, File, Music } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
      
      // Upload file to Supabase Storage - Fixed: Removed onUploadProgress
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

  return (
    <div className={`p-4 border rounded-md bg-card ${themeVariant === "windows" ? "rounded-none" : ""}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload Audio</h3>
        
        {!file ? (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="audio-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-muted cursor-pointer hover:border-primary transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-1">
                <Music className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop an audio file, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  MP3, WAV, FLAC (max 10MB)
                </p>
              </div>
              <Input
                id="audio-upload"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded bg-muted/50">
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFile(null)}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  Uploading... {progress}%
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setFile(null)}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={uploadFile}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioAssetUploader;
