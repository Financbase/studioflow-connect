
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export const useAudioAssets = (user: User | null) => {
  const [assets, setAssets] = useState<AudioAsset[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('audio_assets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setAssets(data || []);
      
    } catch (error: any) {
      toast({
        title: 'Error fetching assets',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    
    if (!user) return;
    
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audio_assets',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAssets();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { assets, loading, refreshAssets: fetchAssets };
};
