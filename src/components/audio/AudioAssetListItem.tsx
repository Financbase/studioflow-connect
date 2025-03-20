
import React from 'react';
import { AudioAsset } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Play, Trash, Download, MoreVertical } from 'lucide-react';

interface AudioAssetListItemProps {
  asset: AudioAsset;
  isPlaying: boolean;
  onPlay: (asset: AudioAsset) => void;
  onDownload: (asset: AudioAsset) => void;
  onDelete: (asset: AudioAsset) => void;
  onSelect?: (asset: AudioAsset) => void;
}

const AudioAssetListItem: React.FC<AudioAssetListItemProps> = ({
  asset,
  isPlaying,
  onPlay,
  onDownload,
  onDelete,
  onSelect
}) => {
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <TableRow 
      className={onSelect ? "cursor-pointer hover:bg-accent/50" : ""}
      onClick={onSelect ? () => onSelect(asset) : undefined}
    >
      <TableCell className="font-medium">{asset.name}</TableCell>
      <TableCell>{asset.type.split('/')[1].toUpperCase()}</TableCell>
      <TableCell>{formatFileSize(asset.size)}</TableCell>
      <TableCell>{formatDate(asset.created_at)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(asset);
            }}
            className={isPlaying ? "text-primary" : ""}
          >
            <Play className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(asset);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(asset);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AudioAssetListItem;
