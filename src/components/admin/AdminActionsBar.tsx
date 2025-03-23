
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface AdminActionsBarProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const AdminActionsBar: React.FC<AdminActionsBarProps> = ({ 
  isRefreshing, 
  onRefresh 
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="ml-2 flex gap-1 items-center" 
      onClick={onRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
    </Button>
  );
};

export default AdminActionsBar;
