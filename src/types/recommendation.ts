export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredTier: 'free' | 'standard' | 'pro' | 'enterprise';
  isAvailable?: boolean;
  actionLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tags?: string[];
  createdAt?: number;
  popularity?: number;
}
