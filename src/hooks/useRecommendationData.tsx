
import { useState } from "react";
import { 
  Music, 
  Settings, 
  BookOpen, 
  FileCode, 
  Headphones, 
  Zap 
} from "lucide-react";
import { Recommendation } from "@/types/recommendation";

export const useRecommendationData = () => {
  // Sample recommendation data
  const workflowRecommendations: Recommendation[] = [
    {
      id: "rec1",
      title: "Try the Template System",
      description: "Speed up your workflow by using our pre-made project templates",
      category: "workflow",
      requiredTier: "free",
      icon: <Music className="h-5 w-5 text-primary" />,
      actionLabel: "Explore Templates",
      actionUrl: "/templates"
    },
    {
      id: "rec2",
      title: "Set Up Key Commands",
      description: "Customize your keyboard shortcuts for faster editing",
      category: "workflow",
      requiredTier: "free",
      icon: <Settings className="h-5 w-5 text-primary" />,
      actionLabel: "Setup Shortcuts",
      actionUrl: "/settings/shortcuts"
    },
    {
      id: "rec3",
      title: "Try AI Mastering",
      description: "Let our AI handle the final touches on your track",
      category: "workflow",
      requiredTier: "pro",
      icon: <Zap className="h-5 w-5 text-primary" />,
      actionLabel: "Try AI Mastering",
      actionUrl: "/ai/mastering"
    }
  ];
  
  const learningRecommendations: Recommendation[] = [
    {
      id: "rec4",
      title: "Mixing Basics Course",
      description: "Learn the fundamentals of audio mixing in our free course",
      category: "learning",
      requiredTier: "free",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      actionLabel: "Start Learning",
      actionUrl: "/learn/mixing-basics"
    },
    {
      id: "rec5",
      title: "Advanced Production Techniques",
      description: "Take your productions to the next level with advanced techniques",
      category: "learning",
      requiredTier: "standard",
      icon: <Headphones className="h-5 w-5 text-primary" />,
      actionLabel: "Start Course",
      actionUrl: "/learn/advanced-production"
    }
  ];
  
  const aiRecommendations: Recommendation[] = [
    {
      id: "rec6",
      title: "AI Stem Separation",
      description: "Extract vocals, drums, bass and more from any track",
      category: "ai",
      requiredTier: "pro",
      icon: <FileCode className="h-5 w-5 text-primary" />,
      actionLabel: "Try Stem Separation",
      actionUrl: "/ai/stem-separation"
    },
    {
      id: "rec7",
      title: "AI Vocal Enhancement",
      description: "Clean up and enhance your vocal recordings",
      category: "ai",
      requiredTier: "pro",
      icon: <Zap className="h-5 w-5 text-primary" />,
      actionLabel: "Enhance Vocals",
      actionUrl: "/ai/vocal-enhancement"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filterRecommendations = (recommendations: Recommendation[]) => {
    if (!searchQuery) return recommendations;
    
    return recommendations.filter(rec => 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return {
    workflowRecommendations,
    learningRecommendations,
    aiRecommendations,
    searchQuery,
    setSearchQuery,
    filterRecommendations
  };
};
