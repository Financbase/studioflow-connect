
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Share2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/contexts/DashboardContext";

const QuickActionsCard = () => {
  const { hasFeatureAccess } = useDashboard();

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
          className={`h-auto py-4 justify-start flex-col items-center ${!hasFeatureAccess('ai') ? 'opacity-50' : ''}`}
          disabled={!hasFeatureAccess('ai')}
          asChild={hasFeatureAccess('ai')}
        >
          {hasFeatureAccess('ai') ? (
            <Link to="/ai-tools">
              <Sparkles className="h-5 w-5 mb-1" />
              <span>AI Tools</span>
            </Link>
          ) : (
            <div>
              <Sparkles className="h-5 w-5 mb-1" />
              <span>AI Tools</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
