
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(false);

  // Only show loading indicator after a short delay to prevent flicker
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowLoading(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    if (!showLoading) return null;
    
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Alert>
            <AlertTitle>Loading your profile</AlertTitle>
            <AlertDescription>
              Please wait while we load your profile and settings...
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
