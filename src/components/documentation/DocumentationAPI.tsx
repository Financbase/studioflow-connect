
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";

const DocumentationAPI = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("docs.api_reference")}</CardTitle>
          <CardDescription>{t("docs.api_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t("docs.api_content")}
          </p>
          <div className="mt-4 grid gap-3">
            <Link to="/api/authentication" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{t("docs.authentication")}</h3>
                  <p className="text-sm text-muted-foreground">{t("docs.authentication_description")}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DocumentationAPI;
