
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { toast } from "@/hooks/use-toast";

const LibraryHeader: React.FC = () => {
  const { t, isInitialized } = useLanguage();

  useEffect(() => {
    // Debug translations in component
    if (isInitialized) {
      console.log("Library translations:", {
        title: t("library.title"),
        description: t("library.description"),
        upload: t("library.upload")
      });
    }
  }, [isInitialized, t]);

  const handleUpload = () => {
    toast({
      title: t("library.uploadStarted"),
      description: t("library.uploadDescription"),
    });
  };

  if (!isInitialized) {
    // Show minimal UI while translations load
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

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
