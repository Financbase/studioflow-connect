
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, LayoutDashboard, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          The page you're looking for doesn't exist or is still under development.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/support">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Attempted path: <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
