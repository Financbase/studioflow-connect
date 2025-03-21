
import { Recommendation } from "@/types/recommendation";
import { ServerStack, Cpu, BarChart } from "lucide-react";

export const systemRecommendations: Recommendation[] = [
  {
    id: "sys-1",
    title: "Adaptive CPU Prioritization",
    description: "Automatically shifts CPU resources to the most active plugin chains during playback and recording.",
    category: "workflow",
    requiredTier: "standard",
    icon: Cpu,
    actionLabel: "Learn More"
  },
  {
    id: "sys-2",
    title: "Smart Memory Management",
    description: "Implements memory compression for older 32-bit plugins to reduce their footprint while maintaining fast access.",
    category: "workflow",
    requiredTier: "standard",
    icon: ServerStack,
    actionLabel: "Enable Now"
  },
  {
    id: "sys-3",
    title: "Project-Specific Resource Profiles",
    description: "Create and save optimized resource profiles for different project types (mixing vs. tracking sessions).",
    category: "workflow",
    requiredTier: "pro",
    icon: ServerStack,
    actionLabel: "Create Profile"
  },
  {
    id: "sys-4",
    title: "Component-Level Metrics",
    description: "Granular monitoring of individual plugin instances with visual alerts for problematic plugins.",
    category: "workflow",
    requiredTier: "standard",
    icon: BarChart,
    actionLabel: "View Metrics"
  },
  {
    id: "sys-5",
    title: "Historical Usage Patterns",
    description: "Track resource usage across sessions to identify problematic setups or performance trends.",
    category: "workflow",
    requiredTier: "pro",
    icon: BarChart,
    actionLabel: "View History"
  },
  {
    id: "sys-6",
    title: "Hardware Accelerated Processing",
    description: "Automatically offloads compatible DSP processes to GPU for tasks like convolution reverb or spectral processing.",
    category: "workflow",
    requiredTier: "standard",
    icon: Cpu,
    actionLabel: "Enable GPU"
  },
  {
    id: "sys-7",
    title: "Background Rendering Pipeline",
    description: "Intelligently pre-renders effect chains that don't require real-time interaction while keeping interactive elements responsive.",
    category: "workflow",
    requiredTier: "standard",
    icon: ServerStack,
    actionLabel: "Configure"
  },
  {
    id: "sys-8",
    title: "I/O Performance Tracking",
    description: "Monitors disk read/write speeds for sample streaming, buffer underruns, and suggests optimal sample rate/bit depth settings.",
    category: "workflow",
    requiredTier: "standard",
    icon: BarChart,
    actionLabel: "Track Performance"
  },
  {
    id: "sys-9",
    title: "Network Performance Analysis",
    description: "For collaborative sessions, monitors latency, packet loss, and bandwidth utilization with automatic quality adjustment recommendations.",
    category: "workflow",
    requiredTier: "pro",
    icon: BarChart,
    actionLabel: "Analyze Network"
  },
  {
    id: "sys-10",
    title: "Environment Variables Monitoring",
    description: "Tracks system-level variables like temperature, power draw, and disk fragmentation that might impact audio performance.",
    category: "workflow",
    requiredTier: "standard",
    icon: ServerStack,
    actionLabel: "Monitor Environment"
  }
];
