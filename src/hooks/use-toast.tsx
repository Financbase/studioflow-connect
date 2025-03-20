
import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
};

interface Toast {
  id: string;
  variant?: "default" | "destructive";
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  duration?: number;
  className?: string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const updateToast = (id: string, toast: Partial<Toast>) => {
    setToasts((prevToasts) =>
      prevToasts.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Create a standalone toast function that doesn't rely on the hook directly
type ToastOptions = Omit<Toast, 'id'>;

// Define the toast function type
export type ToastFunction = {
  (opts: Partial<ToastOptions>): string;
  create: (opts: Partial<ToastOptions>) => string;
  default: (opts: Partial<ToastOptions>) => string;
  destructive: (opts: Partial<ToastOptions>) => string;
  custom: (opts: Partial<ToastOptions>) => string;
};

// External toast API that doesn't directly use the hook
// This allows it to be imported directly in files
export const toast: ToastFunction = function toast(opts: Partial<ToastOptions>) {
  // Generate a random ID for this toast
  const id = crypto.randomUUID();
  
  // We'll use setTimeout to push this to the next event loop tick
  // This allows the toast function to be called outside of React components
  setTimeout(() => {
    try {
      // Get the toast context from wherever it might be available
      const toastHelpers = window.__TOAST_HELPERS__;
      if (toastHelpers && toastHelpers.addToast) {
        toastHelpers.addToast({
          id,
          variant: "default",
          ...opts
        });
      } else {
        console.error("Toast context not available. Make sure ToastProvider is in the component tree.");
      }
    } catch (error) {
      console.error("Failed to show toast:", error);
    }
  }, 0);
  
  return id;
} as ToastFunction;

// Add methods to the toast function
toast.create = (opts: Partial<ToastOptions>) => {
  return toast(opts);
};

toast.default = (opts: Partial<ToastOptions>) => {
  return toast({ ...opts, variant: "default" });
};

toast.destructive = (opts: Partial<ToastOptions>) => {
  return toast({ ...opts, variant: "destructive" });
};

toast.custom = (opts: Partial<ToastOptions>) => {
  return toast(opts);
};

// Add global helper to make toast functions available outside React context
declare global {
  interface Window {
    __TOAST_HELPERS__?: {
      addToast: (toast: Toast) => void;
      removeToast: (id: string) => void;
      updateToast: (id: string, toast: Partial<Toast>) => void;
    }
  }
}

// Helper component to connect the React context to the global window object
export const ToastGlobalHelper: FC = () => {
  const { addToast, removeToast, updateToast } = useToast();
  
  // Make toast functions globally available
  useEffect(() => {
    window.__TOAST_HELPERS__ = {
      addToast,
      removeToast,
      updateToast
    };
    
    return () => {
      window.__TOAST_HELPERS__ = undefined;
    };
  }, [addToast, removeToast, updateToast]);
  
  return null;
};
