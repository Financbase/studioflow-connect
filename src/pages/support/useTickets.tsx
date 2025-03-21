
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  response?: string;
}

export const useTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState<"low" | "medium" | "high">("medium");
  
  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API/database
    const mockTickets: Ticket[] = [
      {
        id: "ticket-001",
        user_id: user?.id || "",
        title: "Cannot access audio analysis feature",
        description: "When I try to analyze my uploaded audio files, the frequency visualizer remains blank.",
        status: "in_progress",
        priority: "medium",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        response: "We're looking into this issue. Our team has identified that it might be related to the audio format. We'll update you soon."
      },
      {
        id: "ticket-002",
        user_id: user?.id || "",
        title: "Feature request: MIDI integration",
        description: "Would it be possible to add MIDI file support for the DAW workflow integration?",
        status: "open",
        priority: "low",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: "ticket-003",
        user_id: user?.id || "",
        title: "Billing question",
        description: "I was charged twice for my Pro subscription. Could you please check this and refund the extra payment?",
        status: "resolved",
        priority: "high",
        created_at: new Date(Date.now() - 604800000).toISOString(),
        updated_at: new Date(Date.now() - 345600000).toISOString(),
        response: "We've verified the double charge and have processed a refund. It should appear in your account within 3-5 business days. We apologize for the inconvenience."
      },
      {
        id: "ticket-004",
        user_id: user?.id || "",
        title: "Plugin compatibility issue",
        description: "I'm trying to use a third-party VST plugin but it crashes when I load it in StudioFlow. The plugin works fine in other DAWs.",
        status: "open",
        priority: "critical",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    setTickets(mockTickets);
  }, [user?.id]);

  const activeTickets = tickets.filter(t => ["open", "in_progress"].includes(t.status));
  const resolvedTickets = tickets.filter(t => ["resolved", "closed"].includes(t.status));
  
  return {
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
  };
};
