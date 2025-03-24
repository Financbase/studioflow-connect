
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Share2, Users, Zap, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";

const StudioFlowHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <motion.div 
        className="flex items-start justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-2xl font-semibold">{t("connect.title")}</h2>
          <p className="text-muted-foreground">{t("connect.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            {t("connect.openSource")}
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">{t("connect.contribute")}</span>
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-muted/30 p-4 rounded-lg mb-6 border border-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="font-medium">{t("connect.foundation")}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("connect.description")}
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button size="sm" variant="default">
            <Share2 className="h-4 w-4 mr-2" />
            {t("connect.supportVR")}
          </Button>
          <Button size="sm" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            {t("connect.joinCommunity")}
          </Button>
          <Button size="sm" variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            {t("connect.documentation")}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default StudioFlowHeader;
