
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";

const DocumentationAPI = () => {
  const { t, isInitialized } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{isInitialized ? t("docs.api_reference") : "API Reference"}</CardTitle>
          <CardDescription>{isInitialized ? t("docs.api_description") : "Complete reference documentation for the StudioFlow API"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {isInitialized ? t("docs.api_content") : "Access detailed information about all available endpoints, parameters, and response types for integrating with StudioFlow services."}
          </p>
          <div className="mt-4 grid gap-3">
            <Link to="/api/authentication" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{isInitialized ? t("docs.authentication") : "Authentication"}</h3>
                  <p className="text-sm text-muted-foreground">{isInitialized ? t("docs.authentication_description") : "Learn how to authenticate with the StudioFlow API"}</p>
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
