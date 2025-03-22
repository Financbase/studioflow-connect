
import { WidgetId } from "@/contexts/dashboard/types";

export type SavedLayout = {
  id: string;
  name: string;
  widgets: WidgetId[];
  isDefault?: boolean;
  createdAt: string;
};
