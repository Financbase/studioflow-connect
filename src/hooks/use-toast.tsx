
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

// Function to create a toast with the hook
function createToastFunction(opts: Partial<ToastOptions>) {
  const id = crypto.randomUUID();
  const { addToast } = useToast();
  addToast({
    id,
    variant: "default",
    ...opts,
  });
  return id;
}

// Define the toast function type
type ToastFunction = {
  (opts: Partial<ToastOptions>): string;
  create: (opts: Partial<ToastOptions>) => string;
  default: (opts: Partial<ToastOptions>) => string;
  destructive: (opts: Partial<ToastOptions>) => string;
  custom: (opts: Partial<ToastOptions>) => string;
};

// Create the toast function with methods
export const toast = ((opts: Partial<ToastOptions>) => {
  return createToastFunction(opts);
}) as ToastFunction;

// Add methods to the toast function
toast.create = (opts: Partial<ToastOptions>) => {
  return createToastFunction(opts);
};

toast.default = (opts: Partial<ToastOptions>) => {
  return createToastFunction({ ...opts, variant: "default" });
};

toast.destructive = (opts: Partial<ToastOptions>) => {
  return createToastFunction({ ...opts, variant: "destructive" });
};

toast.custom = (opts: Partial<ToastOptions>) => {
  return createToastFunction(opts);
};
