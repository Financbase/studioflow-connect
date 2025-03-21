
import React, { createContext, useContext, useState } from "react";
import { Ticket } from "./types";

interface TicketContextType {
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};

interface TicketProviderProps {
  children: React.ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState("");

  return (
    <TicketContext.Provider value={{ 
      selectedTicket, 
      setSelectedTicket,
      replyText,
      setReplyText
    }}>
      {children}
    </TicketContext.Provider>
  );
};
