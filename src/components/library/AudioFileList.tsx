
import React from "react";
import { Play, MoreVertical, FileAudio } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AudioWaveform from "./AudioWaveform";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
}

interface AudioFileListProps {
  files: AudioFile[];
  viewMode: "grid" | "list";
  emptyMessage: React.ReactNode;
}

const AudioFileList = ({ files, viewMode, emptyMessage }: AudioFileListProps) => {
  const { t } = useLanguage();
  
  if (files.length === 0) {
    return <div className="py-12">{emptyMessage}</div>;
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <Card key={file.id || index} className="overflow-hidden border group hover:shadow-md transition-all">
            <div className="aspect-square relative bg-black/5 dark:bg-white/5">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-10">
                <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                  <Play className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <AudioWaveform height={40} />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="truncate pr-2">
                  <h3 className="font-medium text-sm truncate">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {file.size} • {file.duration}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Play</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={file.id || index}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10 transition-colors"
        >
          <div className="flex items-center flex-1 min-w-0">
            <div className="h-10 w-10 bg-accent/20 rounded-md flex items-center justify-center mr-3">
              <FileAudio className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="truncate">
              <h3 className="font-medium text-sm truncate">{file.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {file.size} • {file.duration} • {file.type}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Play className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Play</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioFileList;
