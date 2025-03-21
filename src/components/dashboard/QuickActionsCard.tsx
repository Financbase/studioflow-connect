
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Share2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/contexts/DashboardContext";
import { toast } from "@/hooks/use-toast";
import { WidgetId } from "@/contexts/dashboard/types";

const QuickActionsCard = () => {
  const { hasFeatureAccess } = useDashboard();

  const handlePremiumFeature = (e: React.MouseEvent, featureId: WidgetId) => {
    if (!hasFeatureAccess(featureId)) {
      e.preventDefault();
      toast({
        title: "Premium Feature",
        description: "Upgrade your plan to access this feature",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used features</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
          <Link to="/projects">
            <Music className="h-5 w-5 mb-1" />
            <span>New Project</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
          <Link to="/library">
            <Headphones className="h-5 w-5 mb-1" />
            <span>My Library</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center" asChild>
          <Link to="/connect">
            <Share2 className="h-5 w-5 mb-1" />
            <span>Connect</span>
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          className={`h-auto py-4 justify-start flex-col items-center ${!hasFeatureAccess('ai') ? 'opacity-70 hover:opacity-100' : ''}`}
          asChild
        >
          <Link 
            to="/ai-tools" 
            onClick={(e) => handlePremiumFeature(e, 'ai')}
          >
            <Sparkles className="h-5 w-5 mb-1" />
            <span>AI Tools</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
