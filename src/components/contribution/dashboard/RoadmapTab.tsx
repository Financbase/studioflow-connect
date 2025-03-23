
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GitFork, Calendar, ArrowRightCircle, Check, AlertCircle, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RoadmapTab: React.FC = () => {
  const { t, isInitialized } = useLanguage();
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase1");

  const phaseProgress = {
    phase1: 75, // 75% complete
    phase2: 25, // 25% complete
    phase3: 0,  // Not started
    phase4: 0   // Not started
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Roadmap</CardTitle>
        <CardDescription>Upcoming features and improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phases" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="phases">Development Phases</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="detail">Detailed View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phases" className="space-y-6">
            {/* Phase 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500">In Progress</Badge>
                <h3 className="font-medium">Phase 1: Foundation (3-4 months)</h3>
                <span className="ml-auto text-sm text-muted-foreground">{phaseProgress.phase1}% Complete</span>
              </div>
              <Progress value={phaseProgress.phase1} className="h-2" />
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">StudioFlow Connect MVP</p>
                    <p className="text-muted-foreground">Cross-platform storage access core functionality</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Legacy Plugin Bridge</p>
                    <p className="text-muted-foreground">32-bit plugin support on 64-bit systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-500 mt-0.5" />
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
                <span className="ml-auto text-sm text-muted-foreground">{phaseProgress.phase2}% Complete</span>
              </div>
              <Progress value={phaseProgress.phase2} className="h-2" />
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">StudioFlow Connect Advanced</p>
                    <p className="text-muted-foreground">Additional storage features and optimizations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Plugin Bridge Enhanced</p>
                    <p className="text-muted-foreground">Cross-platform VST/AU support</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
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
                <span className="ml-auto text-sm text-muted-foreground">{phaseProgress.phase3}% Complete</span>
              </div>
              <Progress value={phaseProgress.phase3} className="h-2" />
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">AI Tools Integration</p>
                    <p className="text-muted-foreground">Intelligent audio processing and suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Comprehensive DAW Integration</p>
                    <p className="text-muted-foreground">Cross-DAW project conversion and synchronization</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
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
                <span className="ml-auto text-sm text-muted-foreground">{phaseProgress.phase4}% Complete</span>
              </div>
              <Progress value={phaseProgress.phase4} className="h-2" />
              <div className="ml-6 pl-2 border-l text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Performance Optimizations</p>
                    <p className="text-muted-foreground">Enhanced performance across all systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium">StudioFlow Connect MVP Launch</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">First public beta release</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Open Source Community Establishment</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">Completed</Badge>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Legacy Plugin Bridging</p>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500">In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial support for legacy plugins</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">System Monitoring Tools</p>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500">In Progress</Badge>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Connect Advanced Features</p>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Planned</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Enhanced storage and file management</p>
                  </div>
                  <div className="p-3 bg-card border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Initial Marketplace Structure</p>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Planned</Badge>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium">AI Integration & Full Marketplace</p>
                      <Badge variant="outline">Future</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Complete feature set and ecosystem development</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detail" className="mt-0">
            <Accordion type="single" collapsible defaultValue="phase1">
              <AccordionItem value="phase1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">In Progress</Badge>
                    <span>Phase 1: Foundation</span>
                    <Progress value={phaseProgress.phase1} className="w-24 h-2 ml-2" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-6 pt-2">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="min-w-4 pt-1">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">StudioFlow Connect MVP</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Cross-platform storage access with universal format support across operating systems.
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1 border-l-2 border-muted pl-3">
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Universal drive formatting implementation</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Cross-platform file system driver</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Basic file versioning</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="min-w-4 pt-1">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Legacy Plugin Bridge</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Allows 32-bit plugins to run on 64-bit systems with minimal latency impact.
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1 border-l-2 border-muted pl-3">
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>VST2 plugin compatibility</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Basic preset management</span>
                            </div>
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                              <span>Complete state saving (in progress)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="min-w-4 pt-1">
                          <TrendingUp className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">User Authentication</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Account system with OAuth integration and profile management.
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1 border-l-2 border-muted pl-3">
                            <div className="flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              <span>Core authentication system</span>
                            </div>
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                              <span>OAuth providers (in progress)</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                              <span>Team management (planned)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">View Task Details</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="phase2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Coming Soon</Badge>
                    <span>Phase 2: Core Features</span>
                    <Progress value={phaseProgress.phase2} className="w-24 h-2 ml-2" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-6 pt-2">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="min-w-4 pt-1">
                          <TrendingUp className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">StudioFlow Connect Advanced</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Enhanced features for storage management and optimization.
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1 border-l-2 border-muted pl-3">
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 text-amber-500 mr-1" />
                              <span>Advanced caching system (in development)</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                              <span>Collaborative drive access (planned)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="min-w-4 pt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Plugin Bridge Enhanced</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Extended plugin support across platforms.
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1 border-l-2 border-muted pl-3">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                              <span>Windows-to-Mac VST compatibility</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                              <span>Audio Unit wrapper</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">View Task Details</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="phase3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Future</Badge>
                    <span>Phase 3: Advanced Features</span>
                    <Progress value={phaseProgress.phase3} className="w-24 h-2 ml-2" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-6 pt-2">
                    <p className="text-sm text-muted-foreground">
                      Development for Phase 3 will begin after the completion of Phase 2.
                      This phase will include AI tools integration, comprehensive DAW integration,
                      and team collaboration features.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Estimated start: Q1 2025
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="phase4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Long-term</Badge>
                    <span>Phase 4: Scaling & Optimization</span>
                    <Progress value={phaseProgress.phase4} className="w-24 h-2 ml-2" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-6 pt-2">
                    <p className="text-sm text-muted-foreground">
                      Phase 4 represents our ongoing commitment to optimizing performance and
                      expanding AI capabilities. This phase will be continuous as we refine the platform.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Estimated start: Q3 2025
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
