
import { useState } from "react";
import { Ticket } from "@/components/support/ticket/types";

// Create a custom hook to manage tickets
export const useTickets = () => {
  // Sample ticket data
  const initialTickets: Ticket[] = [
    {
      id: "ticket-123-456",
      user_id: "user-789",
      title: "DAW Integration Issue",
      description: "I'm having trouble connecting my DAW with the audio interface. The connection drops intermittently during recording sessions.",
      status: "open",
      priority: "high",
      created_at: "2025-03-01T10:30:00Z",
      updated_at: "2025-03-02T14:20:00Z"
    },
    {
      id: "ticket-456-789",
      user_id: "user-789",
      title: "Billing Question",
      description: "I was charged twice for my monthly subscription. Could you please help me resolve this issue?",
      status: "in_progress",
      priority: "medium",
      created_at: "2025-02-28T15:45:00Z",
      updated_at: "2025-03-01T09:10:00Z",
      response: "We're looking into this issue and will get back to you shortly."
    },
    {
      id: "ticket-789-012",
      user_id: "user-789",
      title: "Feature Request",
      description: "I would love to see integration with virtual instruments. This would streamline my workflow significantly.",
      status: "open",
      priority: "low",
      created_at: "2025-02-25T11:20:00Z",
      updated_at: "2025-02-25T11:20:00Z"
    },
    {
      id: "ticket-012-345",
      user_id: "user-789",
      title: "Audio Latency Issue",
      description: "I'm experiencing high latency during recording. This makes it difficult to perform in real-time.",
      status: "resolved",
      priority: "high",
      created_at: "2025-02-20T09:15:00Z",
      updated_at: "2025-02-22T16:30:00Z",
      response: "Glad we could help resolve your latency issues. Let us know if you need any further assistance!"
    },
    {
      id: "ticket-345-678",
      user_id: "user-789",
      title: "Account Deletion Request",
      description: "I'd like to delete my account and remove all my data from your servers.",
      status: "closed",
      priority: "medium",
      created_at: "2025-02-15T14:20:00Z",
      updated_at: "2025-02-17T11:05:00Z",
      response: "Your account has been successfully deleted and all data has been removed from our servers as requested."
    }
  ];

  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState<"low" | "medium" | "high" | "critical">("medium");

  // Get active tickets (open or in progress)
  const activeTickets = tickets.filter(
    ticket => ticket.status === "open" || ticket.status === "in_progress"
  );

  // Get resolved tickets
  const resolvedTickets = tickets.filter(
    ticket => ticket.status === "resolved" || ticket.status === "closed"
  );

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
