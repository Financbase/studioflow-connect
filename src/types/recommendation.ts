
import { LucideIcon } from "lucide-react";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'workflow' | 'plugins' | 'sounds' | 'features';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: LucideIcon;
  actionLabel: string;
  onClick?: () => void;
  imageUrl?: string;
}
