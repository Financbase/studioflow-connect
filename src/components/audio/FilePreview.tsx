
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { File, X, Upload } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  progress: number;
  uploading: boolean;
  onCancelClick: () => void;
  onUploadClick: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ 
  file, 
  progress, 
  uploading, 
  onCancelClick, 
  onUploadClick 
}) => {
  return (
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
          onClick={onCancelClick}
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
          onClick={onCancelClick}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          onClick={onUploadClick}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default FilePreview;
