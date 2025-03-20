
import React from 'react';
import { Input } from '@/components/ui/input';
import { Music } from 'lucide-react';

interface UploadFormProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFileChange, uploading }) => {
  return (
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
          onChange={onFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default UploadForm;
