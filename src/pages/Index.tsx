
import React from "react";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import VMController from "@/components/VMController";
import DAWWorkflow from "@/components/DAWWorkflow";
import StudioMarketplace from "@/components/StudioMarketplace";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import DashboardWidget from "@/components/DashboardWidget";
import { WidgetId } from "@/contexts/DashboardContext";

const Index = () => {
  const { themeVariant } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("dashboard.title")}</h1>
            <p className="text-lg text-muted-foreground text-balance">
              {t("dashboard.subtitle")}
            </p>
          </section>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="system" title={t("widgets.system")} isPremiumFeature>
            <SystemMonitor />
          </DashboardWidget>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="vm" title="Virtual Machine Controller" isPremiumFeature>
            <VMController />
          </DashboardWidget>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="daw" title="DAW Workflow Integration" isPremiumFeature>
            <DAWWorkflow />
          </DashboardWidget>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="audio" title="Audio Analysis">
            <AudioAnalyzer />
          </DashboardWidget>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="ai" title="AI-Powered Tools" isPremiumFeature>
            <AITools />
          </DashboardWidget>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <DashboardWidget id="marketplace" title="Studio Marketplace" isPremiumFeature>
            <StudioMarketplace />
          </DashboardWidget>
        </div>
      </main>
      
      <footer className={`border-t py-6 ${themeVariant === "windows" ? "border-t-2" : ""}`}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
