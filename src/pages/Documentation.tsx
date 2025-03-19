
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Cpu, Database, Music, Bot, ShoppingBag, FileVolume, FileAudio, Laptop } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Documentation = () => {
  // Handle scroll to section if hash is present in URL
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
  }, []);

  const { themeVariant } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 animate-fade-in">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">StudioFlow X Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides, tips, and best practices for maximizing your music production workflow
            </p>
          </section>
          
          <Separator />
          
          <Tabs defaultValue="features">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6 space-y-8">
              <section id="system" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">System Monitor</h2>
                    <p className="text-muted-foreground">Keep track of your system's performance in real-time to ensure optimal audio processing.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Real-time CPU usage monitoring with per-core breakdown</li>
                        <li>RAM allocation and available memory tracking</li>
                        <li>Disk I/O performance metrics with buffer analysis</li>
                        <li>Audio processing load visualization</li>
                        <li>Thermal monitoring with warning alerts</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Keep CPU usage below 70% for stable audio processing</li>
                        <li>Monitor thermal status during heavy processing sessions</li>
                        <li>Set up automatic warnings when system resources are constrained</li>
                        <li>Compare performance across different configurations</li>
                      </ul>
                      
                      <div className="p-4 bg-amber-500/10 border border-amber-200/20 rounded-md mt-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Important Consideration</h4>
                            <p className="text-sm text-muted-foreground">
                              System monitoring itself consumes resources. For ultra-low-latency applications, consider disabling real-time monitoring temporarily.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="vm" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Virtual Machine Controller</h2>
                    <p className="text-muted-foreground">Run different operating systems and DAW environments in isolated virtual machines.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Manage and switch between multiple VM environments</li>
                        <li>Resource allocation controls for CPU, RAM, and disk</li>
                        <li>Snapshot system for quick backup and restore</li>
                        <li>Audio driver pass-through configuration</li>
                        <li>Cross-VM file sharing and project synchronization</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Dedicate adequate resources to VM environments running DAWs</li>
                        <li>Create regular snapshots before making system changes</li>
                        <li>Configure automatic file synchronization for projects</li>
                        <li>Optimize each VM for its specific DAW or plugin collection</li>
                      </ul>
                      
                      <div className="p-4 bg-red-500/10 border border-red-200/20 rounded-md mt-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Critical Warning</h4>
                            <p className="text-sm text-muted-foreground">
                              Modifying VM resource allocation while audio is processing can cause dropouts or system instability. Always make changes while DAW projects are closed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="daw" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">DAW Workflow Integration</h2>
                    <p className="text-muted-foreground">Seamlessly integrate and synchronize multiple digital audio workstations.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Cross-DAW project conversion and synchronization</li>
                        <li>Plugin database management across all workstations</li>
                        <li>Template sharing and standardization</li>
                        <li>MIDI and audio routing between DAWs</li>
                        <li>Unified keycommand system for multiple DAWs</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Establish a primary DAW and secondary specialist DAWs</li>
                        <li>Create standardized naming conventions across platforms</li>
                        <li>Maintain synchronized plugin versions across systems</li>
                        <li>Document workflow processes for consistency</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Supported DAWs</h4>
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
                          <h4 className="font-medium">Integration Capabilities</h4>
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
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="audio" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileAudio className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Audio Analysis</h2>
                    <p className="text-muted-foreground">Detailed audio analysis tools for production, mixing, and mastering workflows.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Real-time spectral analysis with reference track comparisons</li>
                        <li>Dynamic range visualization and monitoring</li>
                        <li>Phase correlation analysis across channels</li>
                        <li>LUFS and peak metering for broadcast standards</li>
                        <li>Harmonic content analysis for tonal balance</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Use reference tracks from the same genre for spectral comparison</li>
                        <li>Monitor phase correlation to avoid cancellation issues</li>
                        <li>Target appropriate LUFS levels for your distribution platform</li>
                        <li>Regular calibration of monitoring environment</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4">
                        <h4 className="font-medium">Analysis Presets</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Mastering</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                Standards-compliant LUFS and peak analysis
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Mixing</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                Frequency balance and channel comparisons
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Tracking</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                Distortion detection and transient analysis
                              </CardDescription>
                            </CardContent>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Reference</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <CardDescription className="text-xs">
                                Multi-track reference comparison tools
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="ai" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Robot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">AI-Powered Tools</h2>
                    <p className="text-muted-foreground">Machine learning tools to enhance creativity and streamline your workflow.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Intelligent sample recommendations based on project context</li>
                        <li>Style-matching for compositions and arrangements</li>
                        <li>Smart EQ and dynamics processing suggestions</li>
                        <li>Melody and chord progression generators</li>
                        <li>Vocal tuning and timing correction with natural results</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Use AI suggestions as starting points, not final solutions</li>
                        <li>Train custom models on your own productions for personalized results</li>
                        <li>Combine multiple AI tools for comprehensive workflow enhancement</li>
                        <li>Document successful AI configurations for future projects</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Creative Tools</h4>
                          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                            <li>MIDI pattern generator</li>
                            <li>Chord progression builder</li>
                            <li>Rhythmic variation creator</li>
                            <li>Melody extrapolation</li>
                            <li>Style transfer engine</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Technical Tools</h4>
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
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
              
              <section id="marketplace" className={`p-6 border rounded-lg ${themeVariant === "windows" ? "windows-panel" : themeVariant === "classic" ? "classic-panel" : themeVariant === "legacy" ? "legacy-panel" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Studio Marketplace</h2>
                    <p className="text-muted-foreground">Discover, purchase, and sell audio resources in an integrated marketplace.</p>
                    
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Key Features</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Curated selection of plugins, samples, and presets</li>
                        <li>In-app previewing and testing before purchase</li>
                        <li>Direct installation to your system without leaving StudioFlow</li>
                        <li>Creator tools for publishing your own content</li>
                        <li>Compatibility checking with your existing setup</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                      <ul className="list-disc ml-5 space-y-2">
                        <li>Test plugins and samples in context with your project</li>
                        <li>Use the compatibility checker before purchasing</li>
                        <li>Organize purchased content with the integrated library manager</li>
                        <li>Create collections for quick access to favorite resources</li>
                      </ul>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-md mt-4 grid grid-cols-1 gap-4">
                        <h4 className="font-medium">Featured Categories</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Plugins</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Samples</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Presets</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">MIDI</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Templates</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="h-full">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Tutorials</CardTitle>
                            </CardHeader>
                          </Card>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link to="/" className="text-primary hover:underline">Return to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started with StudioFlow X</CardTitle>
                    <CardDescription>A complete walkthrough of basic features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Learn how to set up your workspace, configure connections, and establish your workflow in StudioFlow X.</p>
                    <button className="text-primary text-sm hover:underline mt-4">Watch tutorial</button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Multi-DAW Workflows</CardTitle>
                    <CardDescription>Seamlessly work across multiple platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Master techniques for maintaining consistent workflows between different DAWs and environments.</p>
                    <button className="text-primary text-sm hover:underline mt-4">Watch tutorial</button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Assisted Production</CardTitle>
                    <CardDescription>Leverage AI to enhance your creativity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Discover how to use StudioFlow's AI tools to generate ideas, improve workflow, and solve mixing challenges.</p>
                    <button className="text-primary text-sm hover:underline mt-4">Watch tutorial</button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Optimization</CardTitle>
                    <CardDescription>Get the most from your hardware</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Learn to configure your system for optimal performance with audio production workloads.</p>
                    <button className="text-primary text-sm hover:underline mt-4">Watch tutorial</button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium">What are the system requirements for StudioFlow X?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      StudioFlow X requires a minimum of 8GB RAM, 4-core CPU, and 10GB of free storage space. For optimal performance with multiple DAWs, we recommend 16GB+ RAM and a 6+ core CPU.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Can I use StudioFlow X with my existing plugins?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Yes, StudioFlow X is designed to work with your existing VST, AU, and AAX plugins. The plugin manager will scan and catalog all compatible plugins installed on your system.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">How do I transfer projects between different DAWs?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      StudioFlow X provides DAW-specific project conversion tools that maintain as much information as possible between formats. For best results, use the standardized template system to establish consistent naming and routing conventions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Is my data stored securely?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      All user data is stored locally by default. If you enable cloud synchronization, data is encrypted before being transmitted and stored. You retain full control over what is synchronized.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">What's the difference between Free, Standard, and Pro plans?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The Free plan includes basic audio analysis and limited DAW integration. Standard adds full DAW integration and system monitoring. Pro includes all features, including AI tools, virtual machine management, and custom UI themes.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">How do I get support if I encounter issues?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      All users have access to our documentation and community forums. Standard and Pro users also receive priority email support, and Pro users get access to live chat support and scheduled consultation calls.
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

export default Documentation;
