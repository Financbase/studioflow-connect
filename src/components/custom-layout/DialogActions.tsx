
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
  activeTab: string;
  canSaveMultipleLayouts: boolean;
}

const DialogActions = ({
  onCancel,
  onSave,
  activeTab,
  canSaveMultipleLayouts
}: DialogActionsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
      <Button 
        variant="outline" 
        onClick={onCancel} 
        className={isMobile ? "w-full" : ""}
      >
        Cancel
      </Button>
      <Button 
        onClick={onSave} 
        className={`${isMobile ? "w-full" : ""} gap-2`}
      >
        <Save className="h-4 w-4" />
        {activeTab === "layouts" && canSaveMultipleLayouts ? "Save New Layout" : "Save Changes"}
      </Button>
    </DialogFooter>
  );
};

export default DialogActions;
