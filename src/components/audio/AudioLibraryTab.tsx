
import React from 'react';
import AudioAssetLibrary from '../AudioAssetLibrary';
import { AudioAsset } from '@/types/supabase';
import { Panel } from '../ui/panel';

interface AudioLibraryTabProps {
  onSelectAudio: (audioAsset: AudioAsset) => void;
}

const AudioLibraryTab: React.FC<AudioLibraryTabProps> = ({ onSelectAudio }) => {
  return (
    <Panel variant="elevated">
      <AudioAssetLibrary onSelectAudio={onSelectAudio} />
    </Panel>
  );
};

export default AudioLibraryTab;
