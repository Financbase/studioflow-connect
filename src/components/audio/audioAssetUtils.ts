
import { supabase } from '@/integrations/supabase/client';
import { AudioAsset } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';

export const downloadAudioAsset = async (asset: AudioAsset) => {
  try {
    const { data, error } = await supabase.storage
      .from('audio_assets')
      .createSignedUrl(asset.storage_path, 60);
      
    if (error) {
      throw error;
    }
    
    const link = document.createElement('a');
    link.href = data.signedUrl;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error: any) {
    toast({
      title: 'Error downloading audio',
      description: error.message,
      variant: 'destructive',
    });
  }
};

export const deleteAudioAsset = async (asset: AudioAsset, onSuccess: () => void) => {
  try {
    const { error: storageError } = await supabase.storage
      .from('audio_assets')
      .remove([asset.storage_path]);
      
    if (storageError) {
      throw storageError;
    }
    
    const { error: dbError } = await supabase
      .from('audio_assets')
      .delete()
      .eq('id', asset.id);
      
    if (dbError) {
      throw dbError;
    }
    
    onSuccess();
    
    toast({
      title: 'Asset deleted',
      description: 'Audio file has been deleted',
    });
    
  } catch (error: any) {
    toast({
      title: 'Error deleting asset',
      description: error.message,
      variant: 'destructive',
    });
  }
};
