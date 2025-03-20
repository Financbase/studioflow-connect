
import React from 'react';
import AudioAnalysis from './AudioAnalysis';
import { AudioAsset } from '@/types/supabase';

interface AudioAnalysisTabProps {
  selectedAudioFile: AudioAsset | null;
}

const AudioAnalysisTab: React.FC<AudioAnalysisTabProps> = ({ selectedAudioFile }) => {
  if (!selectedAudioFile) {
    return (
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Audio Analysis</h3>
        <p className="text-muted-foreground">
          Select an audio file from your library to analyze its frequency spectrum, 
          dynamics, and other audio characteristics.
        </p>
      </div>
    );
  }
  
  return <AudioAnalysis audioFile={selectedAudioFile} />;
};

export default AudioAnalysisTab;
