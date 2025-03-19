
import React from "react";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import VMController from "@/components/VMController";
import DAWWorkflow from "@/components/DAWWorkflow";
import StudioMarketplace from "@/components/StudioMarketplace";
import { Separator } from "@/components/ui/separator";
import WidgetSection from "@/components/WidgetSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Panel } from "@/components/ui/panel";

const Index = () => {
  const { themeVariant } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased`}>
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">StudioFlow X</h1>
            <p className="text-lg text-muted-foreground">
              Unified music production platform for legacy integration, multi-DAW workflows, and creative tools
            </p>
          </section>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="system" title="StudioFlow System Monitor" isPremiumFeature>
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <SystemMonitor />
            </Panel>
          </WidgetSection>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="vm" title="Virtual Machine Controller" isPremiumFeature>
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <VMController />
            </Panel>
          </WidgetSection>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="daw" title="DAW Workflow Integration" isPremiumFeature>
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <DAWWorkflow />
            </Panel>
          </WidgetSection>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="audio" title="Audio Analysis">
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <AudioAnalyzer />
            </Panel>
          </WidgetSection>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="ai" title="AI-Powered Tools" isPremiumFeature>
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <AITools />
            </Panel>
          </WidgetSection>
          
          <Separator className={themeVariant === "windows" ? "border-b-2" : ""} />
          
          <WidgetSection id="marketplace" title="Studio Marketplace" isPremiumFeature>
            <Panel variant={themeVariant === "classic" || themeVariant === "windows" ? "elevated" : "default"}>
              <StudioMarketplace />
            </Panel>
          </WidgetSection>
        </div>
      </main>
      
      <footer className={`border-t py-6 ${themeVariant === "windows" ? "border-t-2" : ""}`}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 StudioFlow X. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/docs#terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/docs#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/docs#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
