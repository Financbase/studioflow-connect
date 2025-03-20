
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, FileText, Lightbulb } from "lucide-react";
import HelpTip from "@/components/HelpSystem";

const DocumentationGuides = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default DocumentationGuides;
