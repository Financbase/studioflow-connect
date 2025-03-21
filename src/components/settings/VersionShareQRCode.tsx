
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Link } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ColorVersion } from "@/hooks/colorVersions/types";

interface VersionShareQRCodeProps {
  version: ColorVersion;
  exportVersion: (versionId: string) => string | null;
}

const VersionShareQRCode: React.FC<VersionShareQRCodeProps> = ({ 
  version,
  exportVersion 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate QR code for the version
  const generateQRCode = async () => {
    setIsLoading(true);
    
    try {
      const versionData = exportVersion(version.id);
      
      if (!versionData) {
        throw new Error("Failed to export version data");
      }
      
      // Create a URL-safe version of the data
      const encodedData = encodeURIComponent(versionData);
      
      // Use an API to generate a QR code
      // Here we use the free QR code API from goqr.me
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=200x200&margin=10`;
      
      setQrCodeUrl(qrUrl);
    } catch (error) {
      toast({
        title: "QR Code Generation Failed",
        description: "Could not generate QR code for this theme version",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Download the QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `${version.name.replace(/\s+/g, '-')}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded",
    });
  };
  
  // Copy sharing link to clipboard
  const copyShareLink = () => {
    const versionData = exportVersion(version.id);
    
    if (!versionData) {
      toast({
        title: "Export Failed",
        description: "Could not generate sharing link",
        variant: "destructive",
      });
      return;
    }
    
    // Create a URL with the version data as a parameter
    // In a real app, you might want to use a URL shortener or store the data server-side
    const shareUrl = `${window.location.origin}/import-theme?data=${encodeURIComponent(versionData)}`;
    
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Link Copied",
      description: "Sharing link has been copied to your clipboard",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={generateQRCode}>
          <QrCode className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{version.name}"</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 pt-2">
          {isLoading ? (
            <div className="h-[200px] w-[200px] bg-muted/30 rounded-md flex items-center justify-center">
              <div className="animate-pulse">Generating QR Code...</div>
            </div>
          ) : qrCodeUrl ? (
            <div className="bg-white p-3 rounded-md">
              <img 
                src={qrCodeUrl} 
                alt="QR Code for theme sharing" 
                width={200} 
                height={200} 
                className="rounded"
              />
            </div>
          ) : (
            <div className="h-[200px] w-[200px] bg-muted/30 rounded-md flex items-center justify-center">
              <p className="text-sm text-center text-muted-foreground px-4">
                QR code will appear here
              </p>
            </div>
          )}
          
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={downloadQRCode}
              disabled={!qrCodeUrl}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={copyShareLink}
            >
              <Link className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Anyone with this QR code or link can import this theme version
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VersionShareQRCode;
