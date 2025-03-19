
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastPrimitive } from "@radix-ui/react-toast";
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

interface Toast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
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

type ToastOptions = Partial<Toast> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export const toast = ({
  variant = "default",
  title,
  description,
  action,
  ...props
}: ToastOptions) => {
  const { addToast } = useToast();
  
  addToast({
    id: crypto.randomUUID(),
    variant,
    title,
    description,
    action,
    ...props,
  });
};
