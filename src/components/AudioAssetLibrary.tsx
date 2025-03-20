import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { AudioAsset } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Play, Trash, Music, Download, MoreVertical } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import AudioAssetUploader from './AudioAssetUploader';

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
        setCurrentlyPlaying(asset.id);
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
      
      setAssets(assets.filter(a => a.id !== asset.id));
      
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

  const handleSelectAudio = (asset: AudioAsset) => {
    if (onSelectAudio) {
      onSelectAudio(asset);
      toast({
        title: "Audio selected",
        description: `Selected "${asset.name}" for analysis`,
      });
    }
  };

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
    <div className="space-y-6">
      <audio ref={audioRef} onEnded={() => setCurrentlyPlaying(null)} className="hidden" />
      
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
          {loading ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Loading assets...</p>
            </div>
          ) : assets.length === 0 ? (
            <div className="py-8 text-center">
              <Music className="w-12 h-12 mx-auto text-muted-foreground opacity-25 mb-3" />
              <p className="text-muted-foreground">No audio files found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Upload your first audio file to get started
              </p>
            </div>
          ) : (
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
                    <TableRow 
                      key={asset.id}
                      className={onSelectAudio ? "cursor-pointer hover:bg-accent/50" : ""}
                      onClick={onSelectAudio ? () => handleSelectAudio(asset) : undefined}
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
                              handlePlay(asset);
                            }}
                            className={currentlyPlaying === asset.id ? "text-primary" : ""}
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
                                  handleDownload(asset);
                                }}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(asset);
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
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
