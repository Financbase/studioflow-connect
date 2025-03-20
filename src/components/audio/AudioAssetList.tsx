
import React from 'react';
import { AudioAsset } from '@/types/supabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Music } from 'lucide-react';
import AudioAssetListItem from './AudioAssetListItem';
import { useAudioPlayer } from '@/hooks/use-audio-player';

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
  const { playAudio } = useAudioPlayer(audioRef);

  const handlePlay = (asset: AudioAsset) => {
    playAudio(asset);
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
              onSelect={onSelectAudio}
              onRefresh={onRefresh}
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

export default AudioAssetList;
