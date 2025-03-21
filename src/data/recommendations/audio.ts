
import { Recommendation } from "@/types/recommendation";
import { WaveformIcon, Music, Ear } from "lucide-react";

export const audioRecommendations: Recommendation[] = [
  {
    id: "audio-1",
    title: "Multi-Reference Comparison Engine",
    description: "Compare mixes against multiple reference tracks with statistical aggregation to identify trends.",
    category: "sounds",
    requiredTier: "free",
    icon: WaveformIcon,
    actionLabel: "Compare References"
  },
  {
    id: "audio-2",
    title: "Genre-Adaptive Visualization",
    description: "Automatically adjusts spectral display based on genre recognition, highlighting critical frequency ranges.",
    category: "sounds",
    requiredTier: "standard",
    icon: Music,
    actionLabel: "Visualize Spectrum"
  },
  {
    id: "audio-3",
    title: "Platform-Specific Mastering Preview",
    description: "Simulates how audio will sound across different streaming platforms with their specific encoding algorithms.",
    category: "sounds",
    requiredTier: "pro",
    icon: Ear,
    actionLabel: "Preview Platforms"
  },
  {
    id: "audio-4",
    title: "Arrangement Structure Recognition",
    description: "Automatically identifies song sections based on spectral and rhythmic patterns.",
    category: "sounds",
    requiredTier: "standard",
    icon: Music,
    actionLabel: "Analyze Structure"
  },
  {
    id: "audio-5",
    title: "Contextual EQ Recommendations",
    description: "Suggests precise EQ adjustments based on instrument recognition and its role in the current mix.",
    category: "sounds",
    requiredTier: "pro",
    icon: WaveformIcon,
    actionLabel: "Get EQ Suggestions"
  },
  {
    id: "audio-6",
    title: "Spatial Analysis Tools",
    description: "Visualizes stereo field, phase relationships, and immersive audio positioning with guidance for optimal placement.",
    category: "sounds",
    requiredTier: "standard",
    icon: Ear,
    actionLabel: "Analyze Spatial Field"
  },
  {
    id: "audio-7",
    title: "Temporal Pattern Recognition",
    description: "Identifies rhythmic patterns in spectral content to help analyze groove, note timing, and dynamic consistency across similar sections.",
    category: "sounds",
    requiredTier: "pro",
    icon: Music,
    actionLabel: "Analyze Patterns"
  },
  {
    id: "audio-8",
    title: "Harmonic Suggestion Engine",
    description: "Analyzes existing harmonic content to suggest complementary chord progressions, bass lines, or melodic elements.",
    category: "sounds",
    requiredTier: "standard",
    icon: Music,
    actionLabel: "Get Suggestions"
  },
  {
    id: "audio-9",
    title: "Instrument Balance Coach",
    description: "Provides feedback on mix balance using machine learning models trained on successful mixes within similar genres.",
    category: "sounds",
    requiredTier: "pro",
    icon: WaveformIcon,
    actionLabel: "Check Balance"
  },
  {
    id: "audio-10",
    title: "Dynamic Contour Visualization",
    description: "Maps the emotional energy curve of a song based on dynamic range, instrumentation density, and frequency content over time.",
    category: "sounds",
    requiredTier: "standard",
    icon: WaveformIcon,
    actionLabel: "Visualize Dynamics"
  }
];
