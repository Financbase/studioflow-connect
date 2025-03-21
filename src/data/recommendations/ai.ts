
import { Recommendation } from "@/types/recommendation";
import { BrainCircuit, Sparkles, Mic2 } from "lucide-react";

export const aiRecommendations: Recommendation[] = [
  {
    id: "ai-1",
    title: "Style-Adaptive Composition",
    description: "Creates musical elements that match the stylistic nuances of your project rather than generic patterns.",
    category: "ai",
    requiredTier: "standard",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    actionLabel: "Generate Composition"
  },
  {
    id: "ai-2",
    title: "Multi-Instrument Arrangement",
    description: "Generates complementary parts for multiple instruments that work together harmonically and rhythmically.",
    category: "ai",
    requiredTier: "pro",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    actionLabel: "Generate Arrangement"
  },
  {
    id: "ai-3",
    title: "Contextual Fill Generation",
    description: "Analyzes spaces between musical elements to suggest fills, transitions, and ornamentations.",
    category: "ai",
    requiredTier: "standard",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    actionLabel: "Generate Fills"
  },
  {
    id: "ai-4",
    title: "Productivity Pattern Analysis",
    description: "Tracks when users accomplish their most effective work to suggest optimal times for creative tasks.",
    category: "ai",
    requiredTier: "pro",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    actionLabel: "Analyze Patterns"
  },
  {
    id: "ai-5",
    title: "Progressive Learning Interface",
    description: "Gradually introduces advanced techniques as users master basics, creating a personalized learning curve.",
    category: "ai",
    requiredTier: "standard",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    actionLabel: "Start Learning"
  },
  {
    id: "ai-6",
    title: "Sound Design Evolution",
    description: "Generates evolving sound design elements that develop over time based on arrangement landmarks detected in the project.",
    category: "ai",
    requiredTier: "pro",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    actionLabel: "Generate Sounds"
  },
  {
    id: "ai-7",
    title: "Character-Based Lyrics",
    description: "Creates lyric suggestions based on defined character personas, storytelling arc, and emotional progression.",
    category: "ai",
    requiredTier: "standard",
    icon: <Mic2 className="h-5 w-5 text-primary" />,
    actionLabel: "Generate Lyrics"
  },
  {
    id: "ai-8",
    title: "Adaptive Session Planning",
    description: "Recommends session structures based on available time, project deadlines, and historical time spent on similar tasks.",
    category: "ai",
    requiredTier: "pro",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    actionLabel: "Plan Session"
  },
  {
    id: "ai-9",
    title: "Contextual Voice Commands",
    description: "Provides a voice control system that understands DAW-specific terminology and can execute complex command chains.",
    category: "ai",
    requiredTier: "standard",
    icon: <Mic2 className="h-5 w-5 text-primary" />,
    actionLabel: "Enable Voice Control"
  },
  {
    id: "ai-10",
    title: "Decision Fatigue Reduction",
    description: "Identifies when users are experiencing decision fatigue and suggests either breaks or simplifies choices.",
    category: "ai",
    requiredTier: "pro",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    actionLabel: "Analyze Workflow"
  }
];
