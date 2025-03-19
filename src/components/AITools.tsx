
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, FolderSearch, Wand2, Layers, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const AITools = () => {
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} activated`,
      description: "AI workflow assistance has started. This feature is a placeholder.",
      duration: 3000,
    });
  };

  return (
    <section id="ai-tools" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">AI Workflow Assistant</h2>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Intelligent Production Workflow</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            AI-powered tools to organize and optimize your production workflow without affecting your creative output.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AIToolCard 
              title="Sample Organizer" 
              description="Automatically categorize and tag sample libraries by instrument, genre, and character" 
              icon={<FolderSearch className="h-5 w-5" />}
              onClick={() => handleToolClick("Sample Organizer")}
            />
            <AIToolCard 
              title="Drum Pattern Categorizer" 
              description="Identify and categorize drum patterns by genre, BPM, and complexity" 
              icon={<Layers className="h-5 w-5" />}
              onClick={() => handleToolClick("Drum Pattern Categorizer")}
            />
            <AIToolCard 
              title="Smart Tagging" 
              description="Automatically generate consistent tags and metadata across your entire library" 
              icon={<Tag className="h-5 w-5" />}
              onClick={() => handleToolClick("Smart Tagging")}
            />
            <AIToolCard 
              title="Session Planner" 
              description="Optimize your studio time with intelligent session planning and reminders" 
              icon={<Clock className="h-5 w-5" />}
              onClick={() => handleToolClick("Session Planner")}
            />
          </div>
          
          <div className="mt-6">
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <p className="text-sm font-medium mb-2">AI Workflow Assistant Philosophy</p>
              <p className="text-xs text-muted-foreground">
                Our AI tools focus solely on workflow optimization - organizing samples, categorizing content, and planning sessions. 
                These tools never modify your audio or creative content, preserving your artistic vision while eliminating tedious organization tasks.
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                View Assistant History
              </Button>
              <Button>
                <Wand2 className="h-4 w-4 mr-2" />
                Start Batch Organization
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

interface AIToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const AIToolCard = ({ title, description, icon, onClick }: AIToolCardProps) => {
  return (
    <div 
      className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
            {icon}
          </div>
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default AITools;
