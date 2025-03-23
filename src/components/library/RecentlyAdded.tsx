
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileAudio, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/language/LanguageProvider";
import AudioWaveform from "./AudioWaveform";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
  created_at?: string;
}

interface RecentlyAddedProps {
  files: AudioFile[];
  viewMode?: "grid" | "list";
}

const RecentlyAdded = ({ files, viewMode = "grid" }: RecentlyAddedProps) => {
  const { t } = useLanguage();
  
  if (files.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle className="text-lg">{t("library.recentlyAdded")}</CardTitle>
            <CardDescription>{t("library.recentlyAddedDescription")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="w-[250px] rounded-md border p-3 hover:border-primary/50 transition-colors group"
              >
                <div className="aspect-[2/1] relative bg-black/5 dark:bg-white/5 rounded mb-2">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileAudio className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute inset-0 p-2 flex items-end">
                    <AudioWaveform height={30} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm truncate" title={file.name}>{file.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {file.size} • {file.duration} • {file.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentlyAdded;
