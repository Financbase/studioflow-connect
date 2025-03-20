
import React from 'react';
import { AudioAsset } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { deleteAudioAsset } from './audioAssetUtils';

interface DeleteAudioDialogProps {
  asset: AudioAsset;
  onDeleted: () => void;
  variant?: 'icon' | 'button';
}

const DeleteAudioDialog: React.FC<DeleteAudioDialogProps> = ({ 
  asset, 
  onDeleted,
  variant = 'icon'
}) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    await deleteAudioAsset(asset, () => {
      onDeleted();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === 'icon' ? (
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="destructive" size="sm">Delete</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Audio Asset</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{asset.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAudioDialog;
