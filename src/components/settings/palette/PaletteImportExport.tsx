
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Upload, Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useColorPalette } from "@/contexts/ColorPaletteContext";

interface PaletteImportExportProps {
  onImport?: () => void;
}

const PaletteImportExport: React.FC<PaletteImportExportProps> = ({ onImport }) => {
  const { colorPalettes, saveCurrentColorPalette, getCurrentPaletteColors } = useColorPalette();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportData, setExportData] = useState("");
  const [importData, setImportData] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  // Prepare current palette for export
  const handlePrepareExport = () => {
    const currentColors = getCurrentPaletteColors();
    const exportObject = {
      type: "studioflow-color-palette",
      version: "1.0",
      data: currentColors,
      timestamp: new Date().toISOString()
    };
    
    setExportData(JSON.stringify(exportObject, null, 2));
    setExportDialogOpen(true);
  };
  
  // Handle the import of palette data
  const handleImport = () => {
    try {
      const importedData = JSON.parse(importData);
      
      // Validate the imported data
      if (!importedData.data || importedData.type !== "studioflow-color-palette") {
        throw new Error("Invalid palette data format");
      }
      
      // Save the imported palette
      saveCurrentColorPalette(
        `Imported Palette ${new Date().toLocaleString()}`,
        importedData.data,
        `Imported on ${new Date().toLocaleString()}`
      );
      
      setImportDialogOpen(false);
      setImportData("");
      
      toast({
        title: "Palette Imported",
        description: "The color palette has been successfully imported and applied"
      });
      
      if (onImport) {
        onImport();
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "The provided data is not a valid color palette",
        variant: "destructive"
      });
    }
  };
  
  // Copy export data to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData);
    setIsCopied(true);
    
    toast({
      title: "Copied to Clipboard",
      description: "Palette data has been copied to your clipboard"
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Download export data as JSON file
  const downloadAsFile = () => {
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = `studioflow-palette-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Palette Downloaded",
      description: "The palette has been saved as a JSON file"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import & Export Palettes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={handlePrepareExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Current Palette
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Export Palette</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This is your palette data in JSON format. Copy it to share with others or save it for future use.
                </p>
                <Textarea 
                  value={exportData} 
                  readOnly 
                  className="font-mono text-xs h-60"
                />
                <div className="flex justify-between gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={downloadAsFile}
                    variant="default"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download as File
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Palette
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Import Palette</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Paste the palette JSON data below to import it into your collection.
                </p>
                <Textarea 
                  value={importData} 
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder={`{ "type": "studioflow-color-palette", "data": { "primary": "#4f46e5", ... } }`}
                  className="font-mono text-xs h-60"
                />
                <Button
                  onClick={handleImport}
                  disabled={!importData.trim()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Palette
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaletteImportExport;
