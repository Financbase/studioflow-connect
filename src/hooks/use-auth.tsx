import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Profile } from '@/types/supabase';

interface UseAuthReturn {
  user: any;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const { isLoading: sessionLoading, session, error } = useSessionContext();
  const user = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use try-catch to handle cases where this hook is used outside a Router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    // Create a fallback function that logs an error when used
    navigate = (path: string) => {
      console.error('Navigation attempted outside Router context to:', path);
    };
  }

  const isAuthenticated = !!user;

  useEffect(() => {
    if (error) {
      toast.destructive({
        title: 'Authentication Error',
        description: error.message,
      });
    }
  }, [error]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else if (data) {
            // Ensure plan is one of the allowed values
            const planValue = data.plan as 'free' | 'standard' | 'pro';
            // Create a properly typed profile object
            setProfile({
              ...data,
              plan: planValue || 'free' // Default to free if undefined
            } as Profile);
          }
        } catch (error) {
          console.error('Error in profile fetch:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(sessionLoading);
      }
    };

    fetchProfile();
  }, [user, sessionLoading]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      if (navigate) {
        navigate('/auth');
      }
      toast.default({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error: any) {
      toast.destructive({
        title: 'Error signing out',
        description: error.message,
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
