
import React from 'react';
import AudioAssetLibrary from '../AudioAssetLibrary';
import { AudioAsset } from '@/types/supabase';
import { Panel } from '../ui/panel';

interface AudioLibraryTabProps {
  onSelectAudio?: (audioAsset: AudioAsset) => void;
  filterType?: string;
}

const AudioLibraryTab: React.FC<AudioLibraryTabProps> = ({ onSelectAudio, filterType = "all" }) => {
  return (
    <Panel variant="elevated">
      <AudioAssetLibrary onSelectAudio={onSelectAudio} filterType={filterType} />
    </Panel>
  );
};

export default AudioLibraryTab;
