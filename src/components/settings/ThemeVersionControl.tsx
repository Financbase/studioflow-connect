
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
import { TrashIcon, HistoryIcon, SaveIcon, RefreshCcw, PlusIcon, Star, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeVersionControl: React.FC = () => {
  const { themeVariant, theme, saveCurrentTheme, versionManager } = useTheme();
  const [newVersionName, setNewVersionName] = useState("");
  const [newVersionDesc, setNewVersionDesc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter versions based on search term
  const filteredVersions = searchTerm.trim() 
    ? versionManager.versions.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (v.description && v.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (v.tags && v.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    : versionManager.versions;
  
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
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-medium">Saved Versions</h3>
            {versionManager.versions.length > 0 && (
              <div className="space-y-2 w-full max-w-[200px]">
                <Input
                  placeholder="Search versions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs"
                />
              </div>
            )}
          </div>
          
          {versionManager.versions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No saved versions yet. Create your first theme version above.</p>
          ) : filteredVersions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No versions match your search.</p>
          ) : (
            <ScrollArea className="h-[250px] rounded-md border">
              <div className="p-4 space-y-3">
                {filteredVersions.map((version) => (
                  <div 
                    key={version.id} 
                    className={`p-3 rounded-lg border ${
                      version.id === versionManager.currentVersionId 
                        ? 'bg-muted border-primary/30' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{version.name}</h4>
                          {version.isFavorite && (
                            <StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => versionManager.toggleFavorite(version.id)}
                                className="h-7 w-7"
                              >
                                <Star 
                                  className={`h-3.5 w-3.5 ${version.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {version.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => versionManager.switchToVersion(version.id)}
                                disabled={version.id === versionManager.currentVersionId}
                              >
                                <RefreshCcw className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Apply this theme</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
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
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-block px-2 py-1 rounded-md bg-background text-xs">
                        {version.themeData.themeVariant}
                      </span>
                      <span className="inline-block px-2 py-1 rounded-md bg-background text-xs">
                        {version.themeData.themeMode}
                      </span>
                      {version.tags && version.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
        <p>• Mark favorite themes for quick access</p>
        <p>• Search saved themes by name, description, or tags</p>
      </CardFooter>
    </Card>
  );
};

export default ThemeVersionControl;
