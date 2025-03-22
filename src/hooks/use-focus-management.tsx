
import { useCallback, useRef, useEffect } from 'react';

interface FocusOptions {
  /** Whether to focus the element on mount */
  focusOnMount?: boolean;
  /** Whether to return focus to the previous element when the component unmounts */
  returnFocusOnUnmount?: boolean;
  /** Whether to trap focus within the container */
  trapFocus?: boolean;
  /** Custom selector for focusable elements */
  focusableSelector?: string;
}

/**
 * Hook to manage focus within components for better accessibility
 * including focus trapping and restoration
 */
export const useFocusManagement = (options: FocusOptions = {}) => {
  const {
    focusOnMount = false,
    returnFocusOnUnmount = true,
    trapFocus = false,
    focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  } = options;
  
  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  // Standard selector for focusable elements
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }, [focusableSelector]);
  
  // Focus the first focusable element in the container
  const focusFirstElement = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);
  
  // Focus the last focusable element in the container
  const focusLastElement = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
      return true;
    }
    return false;
  }, [getFocusableElements]);
  
  // Handle tab key presses for focus trapping
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (!trapFocus || !containerRef.current) return;
    
    const elements = getFocusableElements();
    if (elements.length === 0) return;
    
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    const activeElement = document.activeElement as HTMLElement;
    
    const isTabbing = !e.shiftKey;
    const isReverseTabbing = e.shiftKey;
    
    if (isReverseTabbing && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (isTabbing && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, [getFocusableElements, trapFocus]);
  
  // Set up key event listeners
  useEffect(() => {
    if (trapFocus && containerRef.current) {
      window.addEventListener('keydown', handleTabKey);
      return () => {
        window.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [handleTabKey, trapFocus]);
  
  // Focus on mount if requested
  useEffect(() => {
    if (focusOnMount && containerRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      focusFirstElement();
    }
  }, [focusOnMount, focusFirstElement]);
  
  // Return focus on unmount if requested
  useEffect(() => {
    return () => {
      if (returnFocusOnUnmount && previousFocusRef.current) {
        setTimeout(() => {
          previousFocusRef.current?.focus();
        }, 0);
      }
    };
  }, [returnFocusOnUnmount]);
  
  return {
    containerRef,
    focusFirstElement,
    focusLastElement,
    getFocusableElements
  };
};

export default useFocusManagement;
