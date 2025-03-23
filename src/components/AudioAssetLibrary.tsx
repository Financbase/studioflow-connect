
import React, { useState, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AudioAsset } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Music } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAudioAssets } from '@/hooks/use-audio-assets';
import AudioPlayer from './audio/AudioPlayer';
import AudioAssetUploader from './AudioAssetUploader';
import AudioAssetList from './audio/AudioAssetList';

interface AudioAssetLibraryProps {
  onSelectAudio?: (asset: AudioAsset) => void;
  filterType?: string;
}

const AudioAssetLibrary: React.FC<AudioAssetLibraryProps> = ({ onSelectAudio, filterType = "all" }) => {
  const { user } = useAuth();
  const { themeVariant } = useTheme();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { assets, loading, refreshAssets } = useAudioAssets(user);
  
  // Filter assets based on filterType
  const filteredAssets = filterType === "all" 
    ? assets 
    : assets.filter(asset => asset.type === filterType);

  const handleSelectAudio = (asset: AudioAsset) => {
    if (onSelectAudio) {
      onSelectAudio(asset);
      setCurrentlyPlaying(asset.id);
      toast({
        title: "Audio selected",
        description: `Selected "${asset.name}" for analysis`,
      });
    }
  };

  const handleAudioEnded = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <div className="space-y-6">
      <AudioPlayer audioRef={audioRef} onEnded={handleAudioEnded} />
      
      <AudioAssetUploader onUploadComplete={() => refreshAssets()} />
      
      <Card className={themeVariant === "windows" ? "rounded-none" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Music className="w-5 h-5 mr-2" />
            Audio Library {filterType !== "all" ? `- ${filterType}s` : ""}
          </CardTitle>
          <CardDescription>
            Manage your audio files and recordings
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AudioAssetList
            assets={filteredAssets}
            loading={loading}
            onSelectAudio={handleSelectAudio}
            currentlyPlaying={currentlyPlaying}
            audioRef={audioRef}
            onRefresh={refreshAssets}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredAssets.length} audio {filteredAssets.length === 1 ? 'file' : 'files'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudioAssetLibrary;
