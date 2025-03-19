
export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: 'free' | 'standard' | 'pro';
  created_at: string;
  updated_at: string;
}

export interface DashboardSettings {
  id: string;
  user_id: string;
  view_mode: 'simple' | 'advanced' | 'custom' | 'mobile';
  custom_layout: string[]; // WidgetId[]
  collapsed_widgets: string[]; // WidgetId[]
  created_at: string;
  updated_at: string;
}

export interface AudioAsset {
  id: string;
  user_id: string;
  name: string;
  storage_path: string;
  type: string;
  size: number;
  created_at: string;
  updated_at: string;
}
