
import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
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

type ToastOptions = Omit<Toast, 'id'>;

/**
 * Create a toast notification
 */
export const toast = ((opts: Partial<ToastOptions>) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "default",
    ...opts,
  });
}) as {
  (opts: Partial<ToastOptions>): void;
  default: (opts: Partial<ToastOptions>) => void;
  destructive: (opts: Partial<ToastOptions>) => void;
  custom: (opts: Partial<ToastOptions>) => void;
};

// Default variant
toast.default = (opts: Partial<ToastOptions>) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "default",
    ...opts,
  });
};

// Destructive variant
toast.destructive = (opts: Partial<ToastOptions>) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "destructive",
    ...opts,
  });
};

// Custom variant
toast.custom = (opts: Partial<ToastOptions>) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    ...opts,
  });
};
