import { supabase } from './client';
import { SavedLayout, WidgetConfig } from '@/types/dashboard';
import { ErrorCode, handleError, tryOperation } from '@/utils/error-handler';
import { v4 as uuidv4 } from 'uuid';

// Table names
const LAYOUTS_TABLE = 'dashboard_layouts';

/**
 * Fetch all layouts for a user
 */
export async function getUserLayouts(userId: string): Promise<SavedLayout[]> {
  return tryOperation(
    async () => {
      const { data, error } = await supabase
        .from(LAYOUTS_TABLE)
        .select('*')
        .eq('userId', userId)
        .order('updatedAt', { ascending: false });
      
      if (error) throw error;
      
      return data as SavedLayout[];
    },
    ErrorCode.LAYOUT_LOAD,
    {
      message: 'Failed to load dashboard layouts',
      metadata: { userId, action: 'getUserLayouts' }
    }
  );
}

/**
 * Fetch a single layout by ID
 */
export async function getLayoutById(layoutId: string): Promise<SavedLayout | null> {
  return tryOperation(
    async () => {
      const { data, error } = await supabase
        .from(LAYOUTS_TABLE)
        .select('*')
        .eq('id', layoutId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // PGRST116 is returned when no rows are found
          return null;
        }
        throw error;
      }
      
      return data as SavedLayout;
    },
    ErrorCode.LAYOUT_LOAD,
    {
      message: 'Failed to load dashboard layout',
      metadata: { layoutId, action: 'getLayoutById' }
    }
  );
}

/**
 * Create a new layout
 */
export async function createLayout(layout: Omit<SavedLayout, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedLayout> {
  return tryOperation(
    async () => {
      const now = new Date().toISOString();
      const newLayout: SavedLayout = {
        ...layout,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now
      };
      
      const { data, error } = await supabase
        .from(LAYOUTS_TABLE)
        .insert(newLayout)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as SavedLayout;
    },
    ErrorCode.LAYOUT_SAVE,
    {
      message: 'Failed to create dashboard layout',
      metadata: { layout, action: 'createLayout' }
    }
  );
}

/**
 * Update an existing layout
 */
export async function updateLayout(
  layoutId: string,
  updates: Partial<Omit<SavedLayout, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<SavedLayout> {
  return tryOperation(
    async () => {
      const { data, error } = await supabase
        .from(LAYOUTS_TABLE)
        .update({
          ...updates,
          updatedAt: new Date().toISOString()
        })
        .eq('id', layoutId)
        .select()
        .single();
      
      if (error) throw error;
      
      return data as SavedLayout;
    },
    ErrorCode.LAYOUT_SAVE,
    {
      message: 'Failed to update dashboard layout',
      metadata: { layoutId, updates, action: 'updateLayout' }
    }
  );
}

/**
 * Delete a layout
 */
export async function deleteLayout(layoutId: string): Promise<boolean> {
  return tryOperation(
    async () => {
      const { error } = await supabase
        .from(LAYOUTS_TABLE)
        .delete()
        .eq('id', layoutId);
      
      if (error) throw error;
      
      return true;
    },
    ErrorCode.LAYOUT_DELETE,
    {
      message: 'Failed to delete dashboard layout',
      metadata: { layoutId, action: 'deleteLayout' }
    }
  );
}

/**
 * Set a layout as the default
 * This also sets all other layouts as non-default
 */
export async function setDefaultLayout(layoutId: string, userId: string): Promise<boolean> {
  return tryOperation(
    async () => {
      // Start a transaction
      const now = new Date().toISOString();
      
      // 1. Set all layouts for this user to isDefault = false
      const { error: resetError } = await supabase
        .from(LAYOUTS_TABLE)
        .update({ 
          isDefault: false,
          updatedAt: now
        })
        .eq('userId', userId);
      
      if (resetError) throw resetError;
      
      // 2. Set the specified layout as default
      const { error: updateError } = await supabase
        .from(LAYOUTS_TABLE)
        .update({ 
          isDefault: true,
          updatedAt: now
        })
        .eq('id', layoutId)
        .eq('userId', userId);
      
      if (updateError) throw updateError;
      
      return true;
    },
    ErrorCode.LAYOUT_SAVE,
    {
      message: 'Failed to set default dashboard layout',
      metadata: { layoutId, userId, action: 'setDefaultLayout' }
    }
  );
}

/**
 * Get the default layout for a user
 */
export async function getDefaultLayout(userId: string): Promise<SavedLayout | null> {
  return tryOperation(
    async () => {
      const { data, error } = await supabase
        .from(LAYOUTS_TABLE)
        .select('*')
        .eq('userId', userId)
        .eq('isDefault', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No default layout found
          return null;
        }
        throw error;
      }
      
      return data as SavedLayout;
    },
    ErrorCode.LAYOUT_LOAD,
    {
      message: 'Failed to load default dashboard layout',
      metadata: { userId, action: 'getDefaultLayout' }
    }
  );
}

/**
 * Creates an optimistic local update for a layout
 * This is useful for updating the UI before the server responds
 */
export function createOptimisticLayoutUpdate(
  layout: SavedLayout,
  updates: Partial<SavedLayout>
): SavedLayout {
  return {
    ...layout,
    ...updates,
    updatedAt: new Date().toISOString()
  };
} 