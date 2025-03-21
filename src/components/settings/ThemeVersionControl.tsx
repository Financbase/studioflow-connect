
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  StarOff, 
  MoreVertical, 
  Trash2, 
  Download, 
  Check, 
  Pencil,
  Copy,
  Share2
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VersionShareQRCode from "./VersionShareQRCode";

const ThemeVersionControl = () => {
  const { 
    versionManager,
    themeVariant, 
    theme 
  } = useTheme();
  
  const [isEditMode, setIsEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  
  // Handle version activation
  const handleActivateVersion = (versionId: string) => {
    versionManager.switchToVersion(versionId);
  };
  
  // Handle version deletion
  const handleDeleteVersion = (versionId: string) => {
    versionManager.deleteVersion(versionId);
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = (versionId: string) => {
    versionManager.toggleFavorite(versionId);
  };
  
  // Handle export version
  const handleExportVersion = (versionId: string) => {
    const exportData = versionManager.exportVersion(versionId);
    if (exportData) {
      navigator.clipboard.writeText(exportData);
      toast({
        title: "Theme Copied to Clipboard",
        description: "Theme version data has been copied to your clipboard"
      });
    }
  };
  
  // Handle duplicate version
  const handleDuplicateVersion = (versionId: string) => {
    versionManager.duplicateVersion(versionId);
  };
  
  // Start edit mode
  const handleStartEdit = (versionId: string, currentName: string) => {
    setIsEditMode(versionId);
    setEditName(currentName);
  };
  
  // Save edited name
  const handleSaveEdit = (versionId: string) => {
    if (editName.trim()) {
      versionManager.updateVersion(versionId, { name: editName.trim() });
      setIsEditMode(null);
    }
  };
  
  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditMode(null);
  };
  
  // Filter active versions to the top
  const sortedVersions = [...versionManager.versions].sort((a, b) => {
    // Current active version first
    if (a.id === versionManager.currentVersionId) return -1;
    if (b.id === versionManager.currentVersionId) return 1;
    
    // Then favorites
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    
    // Then by date, newest first
    return b.timestamp - a.timestamp;
  });
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Theme Versions</h3>
      <p className="text-sm text-muted-foreground">
        Save and manage different theme versions.
      </p>
      
      {sortedVersions.length === 0 ? (
        <div className="p-4 border rounded-lg text-center text-muted-foreground">
          No saved theme versions yet. Use the "Save Current Theme" button to save your first version.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedVersions.map((version) => (
            <div 
              key={version.id}
              className={`p-3 border rounded-lg ${
                version.id === versionManager.currentVersionId 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'hover:bg-muted/50'
              } transition-colors`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {isEditMode === version.id ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8"
                        autoFocus
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleSaveEdit(version.id)}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={handleCancelEdit}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{version.name}</span>
                        {version.id === versionManager.currentVersionId && (
                          <Badge className="text-xs">Active</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>
                          {new Date(version.timestamp).toLocaleDateString()} •
                          {version.themeData.themeVariant || themeVariant} •
                          {version.themeData.themeMode || theme}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {version.id !== versionManager.currentVersionId && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleActivateVersion(version.id)}
                    >
                      Apply
                    </Button>
                  )}
                  
                  <VersionShareQRCode 
                    version={version} 
                    exportVersion={versionManager.exportVersion} 
                  />
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleToggleFavorite(version.id)}
                  >
                    {version.isFavorite ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStartEdit(version.id, version.name)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateVersion(version.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportVersion(version.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      {version.id !== versionManager.currentVersionId && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete theme version?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                theme version "{version.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteVersion(version.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeVersionControl;
