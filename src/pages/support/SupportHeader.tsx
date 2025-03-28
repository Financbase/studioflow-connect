
import React from "react";
import { Button } from "@/components/ui/button";
import { TicketPlus, MessageSquare } from "lucide-react";
import LiveChatDialog from "@/components/support/LiveChatDialog";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";

interface SupportHeaderProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  onSendMessage: () => void;
  onNewTicket: () => void;
}

const SupportHeader = ({
  isChatOpen,
  setIsChatOpen,
  chatMessage,
  setChatMessage,
  onSendMessage,
  onNewTicket
}: SupportHeaderProps) => {
  const { t, isInitialized } = useLanguage();
  
  return (
    <motion.section 
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isInitialized ? t("support.title") : "Support"}</h1>
        <p className="text-muted-foreground">
          {isInitialized ? t("support.subtitle") : "Get help with StudioFlow"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="gap-2" onClick={onNewTicket}>
          <TicketPlus className="h-4 w-4" />
          {isInitialized ? t("support.new_ticket") : "New Ticket"}
        </Button>
        <LiveChatDialog 
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          onSendMessage={onSendMessage}
        />
      </div>
    </motion.section>
  );
};

export default SupportHeader;
