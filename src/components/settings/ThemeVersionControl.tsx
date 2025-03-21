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
  Share2,
  Tag,
  Search,
  SortDesc,
  X,
  PlusCircle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VersionShareQRCode from "./VersionShareQRCode";
import { SortOption } from "@/hooks/colorVersions/useVersionSorting";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ThemeVersionControl = () => {
  const { 
    versionManager,
    themeVariant, 
    theme 
  } = useTheme();
  
  const [isEditMode, setIsEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newTag, setNewTag] = useState("");
  
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
  
  // Handle add tag to version
  const handleAddTag = (versionId: string) => {
    if (newTag.trim()) {
      versionManager.addTag(versionId, newTag.trim());
      setNewTag("");
    }
  };
  
  // Handle remove tag from version
  const handleRemoveTag = (versionId: string, tag: string) => {
    versionManager.removeTag(versionId, tag);
  };
  
  // Handle filter by tag
  const handleFilterByTag = (tag: string) => {
    versionManager.addTagFilter(tag);
  };
  
  // Handle search filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    versionManager.updateFilters({ search: e.target.value });
  };
  
  // Handle sort option change
  const handleSortChange = (value: string) => {
    versionManager.setSortOption(value as SortOption);
  };
  
  // Toggle favorites filter
  const handleToggleFavoritesFilter = () => {
    versionManager.toggleFavoritesFilter();
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    versionManager.resetFilters();
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Theme Versions</h3>
      <p className="text-sm text-muted-foreground">
        Save and manage different theme versions.
      </p>
      
      {/* Search and filter controls */}
      <div className="flex flex-col gap-3 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search versions..."
              className="pl-8"
              value={versionManager.filters.search}
              onChange={handleSearchChange}
            />
          </div>
          
          <Select
            value={versionManager.sortOption}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="favorites">Favorites First</SelectItem>
              <SelectItem value="recent">Recently Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={versionManager.filters.onlyFavorites ? "default" : "outline"}
            size="sm"
            onClick={handleToggleFavoritesFilter}
            className="h-7"
          >
            <Star className={`h-3.5 w-3.5 mr-1 ${versionManager.filters.onlyFavorites ? "fill-primary-foreground" : ""}`} />
            Favorites
          </Button>
          
          {versionManager.filters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="px-2 py-1 gap-1">
              {tag}
              <button 
                onClick={() => versionManager.removeTagFilter(tag)}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {(versionManager.filters.search || versionManager.filters.tags.length > 0 || versionManager.filters.onlyFavorites) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-7 text-xs"
            >
              Clear All
            </Button>
          )}
          
          {versionManager.allTags.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-7">
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  Filter by Tag
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="max-h-[300px] overflow-auto">
                  {versionManager.allTags.map(tag => (
                    <button
                      key={tag}
                      className={`w-full text-left px-2 py-1.5 text-sm hover:bg-muted transition-colors ${
                        versionManager.filters.tags.includes(tag) ? "bg-muted" : ""
                      }`}
                      onClick={() => handleFilterByTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      
      {versionManager.filteredVersions.length === 0 ? (
        <div className="p-4 border rounded-lg text-center text-muted-foreground animate-fade-in">
          {versionManager.versions.length === 0 
            ? "No saved theme versions yet. Use the \"Save Current Theme\" button to save your first version."
            : "No versions match your filters. Try adjusting your search or filter criteria."}
        </div>
      ) : (
        <div className="space-y-3">
          {versionManager.filteredVersions.map((version) => (
            <div 
              key={version.id}
              className={`p-3 border rounded-lg ${
                version.id === versionManager.currentVersionId 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'hover:bg-muted/50'
              } transition-colors animate-fade-in`}
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
                        <X className="h-4 w-4" />
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
                      
                      {version.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {version.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs px-1.5 py-0 h-5"
                              onClick={() => handleFilterByTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {version.id !== versionManager.currentVersionId && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleActivateVersion(version.id)}
                      className="animate-fade-in"
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
                      
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center px-2 py-1.5 text-sm w-full cursor-default">
                              <Tag className="h-4 w-4 mr-2" />
                              Add Tag
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2">
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="New tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="h-8 w-[150px]"
                              />
                              <Button 
                                size="sm" 
                                onClick={() => handleAddTag(version.id)}
                              >
                                Add
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
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
