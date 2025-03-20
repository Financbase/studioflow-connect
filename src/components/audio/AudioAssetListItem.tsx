
import React from 'react';
import { AudioAsset } from '@/types/supabase';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download } from 'lucide-react';
import { downloadAudioAsset } from './audioAssetUtils';
import DeleteAudioDialog from './DeleteAudioDialog';
import { formatDistanceToNow } from 'date-fns';

interface AudioAssetListItemProps {
  asset: AudioAsset;
  isPlaying: boolean;
  onPlay: (asset: AudioAsset) => void;
  onSelect?: (asset: AudioAsset) => void;
  onRefresh: () => void;
}

const AudioAssetListItem: React.FC<AudioAssetListItemProps> = ({
  asset,
  isPlaying,
  onPlay,
  onSelect,
  onRefresh
}) => {
  const handlePlay = () => {
    onPlay(asset);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(asset);
    }
  };

  const handleDownload = () => {
    downloadAudioAsset(asset);
  };

  const formattedSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const dateCreated = asset.created_at
    ? formatDistanceToNow(new Date(asset.created_at), { addSuffix: true })
    : 'Unknown';

  return (
    <TableRow
      onClick={handleSelect}
      className={onSelect ? 'cursor-pointer hover:bg-secondary/50' : ''}
    >
      <TableCell>{asset.name}</TableCell>
      <TableCell>{asset.type.split('/')[1].toUpperCase()}</TableCell>
      <TableCell>{formattedSize(asset.size)}</TableCell>
      <TableCell>{dateCreated}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={handlePlay}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <DeleteAudioDialog 
            asset={asset} 
            onDeleted={onRefresh}
            variant="icon" 
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AudioAssetListItem;
