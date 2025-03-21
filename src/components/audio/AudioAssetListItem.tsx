
import React from 'react';
import { AudioAsset } from '@/types/supabase';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Info } from 'lucide-react';
import { downloadAudioAsset } from './audioAssetUtils';
import DeleteAudioDialog from './DeleteAudioDialog';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatFileSize, formatFileType } from '@/lib/audioUtils';

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
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(asset);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(asset);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadAudioAsset(asset);
  };

  const dateCreated = asset.created_at
    ? formatDistanceToNow(new Date(asset.created_at), { addSuffix: true })
    : 'Unknown';

  return (
    <TableRow
      onClick={handleSelect}
      className={onSelect ? 'cursor-pointer hover:bg-secondary/50' : ''}
    >
      <TableCell className="font-medium">{asset.name}</TableCell>
      <TableCell>{formatFileType(asset.type)}</TableCell>
      <TableCell>{formatFileSize(asset.size)}</TableCell>
      <TableCell>{dateCreated}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handlePlay}>
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPlaying ? 'Pause' : 'Play'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Download
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {onSelect && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleSelect(); }}>
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Analyze Audio
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
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
