
// This file now serves as a facade that re-exports the refactored hook
import { useVersionManager } from './useVersionManager';

export function useColorVersionManager() {
  return useVersionManager();
}
