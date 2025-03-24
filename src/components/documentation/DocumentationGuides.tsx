
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, FileText, Lightbulb, Code } from "lucide-react";
import HelpTip from "@/components/HelpSystem";
import { useLanguage } from "@/contexts/language";

const DocumentationGuides = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card id="getting-started">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("docs.getting_started")}
            </CardTitle>
            <HelpTip 
              title={t("docs.getting_started_help_title")} 
              content={t("docs.getting_started_help_content")}
            />
          </div>
          <CardDescription>{t("docs.getting_started_description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Link to="/docs/installation" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("docs.installation_guide")}</h3>
                  <p className="text-sm text-muted-foreground">{t("docs.installation_description")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            
            <Link to="/docs/quickstart" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("docs.quickstart_tutorial")}</h3>
                  <p className="text-sm text-muted-foreground">{t("docs.quickstart_description")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <Card id="advanced-guides">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {t("docs.advanced_guides")}
          </CardTitle>
          <CardDescription>{t("docs.advanced_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Link to="/docs/advanced/configuration" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{t("docs.configuration")}</h3>
                  <p className="text-sm text-muted-foreground">{t("docs.configuration_description")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            
            <Link to="/docs/advanced/optimization" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{t("docs.optimization")}</h3>
                  <p className="text-sm text-muted-foreground">{t("docs.optimization_description")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationGuides;
