
import React from 'react';

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef, onEnded = () => {} }) => {
  return (
    <audio 
      ref={audioRef} 
      onEnded={onEnded} 
      className="hidden" 
    />
  );
};

export default AudioPlayer;
