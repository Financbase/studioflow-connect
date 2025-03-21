
// This file is maintained for backward compatibility
// Import from contexts/dashboard instead for new code
import { 
  DashboardProvider, 
  useDashboard 
} from './dashboard';
import type { 
  WidgetId, 
  PricingTier, 
  ViewMode, 
  DashboardContextType
} from './dashboard/types';

export { 
  DashboardProvider,
  useDashboard,
  // Re-export types
  type WidgetId,
  type PricingTier,
  type ViewMode,
  type DashboardContextType
};
