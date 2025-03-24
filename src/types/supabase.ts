export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Define specific plan types for better type safety
export type PlanType = 'free' | 'standard' | 'pro';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          onboarding_completed: boolean
          plan: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          onboarding_completed?: boolean
          plan?: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          onboarding_completed?: boolean
          plan?: string
          role?: string
          updated_at?: string | null
        }
      }
    }
  }
}

// Update Profile type to use PlanType
export type Profile = Omit<Database['public']['Tables']['profiles']['Row'], 'plan'> & {
  plan: PlanType;
};

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan: 'free' | 'standard' | 'pro';
  bio?: string | null;
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
