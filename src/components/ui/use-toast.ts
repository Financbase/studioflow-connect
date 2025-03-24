
// Re-export everything from the hooks implementation
import { useToast, toast, ToastGlobalHelper } from "@/hooks/use-toast";
import type { ToastActionElement, Toast } from "@/hooks/use-toast";

export type ToastProps = Toast;

// Re-export hooks and utilities
export { useToast, toast, ToastGlobalHelper };
export type { ToastActionElement, Toast };
