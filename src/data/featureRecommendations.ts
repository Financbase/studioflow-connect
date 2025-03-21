
import { Recommendation } from "@/types/recommendation";

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
    },
    {
      title: "Hardware Accelerated Processing",
      description: "Automatically offloads compatible DSP processes to GPU for tasks like convolution reverb or spectral processing.",
      requiredTier: "standard"
    },
    {
      title: "Background Rendering Pipeline",
      description: "Intelligently pre-renders effect chains that don't require real-time interaction while keeping interactive elements responsive.",
      requiredTier: "standard"
    },
    {
      title: "I/O Performance Tracking",
      description: "Monitors disk read/write speeds for sample streaming, buffer underruns, and suggests optimal sample rate/bit depth settings.",
      requiredTier: "standard"
    },
    {
      title: "Network Performance Analysis",
      description: "For collaborative sessions, monitors latency, packet loss, and bandwidth utilization with automatic quality adjustment recommendations.",
      requiredTier: "pro"
    },
    {
      title: "Environment Variables Monitoring",
      description: "Tracks system-level variables like temperature, power draw, and disk fragmentation that might impact audio performance.",
      requiredTier: "standard"
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
    },
    {
      title: "Distributed Processing Network",
      description: "Links multiple VMs for parallel processing, allowing projects to distribute CPU-intensive plugins across several virtualized systems.",
      requiredTier: "pro"
    },
    {
      title: "Hardware Abstraction Layer",
      description: "Provides consistent access to audio interfaces and controllers across different VM environments through a universal driver translation layer.",
      requiredTier: "standard"
    },
    {
      title: "VM Resource Scheduling",
      description: "Allocates system resources to different VMs based on active task priorities, scaling up resources for rendering VMs.",
      requiredTier: "pro"
    },
    {
      title: "OS Configuration Wizards",
      description: "Provides guided setup of OS-level parameters critical for audio work with one-click application.",
      requiredTier: "standard"
    },
    {
      title: "Periodic Optimization Scans",
      description: "Runs scheduled analysis of VM environments to detect fragmentation, driver conflicts, or other performance degrading factors.",
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
    },
    {
      title: "Automation Curve Preservation",
      description: "Maintains precise automation data even when moving between DAWs with different automation curve implementations or resolution.",
      requiredTier: "standard"
    },
    {
      title: "Asset Relationship Mapping",
      description: "Preserves relationships between tracks (sends, groups, VCAs) even when the routing architecture differs between DAWs.",
      requiredTier: "pro"
    },
    {
      title: "Mix Calibration Tools",
      description: "Ensures consistent output levels and frequency response when moving projects between different DAW summing engines.",
      requiredTier: "standard"
    },
    {
      title: "Session Setup Blueprints",
      description: "Creates comprehensive templates that include not just track structure but also window layouts, controller mappings, and plugin chains.",
      requiredTier: "pro"
    },
    {
      title: "Intelligent Default Suggestions",
      description: "Learns from user behavior to suggest appropriate starting points for new projects based on past successful workflows.",
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
    },
    {
      title: "Spatial Analysis Tools",
      description: "Visualizes stereo field, phase relationships, and immersive audio positioning with guidance for optimal placement.",
      requiredTier: "standard"
    },
    {
      title: "Temporal Pattern Recognition",
      description: "Identifies rhythmic patterns in spectral content to help analyze groove, note timing, and dynamic consistency across similar sections.",
      requiredTier: "pro"
    },
    {
      title: "Harmonic Suggestion Engine",
      description: "Analyzes existing harmonic content to suggest complementary chord progressions, bass lines, or melodic elements.",
      requiredTier: "standard"
    },
    {
      title: "Instrument Balance Coach",
      description: "Provides feedback on mix balance using machine learning models trained on successful mixes within similar genres.",
      requiredTier: "pro"
    },
    {
      title: "Dynamic Contour Visualization",
      description: "Maps the emotional energy curve of a song based on dynamic range, instrumentation density, and frequency content over time.",
      requiredTier: "standard"
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
    },
    {
      title: "Sound Design Evolution",
      description: "Generates evolving sound design elements that develop over time based on arrangement landmarks detected in the project.",
      requiredTier: "pro"
    },
    {
      title: "Character-Based Lyrics",
      description: "Creates lyric suggestions based on defined character personas, storytelling arc, and emotional progression.",
      requiredTier: "standard"
    },
    {
      title: "Adaptive Session Planning",
      description: "Recommends session structures based on available time, project deadlines, and historical time spent on similar tasks.",
      requiredTier: "pro"
    },
    {
      title: "Contextual Voice Commands",
      description: "Provides a voice control system that understands DAW-specific terminology and can execute complex command chains.",
      requiredTier: "standard"
    },
    {
      title: "Decision Fatigue Reduction",
      description: "Identifies when users are experiencing decision fatigue and suggests either breaks or simplifies choices.",
      requiredTier: "pro"
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
    },
    {
      title: "Subscription Bundle Creator",
      description: "Allows content creators to build their own subscription offerings with customizable access tiers and preview capabilities.",
      requiredTier: "pro"
    },
    {
      title: "Usage Analytics Dashboard",
      description: "Provides sellers with detailed analytics on how customers use their products and which features are most valuable.",
      requiredTier: "standard"
    },
    {
      title: "Automated Quality Assurance",
      description: "Tests creator submissions across different system configurations to ensure compatibility and stability before marketplace listing.",
      requiredTier: "pro"
    },
    {
      title: "Dynamic Pricing Models",
      description: "Offers creators flexible pricing options including pay-what-you-want, subscription access, free-with-attribution, or traditional one-time purchase.",
      requiredTier: "standard"
    },
    {
      title: "Educational Content Framework",
      description: "Provides tools for creating interactive tutorials that integrate directly with the DAW environment for hands-on learning.",
      requiredTier: "pro"
    }
  ]
};
