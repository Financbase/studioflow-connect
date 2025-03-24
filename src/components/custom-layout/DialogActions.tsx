
import React from 'react';
import { Button } from '@/components/ui/button';

export interface DialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const DialogActions: React.FC<DialogActionsProps> = ({ 
  onCancel,
  onSave
}) => {
  return (
    <div className="flex justify-between w-full">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="default" onClick={onSave}>
        Save Layout
      </Button>
    </div>
  );
};

export default DialogActions;
