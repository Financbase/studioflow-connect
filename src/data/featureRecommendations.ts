
import { Recommendation } from "@/components/FeatureRecommendation";

type FeatureRecommendations = {
  [key: string]: Recommendation[];
};

export const recommendations: FeatureRecommendations = {
  system: [
    {
      title: "Adaptive CPU Prioritization",
      description: "Automatically shifts CPU resources to the most active plugin chains during playback and recording.",
      requiredTier: "standard"
    },
    {
      title: "Smart Memory Management",
      description: "Implements memory compression for older 32-bit plugins to reduce their footprint while maintaining fast access.",
      requiredTier: "standard"
    },
    {
      title: "Project-Specific Resource Profiles",
      description: "Create and save optimized resource profiles for different project types (mixing vs. tracking sessions).",
      requiredTier: "pro"
    },
    {
      title: "Component-Level Metrics",
      description: "Granular monitoring of individual plugin instances with visual alerts for problematic plugins.",
      requiredTier: "standard"
    },
    {
      title: "Historical Usage Patterns",
      description: "Track resource usage across sessions to identify problematic setups or performance trends.",
      requiredTier: "pro"
    }
  ],
  vm: [
    {
      title: "Differential Snapshotting",
      description: "Maintains lightweight snapshots of VM states that can be instantly restored, perfect for A/B testing plugins.",
      requiredTier: "pro"
    },
    {
      title: "Unified Plugin Database",
      description: "Cross-platform database of plugins that tracks compatibility, version history, and known issues.",
      requiredTier: "pro"
    },
    {
      title: "DAW-Specific VM Templates",
      description: "Pre-configured VM environments optimized for specific DAWs with recommended settings.",
      requiredTier: "standard"
    },
    {
      title: "Plugin Validation Workflow",
      description: "Automatically test newly installed plugins in a sandboxed environment before integration.",
      requiredTier: "pro"
    },
    {
      title: "Environment Comparison Tools",
      description: "Visually compare settings between environments to diagnose performance differences.",
      requiredTier: "standard"
    }
  ],
  daw: [
    {
      title: "Semantic Project Translation",
      description: "Preserves creative intent when moving between DAWs, maintaining relationships between tracks.",
      requiredTier: "standard"
    },
    {
      title: "Plugin State Matching",
      description: "When a native plugin isn't available in the target DAW, finds the closest match with similar settings.",
      requiredTier: "pro"
    },
    {
      title: "Command Context Analysis",
      description: "Suggests optimized keyboard shortcuts based on frequency of operations and ergonomic factors.",
      requiredTier: "standard"
    },
    {
      title: "Process Mining for Workflows",
      description: "Analyzes repeated sequences of actions to suggest macros that could reduce repetitive tasks.",
      requiredTier: "pro"
    },
    {
      title: "Focus Mode Configurations",
      description: "Customized workspace layouts that show only relevant tools for specific tasks to reduce cognitive load.",
      requiredTier: "standard"
    }
  ],
  audio: [
    {
      title: "Multi-Reference Comparison Engine",
      description: "Compare mixes against multiple reference tracks with statistical aggregation to identify trends.",
      requiredTier: "free"
    },
    {
      title: "Genre-Adaptive Visualization",
      description: "Automatically adjusts spectral display based on genre recognition, highlighting critical frequency ranges.",
      requiredTier: "standard"
    },
    {
      title: "Platform-Specific Mastering Preview",
      description: "Simulates how audio will sound across different streaming platforms with their specific encoding algorithms.",
      requiredTier: "pro"
    },
    {
      title: "Arrangement Structure Recognition",
      description: "Automatically identifies song sections based on spectral and rhythmic patterns.",
      requiredTier: "standard"
    },
    {
      title: "Contextual EQ Recommendations",
      description: "Suggests precise EQ adjustments based on instrument recognition and its role in the current mix.",
      requiredTier: "pro"
    }
  ],
  ai: [
    {
      title: "Style-Adaptive Composition",
      description: "Creates musical elements that match the stylistic nuances of your project rather than generic patterns.",
      requiredTier: "standard"
    },
    {
      title: "Multi-Instrument Arrangement",
      description: "Generates complementary parts for multiple instruments that work together harmonically and rhythmically.",
      requiredTier: "pro"
    },
    {
      title: "Contextual Fill Generation",
      description: "Analyzes spaces between musical elements to suggest fills, transitions, and ornamentations.",
      requiredTier: "standard"
    },
    {
      title: "Productivity Pattern Analysis",
      description: "Tracks when users accomplish their most effective work to suggest optimal times for creative tasks.",
      requiredTier: "pro"
    },
    {
      title: "Progressive Learning Interface",
      description: "Gradually introduces advanced techniques as users master basics, creating a personalized learning curve.",
      requiredTier: "standard"
    }
  ],
  marketplace: [
    {
      title: "Interactive Trial Workspaces",
      description: "Test marketplace items within a functional project context before purchasing.",
      requiredTier: "free"
    },
    {
      title: "Collaborative Licensing Models",
      description: "Enables multiple contributors to share revenue when selling collaborative templates or presets.",
      requiredTier: "pro"
    },
    {
      title: "Contextual Recommendations",
      description: "Suggests marketplace items based on your current project needs, DAW choice, and production style.",
      requiredTier: "standard"
    },
    {
      title: "Product Development Pipeline",
      description: "Guides creators through developing marketplace items from concept to release with templates.",
      requiredTier: "pro"
    },
    {
      title: "Community Beta Testing",
      description: "Connects creators with willing beta testers who match their target user profile.",
      requiredTier: "standard"
    }
  ]
};
