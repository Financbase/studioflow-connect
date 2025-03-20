
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HelpTip from "@/components/HelpSystem";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Code, FileText, Lightbulb } from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 md:py-10">
        <div className="flex items-center mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">Documentation</span>
        </div>
        
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground mt-2">
              Find guides, references, and resources to help you get the most out of our platform.
            </p>
          </div>
          
          <Tabs defaultValue="guides">
            <TabsList className="mb-4">
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="space-y-6">
              <Card id="getting-started">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Getting Started
                    </CardTitle>
                    <HelpTip 
                      title="Getting Started Guide" 
                      content="This section covers the basics to help new users get up and running quickly."
                    />
                  </div>
                  <CardDescription>Everything you need to know to get started with our platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Link to="/docs/installation" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Installation Guide</h3>
                          <p className="text-sm text-muted-foreground">Step-by-step instructions for setting up</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                    
                    <Link to="/docs/quickstart" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Quick Start Tutorial</h3>
                          <p className="text-sm text-muted-foreground">Get up and running in minutes</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card id="advanced-guides">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Advanced Guides
                  </CardTitle>
                  <CardDescription>Detailed guides for more experienced users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Link to="/docs/advanced/configuration" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">Configuration Options</h3>
                          <p className="text-sm text-muted-foreground">Customize your experience</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                    
                    <Link to="/docs/advanced/optimization" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">Performance Optimization</h3>
                          <p className="text-sm text-muted-foreground">Tips for improving performance</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>Complete documentation of our API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This section contains detailed information about our API endpoints, authentication,
                    request parameters, response formats, and error handling.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <Link to="/api/authentication" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">Authentication</h3>
                          <p className="text-sm text-muted-foreground">Learn how to authenticate your API requests</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>Ready-to-use code snippets and examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Browse our collection of code examples to accelerate your development process.
                  </p>
                  <div className="grid gap-3">
                    <Link to="/examples/basic" className="flex p-3 items-center justify-between rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">Basic Integration Example</h3>
                          <p className="text-sm text-muted-foreground">Simple integration with our platform</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
