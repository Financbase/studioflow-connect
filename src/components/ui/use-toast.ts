
// This file properly re-exports the toast hooks and types from the main implementation
import { useToast, toast, ToastProvider, ToastGlobalHelper } from "@/hooks/use-toast";
import type { ToastActionElement, ToastProps, Toast } from "@/hooks/use-toast";

export { useToast, toast, ToastProvider, ToastGlobalHelper };
export type { ToastActionElement, ToastProps, Toast };
