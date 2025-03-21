
import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizontal, Sparkles, Brain, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ZenModeBrainstormProps {
  isVisible: boolean;
  themeMode: "minimal" | "ambient" | "focus";
}

const ZenModeBrainstorm: React.FC<ZenModeBrainstormProps> = ({ isVisible, themeMode }) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: "Welcome to Zen Brainstorming. Share your ideas, and I'll help you explore them further. What would you like to explore today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom effect
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Simulate AI response based on user input
  const generateResponse = async (userInput: string): Promise<string> => {
    // This simulates an AI response - in a real implementation this would call an API
    const topics = [
      "creative process", "musical composition", "sound design",
      "harmony", "melody", "rhythm", "inspiration", "artistic vision"
    ];
    
    const relevantTopic = topics.find(topic => userInput.toLowerCase().includes(topic)) || 
      topics[Math.floor(Math.random() * topics.length)];

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return different responses based on the user's input
    if (userInput.toLowerCase().includes("stuck") || userInput.toLowerCase().includes("block")) {
      return `Creative blocks are common. Try approaching your ${relevantTopic} from a different angle. What if you reversed your usual process? Sometimes constraints can spark creativity - what could you achieve with just three elements?`;
    } 
    else if (userInput.toLowerCase().includes("idea") || userInput.toLowerCase().includes("concept")) {
      return `That's an interesting concept. To develop this idea further, consider how it relates to ${relevantTopic}. What emotions are you trying to evoke? How might your audience respond to this?`;
    }
    else if (userInput.toLowerCase().includes("how") || userInput.toLowerCase().includes("?")) {
      return `Great question about ${relevantTopic}. There are multiple approaches you could consider. What's worked for you in the past? Would you like to explore conventional techniques or experiment with something unconventional?`;
    }
    else {
      return `Your thoughts on ${relevantTopic} are intriguing. Let's explore this further. What aspects of this are you most excited about? How does this connect to your broader creative vision?`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      // Get AI response
      const responseText = await generateResponse(input);
      
      // Add AI message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible) return null;

  // Apply different styles based on the theme mode
  const getContainerClass = () => {
    switch (themeMode) {
      case "ambient":
        return "bg-background/10 border-white/10 backdrop-blur-md";
      case "focus":
        return "bg-background/15 border-white/15 backdrop-blur-lg focus-border-glow";
      case "minimal":
      default:
        return "bg-background/20 border-white/10 backdrop-blur-sm";
    }
  };

  return (
    <Card className={`w-full max-h-[70vh] flex flex-col rounded-xl overflow-hidden ${getContainerClass()}`}>
      <CardContent className="flex flex-col h-full p-0">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary/80" />
          <h3 className="text-lg font-medium">Zen Brainstorming</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(70vh-130px)]">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary/20 text-white ml-10' 
                    : 'bg-white/10 text-white mr-10'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'assistant' && (
                    <Sparkles className="h-4 w-4 mt-1 text-primary/80" />
                  )}
                  <div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs text-white/50 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <MessageCircle className="h-4 w-4 mt-1 text-primary/80" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t border-white/10 bg-white/5">
          <div className="flex gap-2">
            <Textarea
              placeholder="Share your ideas or ask for inspiration..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[60px] bg-white/10 border-white/10 focus:border-primary/30 resize-none"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isProcessing || !input.trim()}
              className="h-auto aspect-square"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZenModeBrainstorm;
