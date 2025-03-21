
import { Recommendation } from "@/types/recommendation";
import { Layers, Database, Monitor } from "lucide-react";

export const vmRecommendations: Recommendation[] = [
  {
    id: "vm-1",
    title: "Differential Snapshotting",
    description: "Maintains lightweight snapshots of VM states that can be instantly restored, perfect for A/B testing plugins.",
    category: "plugins",
    requiredTier: "pro",
    icon: Layers,
    actionLabel: "Enable Snapshots"
  },
  {
    id: "vm-2",
    title: "Unified Plugin Database",
    description: "Cross-platform database of plugins that tracks compatibility, version history, and known issues.",
    category: "plugins",
    requiredTier: "pro",
    icon: Database,
    actionLabel: "Access Database"
  },
  {
    id: "vm-3",
    title: "DAW-Specific VM Templates",
    description: "Pre-configured VM environments optimized for specific DAWs with recommended settings.",
    category: "plugins",
    requiredTier: "standard",
    icon: Monitor,
    actionLabel: "Browse Templates"
  },
  {
    id: "vm-4",
    title: "Plugin Validation Workflow",
    description: "Automatically test newly installed plugins in a sandboxed environment before integration.",
    category: "plugins",
    requiredTier: "pro",
    icon: Layers,
    actionLabel: "Validate Plugin"
  },
  {
    id: "vm-5",
    title: "Environment Comparison Tools",
    description: "Visually compare settings between environments to diagnose performance differences.",
    category: "plugins",
    requiredTier: "standard",
    icon: Monitor,
    actionLabel: "Compare Environments"
  },
  {
    id: "vm-6",
    title: "Distributed Processing Network",
    description: "Links multiple VMs for parallel processing, allowing projects to distribute CPU-intensive plugins across several virtualized systems.",
    category: "plugins",
    requiredTier: "pro",
    icon: Layers,
    actionLabel: "Setup Network"
  },
  {
    id: "vm-7",
    title: "Hardware Abstraction Layer",
    description: "Provides consistent access to audio interfaces and controllers across different VM environments through a universal driver translation layer.",
    category: "plugins",
    requiredTier: "standard",
    icon: Layers,
    actionLabel: "Configure HAL"
  },
  {
    id: "vm-8",
    title: "VM Resource Scheduling",
    description: "Allocates system resources to different VMs based on active task priorities, scaling up resources for rendering VMs.",
    category: "plugins",
    requiredTier: "pro",
    icon: Database,
    actionLabel: "Schedule Resources"
  },
  {
    id: "vm-9",
    title: "OS Configuration Wizards",
    description: "Provides guided setup of OS-level parameters critical for audio work with one-click application.",
    category: "plugins",
    requiredTier: "standard",
    icon: Monitor,
    actionLabel: "Run Wizard"
  },
  {
    id: "vm-10",
    title: "Periodic Optimization Scans",
    description: "Runs scheduled analysis of VM environments to detect fragmentation, driver conflicts, or other performance degrading factors.",
    category: "plugins",
    requiredTier: "standard",
    icon: Database,
    actionLabel: "Run Scan"
  }
];
