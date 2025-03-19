
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, Wand2, Zap, Filter, Tag, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const AITools = () => {
  const handleToolClick = (tool: string) => {
    toast({
      title: `${tool} activated`,
      description: "AI processing has started. This feature is a placeholder.",
      duration: 3000,
    });
  };

  return (
    <section id="ai-tools" className="py-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">AI Tools</h2>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Intelligent Audio Processing</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Leverage AI to enhance your audio production workflow with these powerful tools.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AIToolCard 
              title="Smart Mastering" 
              description="Automatically apply mastering to your tracks using AI" 
              icon={<Wand2 className="h-5 w-5" />}
              onClick={() => handleToolClick("Smart Mastering")}
            />
            <AIToolCard 
              title="Noise Reduction" 
              description="Remove background noise and imperfections" 
              icon={<Filter className="h-5 w-5" />}
              onClick={() => handleToolClick("Noise Reduction")}
            />
            <AIToolCard 
              title="Auto Tagging" 
              description="Automatically generate metadata and tags for your audio" 
              icon={<Tag className="h-5 w-5" />}
              onClick={() => handleToolClick("Auto Tagging")}
            />
            <AIToolCard 
              title="Style Transfer" 
              description="Apply the characteristics of one audio to another" 
              icon={<Brush className="h-5 w-5" />}
              onClick={() => handleToolClick("Style Transfer")}
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              View AI History
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Run Batch Process
            </Button>
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
