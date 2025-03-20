
// This file properly re-exports the toast hooks and types from the main implementation
import { useToast, toast, ToastProvider, ToastGlobalHelper } from "@/hooks/use-toast";
import type { Toast } from "@/hooks/use-toast";

// Re-export the toast action element and props types from the hook
export type ToastActionElement = React.ReactElement<{
  className?: string;
  altText: string;
  onClick: () => void;
}>;

export type ToastProps = {
  id: string;
  variant?: "default" | "destructive";
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  duration?: number;
  className?: string;
};

export { useToast, toast, ToastProvider, ToastGlobalHelper };
export type { Toast };
