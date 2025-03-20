
// Re-export the toast hooks and functions from the main implementation
import { useToast, toast, ToastFunction, ToastProvider, ToastGlobalHelper } from "@/hooks/use-toast";

export { useToast, toast, ToastProvider, ToastGlobalHelper };
export type { ToastFunction };
