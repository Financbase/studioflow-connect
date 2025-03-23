
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Share2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/contexts/dashboard";
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
    <Card className="border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Frequently used features</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center hover:bg-muted/50 transition-colors" asChild>
          <Link to="/projects">
            <Music className="h-5 w-5 mb-1 text-primary/80" />
            <span>New Project</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center hover:bg-muted/50 transition-colors" asChild>
          <Link to="/library">
            <Headphones className="h-5 w-5 mb-1 text-primary/80" />
            <span>My Library</span>
          </Link>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 justify-start flex-col items-center hover:bg-muted/50 transition-colors" asChild>
          <Link to="/connect">
            <Share2 className="h-5 w-5 mb-1 text-primary/80" />
            <span>Connect</span>
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          className={`h-auto py-4 justify-start flex-col items-center hover:bg-muted/50 transition-colors ${!hasFeatureAccess('ai') ? 'opacity-70 hover:opacity-100' : ''}`}
          asChild
        >
          <Link 
            to="/ai-tools" 
            onClick={(e) => handlePremiumFeature(e, 'ai')}
          >
            <Sparkles className="h-5 w-5 mb-1 text-primary/80" />
            <span>AI Tools</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
