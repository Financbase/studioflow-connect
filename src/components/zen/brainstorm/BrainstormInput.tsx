
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface BrainstormInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const BrainstormInput: React.FC<BrainstormInputProps> = ({ onSendMessage, isProcessing }) => {
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="p-3 border-t border-white/10 bg-white/5">
      <div className="flex gap-2">
        <Textarea
          placeholder="Share your ideas or ask for inspiration..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="min-h-[60px] bg-white/10 border-white/10 focus:border-primary/30 resize-none"
        />
        <Button 
          onClick={handleSend}
          disabled={isProcessing || !input.trim()}
          className="h-auto aspect-square"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default BrainstormInput;
