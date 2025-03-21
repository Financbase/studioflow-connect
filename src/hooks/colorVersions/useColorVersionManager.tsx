
import { useVersionPersistence } from './useVersionPersistence';
import { useVersionFiltering } from './useVersionFiltering';
import { useVersionOperations } from './useVersionOperations';
import { useVersionImportExport } from './useVersionImportExport';
import { useVersionSorting, SortOption } from './useVersionSorting';

export function useColorVersionManager() {
  const { 
    versions, 
    currentVersionId, 
    persistVersions, 
    persistCurrentVersionId 
  } = useVersionPersistence();
  
  const { 
    filters, 
    filteredVersions, 
    updateFilters,
    addTagFilter,
    removeTagFilter,
    toggleFavoritesFilter,
    resetFilters,
    allTags 
  } = useVersionFiltering(versions);
  
  const {
    sortOption,
    setSortOption,
    sortedVersions
  } = useVersionSorting(filteredVersions, currentVersionId);
  
  const { 
    saveVersion, 
    switchToVersion, 
    deleteVersion, 
    updateVersion, 
    toggleFavorite,
    duplicateVersion,
    addTagToVersion,
    removeTagFromVersion
  } = useVersionOperations(versions, currentVersionId, persistVersions, persistCurrentVersionId);
  
  const { 
    exportVersion, 
    importVersion 
  } = useVersionImportExport(versions, persistVersions);
  
  // Get the current version
  const getCurrentVersion = () => {
    if (!currentVersionId) return null;
    return versions.find(v => v.id === currentVersionId) || null;
  };
  
  return {
    // State
    versions,
    filteredVersions: sortedVersions,
    currentVersionId,
    filters,
    sortOption,
    allTags,
    
    // Version management
    saveVersion,
    switchToVersion,
    deleteVersion,
    updateVersion,
    toggleFavorite,
    duplicateVersion,
    getCurrentVersion,
    addTagToVersion,
    removeTagFromVersion,
    
    // Filtering
    updateFilters,
    addTagFilter,
    removeTagFilter,
    toggleFavoritesFilter,
    resetFilters,
    
    // Sorting
    setSortOption,
    
    // Import/Export
    exportVersion,
    importVersion
  };
}
