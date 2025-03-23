
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminToolbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <Link to="/">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={() => {
            toast({
              title: "Settings",
              description: "Admin settings will be available soon"
            });
          }}
        >
          Settings
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          asChild
        >
          <Link to="/support">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminToolbar;
