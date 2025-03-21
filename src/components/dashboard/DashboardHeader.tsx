
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onZenModeActivate: () => void;
}

const DashboardHeader = ({ onZenModeActivate }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your StudioFlow dashboard.</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button onClick={onZenModeActivate} variant="outline" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Zen Mode</span>
        </Button>
        
        <Button asChild variant="default">
          <Link to="/connect">
            <Share2 className="h-4 w-4 mr-2" />
            <span>Connect Device</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
