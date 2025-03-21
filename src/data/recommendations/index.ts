
import { systemRecommendations } from './system';
import { vmRecommendations } from './vm';
import { dawRecommendations } from './daw';
import { audioRecommendations } from './audio';
import { aiRecommendations } from './ai';
import { marketplaceRecommendations } from './marketplace';
import { Recommendation } from '@/types/recommendation';

type FeatureRecommendations = {
  [key: string]: Recommendation[];
};

export const recommendations: FeatureRecommendations = {
  system: systemRecommendations,
  vm: vmRecommendations,
  daw: dawRecommendations,
  audio: audioRecommendations,
  ai: aiRecommendations,
  marketplace: marketplaceRecommendations
};
