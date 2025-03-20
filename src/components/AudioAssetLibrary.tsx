
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { AudioAsset } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Music } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import AudioAssetUploader from './AudioAssetUploader';
import AudioAssetList from './audio/AudioAssetList';

interface AudioAssetLibraryProps {
  onSelectAudio?: (asset: AudioAsset) => void;
}

const AudioAssetLibrary: React.FC<AudioAssetLibraryProps> = ({ onSelectAudio }) => {
  const { user } = useAuth();
  const { themeVariant } = useTheme();
  const [assets, setAssets] = useState<AudioAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const fetchAssets = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('audio_assets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setAssets(data || []);
      
    } catch (error: any) {
      toast({
        title: 'Error fetching assets',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audio_assets',
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          fetchAssets();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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

  return (
    <div className="space-y-6">
      <audio 
        ref={audioRef} 
        onEnded={() => setCurrentlyPlaying(null)} 
        className="hidden" 
      />
      
      <AudioAssetUploader onUploadComplete={() => fetchAssets()} />
      
      <Card className={themeVariant === "windows" ? "rounded-none" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Music className="w-5 h-5 mr-2" />
            Audio Library
          </CardTitle>
          <CardDescription>
            Manage your audio files and recordings
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AudioAssetList
            assets={assets}
            loading={loading}
            onSelectAudio={handleSelectAudio}
            currentlyPlaying={currentlyPlaying}
            audioRef={audioRef}
            onRefresh={fetchAssets}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {assets.length} audio {assets.length === 1 ? 'file' : 'files'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudioAssetLibrary;
