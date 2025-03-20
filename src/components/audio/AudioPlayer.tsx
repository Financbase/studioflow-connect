
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const useAudioPlayer = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const playAudio = async (asset: AudioAsset) => {
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

  return { playAudio };
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef }) => {
  return (
    <audio 
      ref={audioRef} 
      onEnded={() => {/* Handle end of playback */}} 
      className="hidden" 
    />
  );
};

export default AudioPlayer;
