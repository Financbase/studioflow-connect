
import { Toast, useToast as useHookToast } from "@/components/ui/toast";
import { toast as toastFunction } from "@/components/ui/use-toast";

// Re-export toast and useToast
export const useToast = useHookToast;
export const toast = toastFunction;

// Helper utility for consistent toast styling
export const ToastGlobalHelper = () => null;

// Export the Toast type
export type { Toast };
