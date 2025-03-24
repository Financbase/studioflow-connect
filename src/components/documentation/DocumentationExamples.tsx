
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language";

const DocumentationExamples = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("docs.examples_title")}</CardTitle>
        <CardDescription>{t("docs.examples_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {t("docs.examples_content")}
        </p>
        <div className="grid gap-3">
          <Link to="/examples/basic" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium">{t("docs.basic_integration")}</h3>
                <p className="text-sm text-muted-foreground">{t("docs.basic_integration_description")}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationExamples;
