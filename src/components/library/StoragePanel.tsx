
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, HardDrive } from "lucide-react";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const StoragePanel: React.FC = () => {
  const { t } = useLanguage();
  
  // Mock data - in a real app this would come from an API
  const storageData = {
    total: 20, // GB
    used: 8.4, // GB
    free: 11.6, // GB
    percentage: 42, // %
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">{t("library.storagePanel.title")}</CardTitle>
        </div>
        <CardDescription>
          {storageData.used.toFixed(1)} GB / {storageData.total} GB
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress value={storageData.percentage} className="h-2 mb-4" />
        
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">{t("library.storagePanel.used")}</p>
            <p className="font-medium">{storageData.used.toFixed(1)} GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">{t("library.storagePanel.free")}</p>
            <p className="font-medium">{storageData.free.toFixed(1)} GB</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full text-primary">
          <span>{t("library.storagePanel.upgrade")}</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoragePanel;
