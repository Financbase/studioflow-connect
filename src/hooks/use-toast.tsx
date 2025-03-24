
import * as React from "react";
import { ToastActionElement, type ToastProps } from "@/components/ui/toast";

// Create unique ID for toast
const generateId = () => `toast-${Math.random().toString(36).slice(2)}`;

// Create context for toast
type ToastProviderProps = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = React.createContext<ToastProviderProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

// Create a provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = generateId();
    
    setToasts(prev => [
      ...prev,
      { ...toast, id }
    ]);
    
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
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

// Helper component for providing global toast functions
export const ToastGlobalHelper = () => {
  // No actual rendering is needed, this exists for the provider system
  return null;
};

// Toast function interface
interface ToastOptions extends Omit<ToastProps, "id"> {}

// Create a function to add toast
type ToastFunction = {
  (opts: ToastOptions): string;
  default: (opts: ToastOptions) => string;
  destructive: (opts: ToastOptions) => string;
};

const createToastFunction = (): ToastFunction => {
  const toast = ((opts: ToastOptions) => {
    // This will be populated by the ToastGlobalHelper
    console.error("Toast was called before ToastProvider was initialized");
    return "";
  }) as ToastFunction;
  
  toast.default = (opts: ToastOptions) => {
    return toast({ ...opts, variant: "default" });
  };
  
  toast.destructive = (opts: ToastOptions) => {
    return toast({ ...opts, variant: "destructive" });
  };
  
  return toast;
};

export const toast = createToastFunction();

// Set up global toast function when provider is available
export type { ToastActionElement, ToastProps as Toast };
