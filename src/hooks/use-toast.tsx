
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

// Fix: Make the toast object both callable and with methods
function createToast(opts: Partial<ToastOptions>) {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "default",
    ...opts,
  });
}

// Create an enhanced toast object that can be called directly and has methods
export const toast = Object.assign(
  // Main function when called directly
  (opts: Partial<ToastOptions>) => {
    createToast(opts);
  },
  // Methods for specific toast variants
  {
    create: (opts: Partial<ToastOptions>) => {
      createToast(opts);
    },
    default: (opts: Partial<ToastOptions>) => {
      createToast({ ...opts, variant: "default" });
    },
    destructive: (opts: Partial<ToastOptions>) => {
      createToast({ ...opts, variant: "destructive" });
    },
    custom: (opts: Partial<ToastOptions>) => {
      createToast(opts);
    }
  }
);
