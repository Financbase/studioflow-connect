
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";

const DocumentationExamples = () => {
  const { t, isInitialized } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{isInitialized ? t("docs.examples_title") : "Code Examples"}</CardTitle>
          <CardDescription>{isInitialized ? t("docs.examples_description") : "Implementation examples for common use cases"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {isInitialized ? t("docs.examples_content") : "Browse through our collection of code examples showing how to implement common StudioFlow features in your own projects."}
          </p>
          <div className="grid gap-3">
            <Link to="/examples/basic" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium">{isInitialized ? t("docs.basic_integration") : "Basic Integration"}</h3>
                  <p className="text-sm text-muted-foreground">{isInitialized ? t("docs.basic_integration_description") : "How to integrate StudioFlow into your DAW"}</p>
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

export default DocumentationExamples;
