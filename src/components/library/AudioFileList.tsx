
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileAudio, Music, PlayCircle, PauseCircle, Download, Info } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import AudioWaveform from "./AudioWaveform";
import { useLanguage } from "@/contexts/language/LanguageProvider";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
  id?: string;
  url?: string;
  created_at?: string;
}

interface AudioFileListProps {
  files: AudioFile[];
  viewMode?: "grid" | "list";
  emptyMessage?: React.ReactNode;
}

const AudioFileList = ({ files, viewMode = "grid", emptyMessage }: AudioFileListProps) => {
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  const handlePlayClick = (file: AudioFile) => {
    if (playingFile === file.id) {
      // If already playing, pause it
      audioElement?.pause();
      setPlayingFile(null);
    } else {
      // If new file, create audio element and play
      if (audioElement) {
        audioElement.pause();
      }
      
      // In a real implementation, we would use the file.url here
      const audio = new Audio(file.url || "https://example.com/audio.mp3");
      audio.onended = () => setPlayingFile(null);
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
        toast({
          title: "Playback Error",
          description: "Could not play the audio file",
          variant: "destructive"
        });
      });
      
      setAudioElement(audio);
      setPlayingFile(file.id || null);
      
      toast({
        title: "Playing audio",
        description: `Playing ${file.name}`,
      });
    }
  };

  const handleDownloadClick = (file: AudioFile) => {
    toast({
      title: "Downloading",
      description: `Downloading ${file.name}`,
    });
  };

  const handleInfoClick = (file: AudioFile) => {
    toast({
      title: "File Details",
      description: `${file.name} • ${file.size} • ${file.duration}`,
    });
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          {emptyMessage || (
            <div className="text-center py-8">
              <Music className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p>{t("library.empty.default") || "No audio files found matching your search"}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (viewMode === "grid") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("library.audioAssets") || "Audio Assets"}</CardTitle>
          <CardDescription>{t("library.audioAssetsDescription") || "Browse all your audio files and samples"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <Card key={index} className="overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="aspect-square bg-black/5 dark:bg-white/5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayClick(file)}
                      className="bg-black/30 backdrop-blur-sm text-white p-2 rounded-full transition-transform group-hover:scale-110"
                    >
                      {playingFile === file.id ? (
                        <PauseCircle className="h-10 w-10" />
                      ) : (
                        <PlayCircle className="h-10 w-10" />
                      )}
                    </button>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <AudioWaveform 
                      fileUrl={file.url} 
                      isPlaying={playingFile === file.id}
                      height={40}
                    />
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">{file.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {file.duration} • {file.size}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 pt-0 flex justify-between">
                  <Button variant="ghost" size="icon" onClick={() => handleInfoClick(file)}>
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDownloadClick(file)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">{t("library.import") || "Import"}</Button>
          <Button variant="outline">{t("library.organize") || "Organize"}</Button>
        </CardFooter>
      </Card>
    );
  }

  // List view
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("library.audioAssets") || "Audio Assets"}</CardTitle>
        <CardDescription>{t("library.audioAssetsDescription") || "Browse all your audio files and samples"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-3 rounded-md border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-grow mr-2">
                <button
                  onClick={() => handlePlayClick(file)}
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                >
                  {playingFile === file.id ? (
                    <PauseCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <PlayCircle className="h-5 w-5 text-primary" />
                  )}
                </button>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate max-w-[200px]" title={file.name}>{file.name}</p>
                    <Badge variant="outline">{file.type}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {file.duration}
                    </p>
                    {file.created_at && (
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-32 flex-shrink-0 mr-3">
                <AudioWaveform 
                  fileUrl={file.url} 
                  isPlaying={playingFile === file.id}
                  height={30}
                />
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleInfoClick(file)}>
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownloadClick(file)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{t("library.import") || "Import"}</Button>
        <Button variant="outline">{t("library.organize") || "Organize"}</Button>
      </CardFooter>
    </Card>
  );
};

export default AudioFileList;
