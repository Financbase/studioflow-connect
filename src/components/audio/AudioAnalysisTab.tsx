
import React from 'react';
import AudioAnalysis from './AudioAnalysis';
import { AudioAsset } from '@/types/supabase';
import { Music } from 'lucide-react';
import { Panel } from '../ui/panel';

interface AudioAnalysisTabProps {
  selectedAudioFile: AudioAsset | null;
}

const AudioAnalysisTab: React.FC<AudioAnalysisTabProps> = ({ selectedAudioFile }) => {
  if (!selectedAudioFile) {
    return (
      <Panel className="p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Music className="w-16 h-16 text-muted-foreground opacity-25 mb-4" />
          <h3 className="text-lg font-medium mb-2">Audio Analysis</h3>
          <p className="text-muted-foreground max-w-md">
            Select an audio file from your library to analyze its frequency spectrum, 
            dynamics, and other audio characteristics.
          </p>
        </div>
      </Panel>
    );
  }
  
  return <AudioAnalysis audioFile={selectedAudioFile} />;
};

export default AudioAnalysisTab;
