
export interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created_at: string;
  updated_at: string;
  assigned_to?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  username: string;
  ip_address: string;
  user_agent: string;
  started_at: string;
  last_active_at: string;
  plan: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeUsers: number;
  totalUsers: number;
  pendingTickets: number;
  resolvedToday: number;
  audioProcessingLoad: number;
}
