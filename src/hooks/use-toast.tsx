
import * as React from "react";
import { Toast as ToastPrimitive } from "@/components/ui/toast";
import { toast as toastFunction } from "@/components/ui/use-toast";

// Create context for toast
const ToastContext = React.createContext<{
  toasts: ToastPrimitive[];
  addToast: (toast: ToastPrimitive) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

// Re-export toast function
export const toast = toastFunction;

// Create a provider component
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastPrimitive[]>([]);

  const addToast = React.useCallback((toast: ToastPrimitive) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Create a hook to use toast context
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Helper utility for consistent toast styling
export const ToastGlobalHelper = () => null;

// Export the Toast type
export type { ToastPrimitive as Toast };
