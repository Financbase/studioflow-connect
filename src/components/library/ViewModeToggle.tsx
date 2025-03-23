
import React from "react";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("grid")}
        className="h-8 w-8"
        title={t("library.viewMode.grid")}
        aria-label={t("library.viewMode.grid")}
      >
        <GridIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("list")}
        className="h-8 w-8"
        title={t("library.viewMode.list")}
        aria-label={t("library.viewMode.list")}
      >
        <ListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
