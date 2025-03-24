
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000 * 60;

export type ToastVariant = "default" | "destructive";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: Omit<Toast, "id">;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<Toast>;
      id: string;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      id: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      id: string;
    };

interface State {
  toasts: Toast[];
}

const initialState: State = {
  toasts: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          { id: genId(), ...action.toast },
          ...state.toasts,
        ].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t
        ),
      };

    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
};

type Dispatch = (action: Action) => void;

const ToastContext = createContext<{
  state: State;
  dispatch: Dispatch;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  toasts: [],
  addToast: () => null,
  updateToast: () => null,
  dismissToast: () => null,
  removeToast: () => null,
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    dispatch({ type: actionTypes.ADD_TOAST, toast });
  }, []);

  const updateToast = useCallback((id: string, toast: Partial<Toast>) => {
    dispatch({ type: actionTypes.UPDATE_TOAST, id, toast });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, id });
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: actionTypes.REMOVE_TOAST, id });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        state,
        dispatch,
        toasts: state.toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
      {...props}
    />
  );
};

// Create a standalone toast function that uses the context
const toast = (props: Omit<Toast, "id">) => {
  const { addToast } = useToast();
  addToast(props);
};

// Helper functions for different toast variants
toast.error = (props: Omit<Toast, "variant">) => 
  toast({ ...props, variant: "destructive" });

toast.destructive = (props: Omit<Toast, "variant">) => 
  toast({ ...props, variant: "destructive" });

toast.default = (props: Omit<Toast, "variant">) => 
  toast({ ...props, variant: "default" });

export { toast };
