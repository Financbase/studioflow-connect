
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileAudio, FileImage, FileText, PlusCircle, Upload } from "lucide-react";
import { ProfileStats } from "./types";

interface AssetsTabContentProps {
  stats: ProfileStats;
}

const AssetsTabContent: React.FC<AssetsTabContentProps> = ({ stats }) => {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audio Assets</CardTitle>
              <CardDescription>
                Manage your audio files and recordings
              </CardDescription>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Audio
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.audioAssets.map(asset => (
              <div 
                key={asset.id} 
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                    <FileAudio className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{asset.size}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{asset.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Play</Button>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-full">
            View Audio Library
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Media & Documents</CardTitle>
              <CardDescription>
                Album artwork, lyric sheets and other project assets
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <FileImage className="h-4 w-4" />
              Add Media
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center">
              <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Album Cover 1</p>
            </div>
            <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Lyrics.docx</p>
            </div>
            <div className="aspect-square rounded-md bg-muted flex flex-col items-center justify-center border-2 border-dashed">
              <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Add New</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetsTabContent;
