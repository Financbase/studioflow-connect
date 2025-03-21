
import React from "react";
import { Sparkles, MessageCircle } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface BrainstormMessageProps {
  message: Message;
}

const BrainstormMessage: React.FC<BrainstormMessageProps> = ({ message }) => {
  return (
    <div 
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
  );
};

export default BrainstormMessage;
