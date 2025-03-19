
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Cpu, Database, Music, Bot, ShoppingBag, FileVolume, FileAudio, Laptop } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentationProps {
  page?: string;
}

const Documentation: React.FC<DocumentationProps> = ({ page = "docs" }) => {
  const { language, t } = useLanguage();
  
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth"
          });
        }, 100);
      }
    }
    
    // Set appropriate tab based on page prop
    if (page && page !== "docs") {
      // You could implement specific content for terms, privacy, contact pages
      document.title = `StudioFlow X | ${page.charAt(0).toUpperCase() + page.slice(1)}`;
    }
  }, [page]);

  const { themeVariant } = useTheme();
  
  // Helper function to get translation or fallback
  const getTranslation = (key: string, fallback: string) => {
    // Look up the key in our translations
    return t(key) || fallback;
  };
  
  // Render different content based on page prop
  if (page === "terms") {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
          <div className="max-w-[800px] mx-auto space-y-8">
            <section className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{getTranslation("terms.title", "Terms and Conditions")}</h1>
              <p className="text-lg text-muted-foreground">
                {getTranslation("terms.description", "Please read these terms and conditions carefully before using StudioFlow X")}
              </p>
            </section>
            
            <Separator />
            
            <div className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">{getTranslation("terms.agreement", "User Agreement")}</h2>
              <p className="mb-4">{getTranslation("terms.agreement_description", "By accessing or using StudioFlow X, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("terms.license", "License")}</h3>
              <p className="mb-4">{getTranslation("terms.license_description", "StudioFlow X grants you a limited, non-exclusive, non-transferable license to use the application for your personal or business use in accordance with these Terms.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("terms.restrictions", "Restrictions")}</h3>
              <p className="mb-4">{getTranslation("terms.restrictions_description", "You are specifically prohibited from: modifying, copying, or creating derivative works based on the Software or any part thereof; reverse engineering, disassembling, or otherwise attempting to discover the source code; removing any proprietary notices or labels; or transferring the Software to third parties.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("terms.subscription", "Subscription")}</h3>
              <p className="mb-4">{getTranslation("terms.subscription_description", "Access to certain features of StudioFlow X requires a paid subscription. Subscription fees are charged in advance on a monthly or annual basis. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("terms.termination", "Termination")}</h3>
              <p className="mb-4">{getTranslation("terms.termination_description", "StudioFlow X reserves the right to terminate your access to the service for violation of these Terms or for any other reason at its discretion.")}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
            </div>
          </div>
        </main>
        
        <footer className="border-t py-6">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 StudioFlow X. {getTranslation("common.all_rights_reserved", "All rights reserved.")}</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-foreground transition-colors">{getTranslation("common.terms", "Terms")}</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">{getTranslation("common.privacy", "Privacy")}</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">{getTranslation("common.contact", "Contact")}</Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  if (page === "privacy") {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
          <div className="max-w-[800px] mx-auto space-y-8">
            <section className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{getTranslation("privacy.title", "Privacy Policy")}</h1>
              <p className="text-lg text-muted-foreground">
                {getTranslation("privacy.description", "How we collect, use, and protect your information")}
              </p>
            </section>
            
            <Separator />
            
            <div className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">{getTranslation("privacy.collection", "Information We Collect")}</h2>
              <p className="mb-4">{getTranslation("privacy.collection_description", "We collect information that you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support. This may include your name, email address, payment information, and usage data.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("privacy.usage", "How We Use Your Information")}</h3>
              <p className="mb-4">{getTranslation("privacy.usage_description", "We use the information we collect to provide, maintain, and improve our services, to process your subscription, communicate with you, and for research and analytics purposes.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("privacy.sharing", "Information Sharing")}</h3>
              <p className="mb-4">{getTranslation("privacy.sharing_description", "We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("privacy.security", "Data Security")}</h3>
              <p className="mb-4">{getTranslation("privacy.security_description", "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.")}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-2">{getTranslation("privacy.rights", "Your Rights")}</h3>
              <p className="mb-4">{getTranslation("privacy.rights_description", "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data.")}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
            </div>
          </div>
        </main>
        
        <footer className="border-t py-6">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 StudioFlow X. {getTranslation("common.all_rights_reserved", "All rights reserved.")}</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-foreground transition-colors">{getTranslation("common.terms", "Terms")}</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">{getTranslation("common.privacy", "Privacy")}</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">{getTranslation("common.contact", "Contact")}</Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  if (page === "contact") {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
          <div className="max-w-[800px] mx-auto space-y-8">
            <section className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{getTranslation("contact.title", "Contact Us")}</h1>
              <p className="text-lg text-muted-foreground">
                {getTranslation("contact.description", "Reach out to our support team")}
              </p>
            </section>
            
            <Separator />
            
            <div className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">{getTranslation("contact.support", "Support Options")}</h2>
              <p className="mb-4">{getTranslation("contact.support_description", "Our support team is available to help you with any questions or issues you may have with StudioFlow X.")}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{getTranslation("contact.email", "Email Support")}</h3>
                  <p className="mb-2">{getTranslation("contact.email_description", "For general inquiries and non-urgent support:")}</p>
                  <p className="font-medium">support@studioflowx.com</p>
                  <p className="text-sm text-muted-foreground mt-2">{getTranslation("contact.response_time", "Response time: Within 24 hours")}</p>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{getTranslation("contact.phone", "Phone Support")}</h3>
                  <p className="mb-2">{getTranslation("contact.phone_description", "For urgent matters (Pro subscribers only):")}</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-2">{getTranslation("contact.hours", "Hours: Monday-Friday, 9am-5pm EST")}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">{getTranslation("contact.headquarters", "Headquarters")}</h3>
              <p className="mb-1">StudioFlow X Inc.</p>
              <p className="mb-1">123 Music Avenue</p>
              <p className="mb-1">Suite 456</p>
              <p className="mb-1">Los Angeles, CA 90001</p>
              <p>United States</p>
            </div>
            
            <div className="flex justify-between items-center">
              <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
            </div>
          </div>
        </main>
        
        <footer className="border-t py-6">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 StudioFlow X. {getTranslation("common.all_rights_reserved", "All rights reserved.")}</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-foreground transition-colors">{getTranslation("common.terms", "Terms")}</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">{getTranslation("common.privacy", "Privacy")}</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">{getTranslation("common.contact", "Contact")}</Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Default documentation page content
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{getTranslation("docs.title", "StudioFlow X Documentation")}</h1>
            <p className="text-lg text-muted-foreground">
              {getTranslation("docs.description", "Comprehensive guides, tips, and best practices for maximizing your music production workflow")}
            </p>
          </section>
          
          <Separator />
          
          <Tabs defaultValue="features">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
              <TabsTrigger value="features">{getTranslation("docs.features", "Features")}</TabsTrigger>
              <TabsTrigger value="tutorials">{getTranslation("docs.tutorials", "Tutorials")}</TabsTrigger>
              <TabsTrigger value="faq">{getTranslation("docs.faq", "FAQ")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6 space-y-8">
              {/* System Monitor section */}
              <section id="system" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.system_monitor", "System Monitor")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.system_monitor_desc", "Keep track of your system's performance in real-time to ensure optimal audio processing.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.system_feature1", "Real-time CPU usage monitoring with per-core breakdown")}</li>
                        <li>{getTranslation("docs.system_feature2", "RAM allocation and available memory tracking")}</li>
                        <li>{getTranslation("docs.system_feature3", "Disk I/O performance metrics with buffer analysis")}</li>
                        <li>{getTranslation("docs.system_feature4", "Audio processing load visualization")}</li>
                        <li>{getTranslation("docs.system_feature5", "Thermal monitoring with warning alerts")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.system_practice1", "Keep CPU usage below 70% for stable audio processing")}</li>
                        <li>{getTranslation("docs.system_practice2", "Monitor thermal status during heavy processing sessions")}</li>
                        <li>{getTranslation("docs.system_practice3", "Set up automatic warnings when system resources are constrained")}</li>
                        <li>{getTranslation("docs.system_practice4", "Compare performance across different configurations")}</li>
                      </ul>
                      
                      <div className="p-4 bg-amber-500/10 border border-amber-200/20 rounded-md mt-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{getTranslation("docs.important", "Important Consideration")}</h4>
                            <p className="text-sm text-muted-foreground">
                              {getTranslation("docs.system_important", "System monitoring itself consumes resources. For ultra-low-latency applications, consider disabling real-time monitoring temporarily.")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* VM Controller section */}
              <section id="vm" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.vm_controller", "Virtual Machine Controller")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.vm_controller_desc", "Run different operating systems and DAW environments in isolated virtual machines.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.vm_feature1", "Manage and switch between multiple VM environments")}</li>
                        <li>{getTranslation("docs.vm_feature2", "Resource allocation controls for CPU, RAM, and disk")}</li>
                        <li>{getTranslation("docs.vm_feature3", "Snapshot system for quick backup and restore")}</li>
                        <li>{getTranslation("docs.vm_feature4", "Audio driver pass-through configuration")}</li>
                        <li>{getTranslation("docs.vm_feature5", "Cross-VM file sharing and project synchronization")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.vm_practice1", "Dedicate adequate resources to VM environments running DAWs")}</li>
                        <li>{getTranslation("docs.vm_practice2", "Create regular snapshots before making system changes")}</li>
                        <li>{getTranslation("docs.vm_practice3", "Configure automatic file synchronization for projects")}</li>
                        <li>{getTranslation("docs.vm_practice4", "Optimize each VM for its specific DAW or plugin collection")}</li>
                      </ul>
                      
                      <div className="p-4 bg-red-500/10 border border-red-200/20 rounded-md mt-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{getTranslation("docs.critical_warning", "Critical Warning")}</h4>
                            <p className="text-sm text-muted-foreground">
                              {getTranslation("docs.vm_warning", "Modifying VM resource allocation while audio is processing can cause dropouts or system instability. Always make changes while DAW projects are closed.")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* DAW Workflow Integration section */}
              <section id="daw" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.daw_integration", "DAW Workflow Integration")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.daw_integration_desc", "Seamlessly integrate and synchronize multiple digital audio workstations.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.daw_feature1", "Cross-DAW project conversion and synchronization")}</li>
                        <li>{getTranslation("docs.daw_feature2", "Plugin database management across all workstations")}</li>
                        <li>{getTranslation("docs.daw_feature3", "Template sharing and standardization")}</li>
                        <li>{getTranslation("docs.daw_feature4", "MIDI and audio routing between DAWs")}</li>
                        <li>{getTranslation("docs.daw_feature5", "Unified keycommand system for multiple DAWs")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.daw_practice1", "Establish a primary DAW and secondary specialist DAWs")}</li>
                        <li>{getTranslation("docs.daw_practice2", "Create standardized naming conventions across platforms")}</li>
                        <li>{getTranslation("docs.daw_practice3", "Maintain synchronized plugin versions across systems")}</li>
                        <li>{getTranslation("docs.daw_practice4", "Document workflow processes for consistency")}</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">{getTranslation("docs.supported_daws", "Supported DAWs")}</h4>
                          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                            <li>Ableton Live</li>
                            <li>Logic Pro</li>
                            <li>Pro Tools</li>
                            <li>FL Studio</li>
                            <li>Cubase</li>
                            <li>Studio One</li>
                            <li>Reason</li>
                            <li>Bitwig Studio</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">{getTranslation("docs.integration_caps", "Integration Capabilities")}</h4>
                          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                            <li>Project file conversion</li>
                            <li>Plugin mapping</li>
                            <li>Template synchronization</li>
                            <li>Audio format standardization</li>
                            <li>MIDI mapping translation</li>
                            <li>Control surface integration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Audio Analysis section */}
              <section id="audio" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileAudio className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.audio_analysis", "Audio Analysis")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.audio_analysis_desc", "Detailed audio analysis tools for production, mixing, and mastering workflows.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.audio_feature1", "Real-time spectral analysis with reference track comparisons")}</li>
                        <li>{getTranslation("docs.audio_feature2", "Dynamic range visualization and monitoring")}</li>
                        <li>{getTranslation("docs.audio_feature3", "Phase correlation analysis across channels")}</li>
                        <li>{getTranslation("docs.audio_feature4", "LUFS and peak metering for broadcast standards")}</li>
                        <li>{getTranslation("docs.audio_feature5", "Harmonic content analysis for tonal balance")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.audio_practice1", "Use reference tracks from the same genre for spectral comparison")}</li>
                        <li>{getTranslation("docs.audio_practice2", "Monitor phase correlation to avoid cancellation issues")}</li>
                        <li>{getTranslation("docs.audio_practice3", "Target appropriate LUFS levels for your distribution platform")}</li>
                        <li>{getTranslation("docs.audio_practice4", "Regular calibration of monitoring environment")}</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4">
                        <h4 className="font-medium">{getTranslation("docs.analysis_presets", "Analysis Presets")}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">{getTranslation("docs.mastering", "Mastering")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                {getTranslation("docs.mastering_desc", "Standards-compliant LUFS and peak analysis")}
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">{getTranslation("docs.mixing", "Mixing")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                {getTranslation("docs.mixing_desc", "Frequency balance and channel comparisons")}
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">{getTranslation("docs.tracking", "Tracking")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                {getTranslation("docs.tracking_desc", "Distortion detection and transient analysis")}
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">{getTranslation("docs.reference", "Reference")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                {getTranslation("docs.reference_desc", "Multi-track reference comparison tools")}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* AI Tools section */}
              <section id="ai" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.ai_tools", "AI-Powered Tools")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.ai_tools_desc", "Machine learning tools to enhance creativity and streamline your workflow.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.ai_feature1", "Intelligent sample recommendations based on project context")}</li>
                        <li>{getTranslation("docs.ai_feature2", "Style-matching for compositions and arrangements")}</li>
                        <li>{getTranslation("docs.ai_feature3", "Smart EQ and dynamics processing suggestions")}</li>
                        <li>{getTranslation("docs.ai_feature4", "Melody and chord progression generators")}</li>
                        <li>{getTranslation("docs.ai_feature5", "Vocal tuning and timing correction with natural results")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.ai_practice1", "Use AI suggestions as starting points, not final solutions")}</li>
                        <li>{getTranslation("docs.ai_practice2", "Train custom models on your own productions for personalized results")}</li>
                        <li>{getTranslation("docs.ai_practice3", "Combine multiple AI tools for comprehensive workflow enhancement")}</li>
                        <li>{getTranslation("docs.ai_practice4", "Document successful AI configurations for future projects")}</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">{getTranslation("docs.creative_tools", "Creative Tools")}</h4>
                          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                            <li>MIDI pattern generator</li>
                            <li>Chord progression builder</li>
                            <li>Rhythmic variation creator</li>
                            <li>Melody extrapolation</li>
                            <li>Style transfer engine</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">{getTranslation("docs.technical_tools", "Technical Tools")}</h4>
                          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                            <li>Intelligent gain staging</li>
                            <li>Mix balance analyzer</li>
                            <li>Adaptive dynamics processing</li>
                            <li>Harmonic enhancement</li>
                            <li>Spatial positioning assistant</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Marketplace section */}
              <section id="marketplace" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{getTranslation("docs.studio_marketplace", "Studio Marketplace")}</h2>
                    <p className="text-muted-foreground">{getTranslation("docs.studio_marketplace_desc", "Browse and purchase tools, presets, and sample packs to enhance your studio setup.")}</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{getTranslation("docs.key_features", "Key Features")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.marketplace_feature1", "Curated collection of high-quality plugins and tools")}</li>
                        <li>{getTranslation("docs.marketplace_feature2", "Direct integration with your existing projects")}</li>
                        <li>{getTranslation("docs.marketplace_feature3", "One-click installation and updates")}</li>
                        <li>{getTranslation("docs.marketplace_feature4", "Community ratings and reviews")}</li>
                        <li>{getTranslation("docs.marketplace_feature5", "Subscription options for premium content")}</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">{getTranslation("docs.best_practices", "Best Practices")}</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>{getTranslation("docs.marketplace_practice1", "Create a wishlist for budget planning")}</li>
                        <li>{getTranslation("docs.marketplace_practice2", "Try demo versions before purchasing")}</li>
                        <li>{getTranslation("docs.marketplace_practice3", "Keep track of your licenses and activation codes")}</li>
                        <li>{getTranslation("docs.marketplace_practice4", "Subscribe to notifications for updates and sales")}</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">{getTranslation("common.back_to_dashboard", "Return to Dashboard")}</Link>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-6">
              <div className="p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{getTranslation("docs.coming_soon", "Coming Soon")}</h2>
                <p className="text-muted-foreground">
                  {getTranslation("docs.tutorials_coming_soon", "Our team is currently developing comprehensive tutorials for StudioFlow X. Check back soon for detailed guides on how to make the most of your music production workflow.")}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-6">
              <div className="p-6 border rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{getTranslation("docs.faq_title", "Frequently Asked Questions")}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">{getTranslation("docs.faq_q1", "How do I optimize my system for audio processing?")}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {getTranslation("docs.faq_a1", "Use the System Monitor to identify resource bottlenecks. Increase buffer size for stability, close unused applications, disable unnecessary background services, and consider dedicated audio drives for improved performance.")}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{getTranslation("docs.faq_q2", "Can I use multiple DAWs simultaneously?")}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {getTranslation("docs.faq_a2", "Yes, with DAW Workflow Integration you can run multiple DAWs and share audio and MIDI between them. Virtual audio routing is configured automatically, and project files can be synchronized for a seamless experience.")}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{getTranslation("docs.faq_q3", "Which subscription tier is right for me?")}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {getTranslation("docs.faq_a3", "The Free tier provides essential monitoring tools and basic integration. The Standard tier adds advanced analysis and multi-DAW support. The Pro tier includes everything plus AI tools and priority support. Choose based on your production complexity and professional needs.")}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 StudioFlow X. {getTranslation("common.all_rights_reserved", "All rights reserved.")}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">{getTranslation("common.terms", "Terms")}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{getTranslation("common.privacy", "Privacy")}</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">{getTranslation("common.contact", "Contact")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
