
import { Recommendation } from "@/types/recommendation";
import { Code, Workflow, LayoutGrid } from "lucide-react";

export const dawRecommendations: Recommendation[] = [
  {
    id: "daw-1",
    title: "Semantic Project Translation",
    description: "Preserves creative intent when moving between DAWs, maintaining relationships between tracks.",
    category: "features",
    requiredTier: "standard",
    icon: Code,
    actionLabel: "Translate Project"
  },
  {
    id: "daw-2",
    title: "Plugin State Matching",
    description: "When a native plugin isn't available in the target DAW, finds the closest match with similar settings.",
    category: "features",
    requiredTier: "pro",
    icon: Code,
    actionLabel: "Match Plugins"
  },
  {
    id: "daw-3",
    title: "Command Context Analysis",
    description: "Suggests optimized keyboard shortcuts based on frequency of operations and ergonomic factors.",
    category: "features",
    requiredTier: "standard",
    icon: Workflow,
    actionLabel: "Analyze Workflow"
  },
  {
    id: "daw-4",
    title: "Process Mining for Workflows",
    description: "Analyzes repeated sequences of actions to suggest macros that could reduce repetitive tasks.",
    category: "features",
    requiredTier: "pro",
    icon: Workflow,
    actionLabel: "Mine Processes"
  },
  {
    id: "daw-5",
    title: "Focus Mode Configurations",
    description: "Customized workspace layouts that show only relevant tools for specific tasks to reduce cognitive load.",
    category: "features",
    requiredTier: "standard",
    icon: LayoutGrid,
    actionLabel: "Configure Focus Mode"
  },
  {
    id: "daw-6",
    title: "Automation Curve Preservation",
    description: "Maintains precise automation data even when moving between DAWs with different automation curve implementations or resolution.",
    category: "features",
    requiredTier: "standard",
    icon: Code,
    actionLabel: "Preserve Automation"
  },
  {
    id: "daw-7",
    title: "Asset Relationship Mapping",
    description: "Preserves relationships between tracks (sends, groups, VCAs) even when the routing architecture differs between DAWs.",
    category: "features",
    requiredTier: "pro",
    icon: Code,
    actionLabel: "Map Relationships"
  },
  {
    id: "daw-8",
    title: "Mix Calibration Tools",
    description: "Ensures consistent output levels and frequency response when moving projects between different DAW summing engines.",
    category: "features",
    requiredTier: "standard",
    icon: Workflow,
    actionLabel: "Calibrate Mix"
  },
  {
    id: "daw-9",
    title: "Session Setup Blueprints",
    description: "Creates comprehensive templates that include not just track structure but also window layouts, controller mappings, and plugin chains.",
    category: "features",
    requiredTier: "pro",
    icon: LayoutGrid,
    actionLabel: "Create Blueprint"
  },
  {
    id: "daw-10",
    title: "Intelligent Default Suggestions",
    description: "Learns from user behavior to suggest appropriate starting points for new projects based on past successful workflows.",
    category: "features",
    requiredTier: "standard",
    icon: Workflow,
    actionLabel: "View Suggestions"
  }
];
