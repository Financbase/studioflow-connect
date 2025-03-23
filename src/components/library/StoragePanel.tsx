
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language/LanguageProvider";

const StoragePanel = () => {
  const { t } = useLanguage();
  // Mock data - in a real app, this would come from a hook or API
  const usedStorage = 15;
  const totalStorage = 30;
  const usedPercentage = (usedStorage / totalStorage) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {t("library.storagePanel.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress value={usedPercentage} className="h-2 mb-4" />
        <div className="flex justify-between text-sm mb-1.5">
          <div className="flex flex-col">
            <span className="text-muted-foreground mb-1">{t("library.storagePanel.used")}</span>
            <span className="font-medium">{usedStorage} GB</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground mb-1">{t("library.storagePanel.free")}</span>
            <span className="font-medium">{totalStorage - usedStorage} GB</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full gap-1 text-primary" size="sm">
          {t("library.storagePanel.upgrade")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoragePanel;
