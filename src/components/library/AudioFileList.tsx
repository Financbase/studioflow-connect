
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileAudio, Music } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AudioFile {
  name: string;
  size: string;
  duration: string;
  type: string;
}

interface AudioFileListProps {
  files: AudioFile[];
}

const AudioFileList = ({ files }: AudioFileListProps) => {
  const handleSampleClick = (sample: AudioFile) => {
    toast({
      title: "Sample selected",
      description: `Selected ${sample.name}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Assets</CardTitle>
        <CardDescription>Browse all your audio files and samples</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleSampleClick(file)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <FileAudio className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {file.duration}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{file.type}</Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Music className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p>No audio files found matching your search</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Import</Button>
        <Button variant="outline">Organize</Button>
      </CardFooter>
    </Card>
  );
};

export default AudioFileList;
