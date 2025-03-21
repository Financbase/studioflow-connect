
import React from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ColorPalette } from "@/contexts/ThemeContext";

interface SavedPalettesListProps {
  colorPalettes: ColorPalette[];
  currentPaletteId: string | null;
  applyColorPalette: (paletteId: string) => void;
  deleteColorPalette: (paletteId: string) => void;
}

const SavedPalettesList: React.FC<SavedPalettesListProps> = ({
  colorPalettes,
  currentPaletteId,
  applyColorPalette,
  deleteColorPalette
}) => {
  if (colorPalettes.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium mb-4">Saved Palettes</h3>
      {colorPalettes.map((palette) => (
        <div 
          key={palette.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/40 transition-colors"
        >
          <div>
            <h4 className="font-medium">{palette.name}</h4>
            {palette.description && (
              <p className="text-xs text-muted-foreground">{palette.description}</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyColorPalette(palette.id)}
              title="Apply this palette"
              className={currentPaletteId === palette.id ? "bg-primary text-primary-foreground" : ""}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  title="Delete this palette"
                  disabled={currentPaletteId === palette.id}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Color Palette</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{palette.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteColorPalette(palette.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPalettesList;
