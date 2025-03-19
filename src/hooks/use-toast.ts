
import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  createElement,
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

  // Using createElement instead of JSX since this is a .ts file
  return createElement(
    ToastContext.Provider,
    { value: { toasts, addToast, removeToast, updateToast } },
    children
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

type ToastOptions = Omit<Partial<Toast>, 'id'>;

// Create a toast function that can be called directly
const toast = (opts: ToastOptions) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "default",
    ...opts,
  });
};

// Add methods to the toast function for variant-specific toasts
toast.default = (opts: ToastOptions) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "default",
    ...opts,
  });
};

toast.destructive = (opts: ToastOptions) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    variant: "destructive",
    ...opts,
  });
};

toast.custom = (opts: ToastOptions) => {
  const { addToast } = useToast();
  addToast({
    id: crypto.randomUUID(),
    ...opts,
  });
};

// Export the toast function with its methods
export { toast };
