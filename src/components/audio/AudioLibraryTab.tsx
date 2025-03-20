
import React from 'react';
import AudioAssetLibrary from '../AudioAssetLibrary';
import { AudioAsset } from '@/types/supabase';

interface AudioLibraryTabProps {
  onSelectAudio: (audioAsset: AudioAsset) => void;
}

const AudioLibraryTab: React.FC<AudioLibraryTabProps> = ({ onSelectAudio }) => {
  return <AudioAssetLibrary onSelectAudio={onSelectAudio} />;
};

export default AudioLibraryTab;
