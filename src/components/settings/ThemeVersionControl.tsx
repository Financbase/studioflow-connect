
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TrashIcon, HistoryIcon, SaveIcon, RestoreIcon, PlusIcon } from "lucide-react";

const ThemeVersionControl: React.FC = () => {
  const { themeVariant, theme, saveCurrentTheme, versionManager } = useTheme();
  const [newVersionName, setNewVersionName] = useState("");
  const [newVersionDesc, setNewVersionDesc] = useState("");
  
  const handleSaveVersion = () => {
    if (!newVersionName.trim()) return;
    
    saveCurrentTheme(newVersionName, newVersionDesc);
    setNewVersionName("");
    setNewVersionDesc("");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Version Control</CardTitle>
        <CardDescription>
          Save and restore theme versions to manage your UI appearance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="version-name">New Version Name</Label>
            <Input 
              id="version-name" 
              placeholder="e.g., Blue Light Theme" 
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="version-desc">Description (optional)</Label>
            <Textarea 
              id="version-desc" 
              placeholder="Enter a brief description of this theme version"
              value={newVersionDesc}
              onChange={(e) => setNewVersionDesc(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleSaveVersion} 
            disabled={!newVersionName.trim()}
            className="w-full"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            Save Current Theme as Version
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-base font-medium mb-2">Saved Versions</h3>
          
          {versionManager.versions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No saved versions yet. Create your first theme version above.</p>
          ) : (
            <ScrollArea className="h-[250px] rounded-md border">
              <div className="p-4 space-y-3">
                {versionManager.versions.map((version) => (
                  <div 
                    key={version.id} 
                    className={`p-3 rounded-lg border ${
                      version.id === versionManager.currentVersionId 
                        ? 'bg-muted border-primary/30' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{version.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => versionManager.switchToVersion(version.id)}
                          disabled={version.id === versionManager.currentVersionId}
                        >
                          <RestoreIcon className="h-3.5 w-3.5" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={version.id === versionManager.currentVersionId}
                            >
                              <TrashIcon className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Theme Version</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{version.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => versionManager.deleteVersion(version.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    
                    {version.description && (
                      <p className="text-sm mt-2">{version.description}</p>
                    )}
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span className="inline-block px-2 py-1 rounded-md bg-background mr-2">
                        {version.themeData.themeVariant}
                      </span>
                      <span className="inline-block px-2 py-1 rounded-md bg-background">
                        {version.themeData.themeMode}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 border-t text-xs text-muted-foreground flex flex-col items-start space-y-1 pt-3">
        <p>• Save your current theme configuration as a named version</p>
        <p>• Restore previous versions with a single click</p>
        <p>• Track changes to ensure consistency across updates</p>
      </CardFooter>
    </Card>
  );
};

export default ThemeVersionControl;
