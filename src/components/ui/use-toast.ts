
// Re-export everything from the hooks implementation
import { useToast, toast, type Toast, type ToastVariant } from "@/hooks/use-toast";
import type { ToastActionElement } from "@/components/ui/toast";

export { useToast, toast };
export type { ToastActionElement, Toast, ToastVariant };
