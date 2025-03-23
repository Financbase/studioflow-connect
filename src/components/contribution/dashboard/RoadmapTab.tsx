
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GitFork, Calendar, ArrowRightCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language";

const RoadmapTab: React.FC = () => {
  const { t, isInitialized } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Roadmap</CardTitle>
        <CardDescription>Upcoming features and improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phases" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="phases">Development Phases</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phases" className="space-y-6">
            {/* Phase 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500">In Progress</Badge>
                <h3 className="font-medium">Phase 1: Foundation (3-4 months)</h3>
              </div>
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">StudioFlow Connect MVP</p>
                    <p className="text-muted-foreground">Cross-platform storage access core functionality</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Legacy Plugin Bridge</p>
                    <p className="text-muted-foreground">32-bit plugin support on 64-bit systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">User Authentication</p>
                    <p className="text-muted-foreground">Account management and system monitoring</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phase 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Coming Soon</Badge>
                <h3 className="font-medium">Phase 2: Core Features (4-6 months)</h3>
              </div>
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">StudioFlow Connect Advanced</p>
                    <p className="text-muted-foreground">Additional storage features and optimizations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Plugin Bridge Enhanced</p>
                    <p className="text-muted-foreground">Cross-platform VST/AU support</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">VM Controller Implementation</p>
                    <p className="text-muted-foreground">Resource allocation controls and management</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phase 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Future</Badge>
                <h3 className="font-medium">Phase 3: Advanced Features (6-8 months)</h3>
              </div>
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">AI Tools Integration</p>
                    <p className="text-muted-foreground">Intelligent audio processing and suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Comprehensive DAW Integration</p>
                    <p className="text-muted-foreground">Cross-DAW project conversion and synchronization</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Team Collaboration Features</p>
                    <p className="text-muted-foreground">Real-time collaborative editing and sharing</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phase 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Long-term</Badge>
                <h3 className="font-medium">Phase 4: Scaling & Optimization (Ongoing)</h3>
              </div>
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Performance Optimizations</p>
                    <p className="text-muted-foreground">Enhanced performance across all systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GitFork className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Expanded AI Capabilities</p>
                    <p className="text-muted-foreground">Advanced audio analysis and processing</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
              
              {/* Q2 2024 */}
              <div className="mb-8 ml-12 relative">
                <div className="absolute -left-10 mt-1.5 rounded-full w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-semibold mb-2">Q2 2024</h3>
                <div className="space-y-2 pl-2">
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">StudioFlow Connect MVP Launch</p>
                    <p className="text-sm text-muted-foreground">First public beta release</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">Open Source Community Establishment</p>
                    <p className="text-sm text-muted-foreground">GitHub repository and documentation</p>
                  </div>
                </div>
              </div>
              
              {/* Q3 2024 */}
              <div className="mb-8 ml-12 relative">
                <div className="absolute -left-10 mt-1.5 rounded-full w-6 h-6 flex items-center justify-center bg-primary/80 text-primary-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-semibold mb-2">Q3 2024</h3>
                <div className="space-y-2 pl-2">
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">Legacy Plugin Bridging</p>
                    <p className="text-sm text-muted-foreground">Initial support for legacy plugins</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">System Monitoring Tools</p>
                    <p className="text-sm text-muted-foreground">CPU, memory, and disk performance tracking</p>
                  </div>
                </div>
              </div>
              
              {/* Q4 2024 */}
              <div className="mb-8 ml-12 relative">
                <div className="absolute -left-10 mt-1.5 rounded-full w-6 h-6 flex items-center justify-center bg-primary/60 text-primary-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-semibold mb-2">Q4 2024</h3>
                <div className="space-y-2 pl-2">
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">Connect Advanced Features</p>
                    <p className="text-sm text-muted-foreground">Enhanced storage and file management</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">Initial Marketplace Structure</p>
                    <p className="text-sm text-muted-foreground">Framework for plugin and template sharing</p>
                  </div>
                </div>
              </div>
              
              {/* 2025 */}
              <div className="ml-12 relative">
                <div className="absolute -left-10 mt-1.5 rounded-full w-6 h-6 flex items-center justify-center bg-muted text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <h3 className="font-semibold mb-2">2025</h3>
                <div className="space-y-2 pl-2">
                  <div className="p-3 bg-card border rounded-md">
                    <p className="font-medium">AI Integration & Full Marketplace</p>
                    <p className="text-sm text-muted-foreground">Complete feature set and ecosystem development</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-6">
          <a href="https://github.com/studioflow/connect" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <ArrowRightCircle className="h-4 w-4" />
              View Full Roadmap on GitHub
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapTab;
