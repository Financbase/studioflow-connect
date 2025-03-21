
import { Recommendation } from "@/types/recommendation";
import { ShoppingCart, Users, Gauge } from "lucide-react";

export const marketplaceRecommendations: Recommendation[] = [
  {
    id: "market-1",
    title: "Interactive Trial Workspaces",
    description: "Test marketplace items within a functional project context before purchasing.",
    category: "marketplace",
    requiredTier: "free",
    icon: ShoppingCart,
    actionLabel: "Try Workspace"
  },
  {
    id: "market-2",
    title: "Collaborative Licensing Models",
    description: "Enables multiple contributors to share revenue when selling collaborative templates or presets.",
    category: "marketplace",
    requiredTier: "pro",
    icon: Users,
    actionLabel: "Setup Licensing"
  },
  {
    id: "market-3",
    title: "Contextual Recommendations",
    description: "Suggests marketplace items based on your current project needs, DAW choice, and production style.",
    category: "marketplace",
    requiredTier: "standard",
    icon: ShoppingCart,
    actionLabel: "View Recommendations"
  },
  {
    id: "market-4",
    title: "Product Development Pipeline",
    description: "Guides creators through developing marketplace items from concept to release with templates.",
    category: "marketplace",
    requiredTier: "pro",
    icon: Gauge,
    actionLabel: "Start Development"
  },
  {
    id: "market-5",
    title: "Community Beta Testing",
    description: "Connects creators with willing beta testers who match their target user profile.",
    category: "marketplace",
    requiredTier: "standard",
    icon: Users,
    actionLabel: "Find Testers"
  },
  {
    id: "market-6",
    title: "Subscription Bundle Creator",
    description: "Allows content creators to build their own subscription offerings with customizable access tiers and preview capabilities.",
    category: "marketplace",
    requiredTier: "pro",
    icon: ShoppingCart,
    actionLabel: "Create Bundle"
  },
  {
    id: "market-7",
    title: "Usage Analytics Dashboard",
    description: "Provides sellers with detailed analytics on how customers use their products and which features are most valuable.",
    category: "marketplace",
    requiredTier: "standard",
    icon: Gauge,
    actionLabel: "View Analytics"
  },
  {
    id: "market-8",
    title: "Automated Quality Assurance",
    description: "Tests creator submissions across different system configurations to ensure compatibility and stability before marketplace listing.",
    category: "marketplace",
    requiredTier: "pro",
    icon: Gauge,
    actionLabel: "Run QA Tests"
  },
  {
    id: "market-9",
    title: "Dynamic Pricing Models",
    description: "Offers creators flexible pricing options including pay-what-you-want, subscription access, free-with-attribution, or traditional one-time purchase.",
    category: "marketplace",
    requiredTier: "standard",
    icon: ShoppingCart,
    actionLabel: "Set Pricing Model"
  },
  {
    id: "market-10",
    title: "Educational Content Framework",
    description: "Provides tools for creating interactive tutorials that integrate directly with the DAW environment for hands-on learning.",
    category: "marketplace",
    requiredTier: "pro",
    icon: Users,
    actionLabel: "Create Tutorials"
  }
];
