
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AudioAssetListItem from './AudioAssetListItem';

interface AudioAssetListProps {
  assets: AudioAsset[];
  loading: boolean;
  onSelectAudio?: (asset: AudioAsset) => void;
  currentlyPlaying: string | null;
  audioRef: React.RefObject<HTMLAudioElement>;
  onRefresh: () => void;
}

const AudioAssetList: React.FC<AudioAssetListProps> = ({
  assets,
  loading,
  onSelectAudio,
  currentlyPlaying,
  audioRef,
  onRefresh
}) => {
  const handlePlay = async (asset: AudioAsset) => {
    try {
      const { data, error } = await supabase.storage
        .from('audio_assets')
        .createSignedUrl(asset.storage_path, 60);
        
      if (error) {
        throw error;
      }
      
      if (audioRef.current) {
        audioRef.current.src = data.signedUrl;
        audioRef.current.play();
      }
      
    } catch (error: any) {
      toast({
        title: 'Error playing audio',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = async (asset: AudioAsset) => {
    try {
      const { data, error } = await supabase.storage
        .from('audio_assets')
        .createSignedUrl(asset.storage_path, 60);
        
      if (error) {
        throw error;
      }
      
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = asset.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error: any) {
      toast({
        title: 'Error downloading audio',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (asset: AudioAsset) => {
    if (!confirm('Are you sure you want to delete this audio file?')) {
      return;
    }
    
    try {
      const { error: storageError } = await supabase.storage
        .from('audio_assets')
        .remove([asset.storage_path]);
        
      if (storageError) {
        throw storageError;
      }
      
      const { error: dbError } = await supabase
        .from('audio_assets')
        .delete()
        .eq('id', asset.id);
        
      if (dbError) {
        throw dbError;
      }
      
      onRefresh();
      
      toast({
        title: 'Asset deleted',
        description: 'Audio file has been deleted',
      });
      
    } catch (error: any) {
      toast({
        title: 'Error deleting asset',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Loading assets...</p>
      </div>
    );
  }

  if (assets.length === 0) {
    return <AudioAssetEmptyState />;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {assets.map((asset) => (
            <AudioAssetListItem
              key={asset.id}
              asset={asset}
              isPlaying={currentlyPlaying === asset.id}
              onPlay={handlePlay}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onSelect={onSelectAudio}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Empty state component
const AudioAssetEmptyState = () => (
  <div className="py-8 text-center">
    <Music className="w-12 h-12 mx-auto text-muted-foreground opacity-25 mb-3" />
    <p className="text-muted-foreground">No audio files found</p>
    <p className="text-sm text-muted-foreground mt-1">
      Upload your first audio file to get started
    </p>
  </div>
);

// Import the Music icon to use in the empty state
import { Music } from 'lucide-react';

export default AudioAssetList;
