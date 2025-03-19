
import React, { useEffect } from "react";
import Header from "@/components/Header";
import SystemMonitor from "@/components/SystemMonitor";
import AudioAnalyzer from "@/components/AudioAnalyzer";
import AITools from "@/components/AITools";
import VMController from "@/components/VMController";
import DAWWorkflow from "@/components/DAWWorkflow";
import StudioMarketplace from "@/components/StudioMarketplace";
import { Separator } from "@/components/ui/separator";
import WidgetSection from "@/components/WidgetSection";

const Index = () => {
  // Set dark mode by default
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">StudioFlow X</h1>
            <p className="text-lg text-muted-foreground">
              Unified music production platform for legacy integration, multi-DAW workflows, and creative tools
            </p>
          </section>
          
          <Separator />
          
          <WidgetSection id="system" title="StudioFlow System Monitor" isPremiumFeature>
            <SystemMonitor />
          </WidgetSection>
          
          <Separator />
          
          <WidgetSection id="vm" title="Virtual Machine Controller" isPremiumFeature>
            <VMController />
          </WidgetSection>
          
          <Separator />
          
          <WidgetSection id="daw" title="DAW Workflow Integration" isPremiumFeature>
            <DAWWorkflow />
          </WidgetSection>
          
          <Separator />
          
          <WidgetSection id="audio" title="Audio Analysis">
            <AudioAnalyzer />
          </WidgetSection>
          
          <Separator />
          
          <WidgetSection id="ai" title="AI-Powered Tools" isPremiumFeature>
            <AITools />
          </WidgetSection>
          
          <Separator />
          
          <WidgetSection id="marketplace" title="Studio Marketplace" isPremiumFeature>
            <StudioMarketplace />
          </WidgetSection>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 StudioFlow X. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
