
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Profile } from '@/types/supabase';

interface UseAuthReturn {
  user: any;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const { isLoading, session, error } = useSessionContext();
  const user = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (error) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [error]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          // Ensure plan is one of the allowed values
          const planValue = data.plan as 'free' | 'standard' | 'pro';
          // Create a properly typed profile object
          setProfile({
            ...data,
            plan: planValue
          } as Profile);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
    signOut,
  };
};
