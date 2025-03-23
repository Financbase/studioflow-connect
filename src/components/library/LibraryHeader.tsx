
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { toast } from "@/hooks/use-toast";

const LibraryHeader: React.FC = () => {
  const { t } = useLanguage();

  const handleUpload = () => {
    toast({
      title: t("library.uploadStarted"),
      description: t("library.uploadDescription"),
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">{t("library.title")}</h1>
        <p className="text-muted-foreground">{t("library.description")}</p>
      </div>
      
      <Button onClick={handleUpload} className="gap-2">
        <Upload className="h-4 w-4" />
        {t("library.upload")}
      </Button>
    </div>
  );
};

export default LibraryHeader;
