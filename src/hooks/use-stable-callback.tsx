
import { useCallback, useRef } from 'react';

/**
 * Hook that creates a stable callback function that doesn't change on rerenders
 * but still captures the latest props/state values.
 * 
 * This is useful for performance optimization when passing callbacks to
 * memoized child components or event listeners.
 * 
 * @param callback The callback function to stabilize
 * @returns A stable callback function
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback);
  
  // Update the callback ref on each render
  callbackRef.current = callback;
  
  // Return a stable function that calls the latest callback
  return useCallback(
    ((...args) => callbackRef.current(...args)) as T,
    []
  );
}

export default useStableCallback;
