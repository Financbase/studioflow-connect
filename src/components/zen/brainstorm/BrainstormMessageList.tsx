
import React, { useRef, useEffect } from "react";
import BrainstormMessage, { Message } from "./BrainstormMessage";

interface BrainstormMessageListProps {
  messages: Message[];
}

const BrainstormMessageList: React.FC<BrainstormMessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom effect
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(70vh-130px)]">
      {messages.map((message) => (
        <BrainstormMessage key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default BrainstormMessageList;
