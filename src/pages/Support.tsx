
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

// Import our refactored components
import SupportLayout from "./support/SupportLayout";
import SupportHeader from "./support/SupportHeader";
import SupportContent from "./support/SupportContent";
import SupportTabs from "./support/SupportTabs";
import { useTickets } from "./support/useTickets";

const Support = () => {
  const { t } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  
  const {
    tickets,
    setTickets,
    activeTickets,
    resolvedTickets,
    newTicketTitle,
    setNewTicketTitle,
    newTicketDescription,
    setNewTicketDescription,
    newTicketPriority,
    setNewTicketPriority
  } = useTickets();
  
  const handleCreateTicket = () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both a title and description for your support ticket.",
        variant: "destructive"
      });
      return;
    }
    
    const newTicket = {
      id: `ticket-${Date.now()}`,
      user_id: "",
      title: newTicketTitle,
      description: newTicketDescription,
      status: "open" as const,
      priority: newTicketPriority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setTickets([newTicket, ...tickets]);
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketPriority("medium");
    
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully."
    });
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // This would normally send the message to your support system
    toast({
      title: "Message Sent",
      description: "A support agent will respond shortly."
    });
    
    setChatMessage("");
  };
  
  const headerComponent = (
    <SupportHeader
      isChatOpen={isChatOpen}
      setIsChatOpen={setIsChatOpen}
      chatMessage={chatMessage}
      setChatMessage={setChatMessage}
      onSendMessage={handleSendChatMessage}
      onNewTicket={handleCreateTicket}
    />
  );
  
  const tabsComponent = (
    <SupportTabs className="w-full" />
  );

  return (
    <SupportLayout>
      <SupportContent 
        headerComponent={headerComponent}
        tabsComponent={tabsComponent}
      />
    </SupportLayout>
  );
};

export default Support;
