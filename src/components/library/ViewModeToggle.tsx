
import React from "react";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("grid")}
        className="h-8 w-8"
      >
        <GridIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("list")}
        className="h-8 w-8"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
